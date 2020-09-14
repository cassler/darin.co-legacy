import React, { useState, useEffect } from "react";
import FileSelect from "./IO/FileSelect";
import { IParseResult } from "../context";
import * as jsdiff from "diff";
import { Button, Result, Divider } from "antd";

import { set, get } from "idb-keyval";
import {
  SwapOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import DeltaTable from "./Preview/DeltaTable";
import CSVTable, { CSVTableModal } from "./Preview/CSVTable";

export type DiffDataProps = IParseResult & { fileName: string };

const mapWithKeys = (data: any[]) => {
  return data.map((item, index) => ({
    ...item,
    key: index,
  }));
};

const alphaSort = (a, b) => {
  let first = JSON.stringify(a);
  let second = JSON.stringify(b);
  if (first > second) {
    return -1;
  }
  if (second > first) {
    return 1;
  }
  return 0;
};
export function ReportViewer() {
  const [oldData, setOldData] = useState<DiffDataProps>();
  const [newData, setNewData] = useState<DiffDataProps>();
  const [result, setResult] = useState<
    {
      add: boolean;
      removed: boolean;
      count: number;
      change: string;
      value: string;
    }[]
  >([]);

  const diffData = (oldObj: object[], newObj: object[]) => {
    let oldStr = oldObj
      .map((i) => JSON.stringify(i))
      .sort(alphaSort)
      .join("\n");
    let newStr = newObj
      .map((i) => JSON.stringify(i))
      .sort(alphaSort)
      .join("\n");
    let raw = jsdiff.diffLines(oldStr, newStr);
    let output = raw
      .filter((i) => i.added || i.removed)
      .map((type, tIndex) => {
        let { added } = type;
        let entries = type.value.split("\n").filter((i) => i.length > 5);
        return entries.map((i, index) => ({
          change: added ? (
            <PlusCircleOutlined className="addition" />
          ) : (
            <MinusCircleOutlined className="deletion" />
          ),
          add: added ? true : false,
          ...JSON.parse(i),
        }));
      });
    console.log(output);
    // console.table(output[2])
    // console.table(output[5])
    return mapWithKeys(output.flat());
  };

  const handleChange = (
    result: IParseResult,
    slug: string,
    fileName: string
  ) => {
    if (slug === "next") {
      let sortResult = {
        ...result,
        data: result.data.sort((a, b) => {
          return a - b;
        }),
      };
      let newData = { ...sortResult, fileName };

      setNewData(newData);
      // setColumns(result.meta.fields)
      set("nextCols", JSON.stringify(result.meta.fields));
      set("nextData", JSON.stringify(newData));
    }
    if (slug === "prev") {
      let sortResult = {
        ...result,
        data: result.data.sort((a, b) => {
          return a - b;
        }),
      };
      let oldData = { ...sortResult, fileName };
      setOldData(oldData);
      // setColumns(result.meta.fields)
      set("prevCols", JSON.stringify(result.meta.fields));
      set("prevData", JSON.stringify(oldData));
    }
  };

  const resetCache = (type: string) => {
    if (type === "next") {
      setNewData(undefined);
      // setColumns([])
      set("nextCols", null);
      set("nextData", null);
    }
    if (type === "prev") {
      setOldData(undefined);
      // setColumns([])
      set("prevCols", null);
      set("prevData", null);
    }
  };

  const loadState = async () => {
    const next = get<string>("nextData").then((data) => {
      if (data) {
        setNewData(JSON.parse(data));
      }
      return;
    });
    console.log(next);
    const prev = get<string>("prevData").then((data) => {
      if (data) {
        setOldData(JSON.parse(data));
      }
      return;
    });
    console.log(prev);
  };

  useEffect(() => {
    loadState();
  }, []);

  const contentStyle = {
    padding: "96px 24px 24px",
    width: "100vw",
  };
  const deltaFileUI: React.CSSProperties = {
    padding: "0 100px 0",
    display: "grid",
    gridTemplateColumns: "1fr 100px 1fr",
    alignItems: "center",
    justifyItems: "center",
  };

  return (
    <div style={contentStyle}>
      <div>
        {result.length === 0 ? (
          <div style={deltaFileUI}>
            <Result
              status={oldData ? "success" : "info"}
              title="Previous File Added"
              subTitle={
                oldData && oldData.fileName ? oldData.fileName : "No file added"
              }
              extra={[
                !oldData && (
                  <FileSelect
                    label="Old DT Report"
                    slug="prev"
                    callback={handleChange}
                  />
                ),
                oldData && (
                  <div style={{ width: 200 }}>
                    <Button key="buy" onClick={() => resetCache("prev")}>
                      Reset
                    </Button>
                    &nbsp;
                    <CSVTableModal
                      payload={oldData}
                      filename={oldData.fileName}
                    />
                  </div>
                ),
              ]}
            />
            <div style={{ textAlign: "center" }}>
              <SwapOutlined
                style={{
                  fontSize: "48px",
                  color: !oldData || !newData ? "#ccc" : "#333",
                }}
              />
              <Divider />
              <Button
                type="primary"
                disabled={!oldData || !newData}
                size="large"
                onClick={() => setResult(diffData(oldData.data, newData.data))}
              >
                Compare
              </Button>
            </div>

            <Result
              status={newData ? "success" : "info"}
              title="New File Added"
              subTitle={
                newData && newData.fileName ? newData.fileName : "No file added"
              }
              extra={[
                !newData && (
                  <FileSelect
                    label="New DT Report"
                    slug="next"
                    callback={handleChange}
                  />
                ),
                newData && (
                  <div style={{ width: 200 }}>
                    <Button key="buy" onClick={() => resetCache("next")}>
                      Reset
                    </Button>
                    &nbsp;
                    <CSVTableModal
                      filename={newData.fileName}
                      payload={newData}
                    />
                  </div>
                ),
              ]}
            />
          </div>
        ) : (
          <DeltaTable data={result} onReset={() => setResult([])} />
        )}
        {oldData && <CSVTable filename={oldData.fileName} payload={oldData} />}
      </div>
    </div>
  );
}

export default ReportViewer;
