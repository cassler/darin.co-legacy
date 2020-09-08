import React, { useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import { Button, Table, Descriptions, PageHeader, Drawer } from 'antd';
import * as jsdiff from 'diff';

interface DeltatableProps {
  onReset: Function
  data: {
    add: boolean,
    removed: boolean,
    count: number,
    change: string,
    value: string
  }[]
}
export type JSONDiff = {
  added: boolean,
  removed: boolean,
  count: number,
  value: string
}
type Entry = {
  change: string
  add: string
}

export const DeltaTable: React.FC<DeltatableProps> = ({ data, onReset }) => {

  const [keyDelta, setKeyDelta] = useState<JSONDiff[]>()
  const [selectedRowKeys, selectRowKey] = useState([]);
  const [showCompare, toggleCompare] = useState(false)

  const colNames = data.length > 0 ? Object.keys(data[0]).slice(0, 10) : [];
  const columns = [
    {
      title: '',
      key: 'change',
      dataIndex: 'change',
      width: 30,
      filters: [
        { text: 'Additions', value: true },
        { text: 'Deletions', value: false }
      ],
      onFilter: (value, record) => record.add === value,
    },
    ...colNames.map(col => ({
      title: col.toUpperCase(),
      dataIndex: col,
      key: col.toLowerCase(),
      ellipsis: true,
      change: '',
      sorter: (a, b) => a[col] - b[col],
      sortDirections: ['ascend', 'descend'],
      defaultSortOrder: ['ascend'],
      render: (text, record) => (
        <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
          {text}
        </div>
      ),
    })).filter(i => !['KEY', 'ADD', 'CHANGE', 'LENDER ID'].includes(i.title)),

  ]



  // Build out an expanded seciond for each row
  const renderExpand = (record) => (
    <div style={{ margin: '24px' }}>
      <Descriptions
        title={`Request Details:`}
        size="small"
      >
        {Object.keys(record).map(i => (
          <Descriptions.Item label={i}>{`${record[i] || '-'}`.slice(0, 40)}</Descriptions.Item>
        ))}
      </Descriptions>

    </div>
  );

  const showCompareKeys = () => {
    let keys = selectedRowKeys;
    if (keys.length > 1) {
      let [a, b] = [data[keys[0]], data[keys[1]]]
      delete a.change
      delete a.add
      delete b.change
      delete b.add
      let raw = jsdiff.diffJson(a, b)
      console.log({ raw })
      setKeyDelta(raw)
    }
    toggleCompare(!showCompare)
  }
  return (
    <>
      <Table
        size="small"
        pagination={{
          defaultPageSize: 15
        }}
        expandable={{
          expandedRowRender: renderExpand,
          rowExpandable: record => record.change !== 'Not Expandable',
        }}
        title={() => (
          <PageHeader
            title="Deltas"
            subTitle="Comparing entries from files"
            onBack={() => onReset()}
            extra={([
              <Button disabled={selectedRowKeys.length < 2} onClick={() => showCompareKeys()}>Compare Items</Button>,
              <Button key="buy" onClick={() => onReset()}>Reset</Button>
            ])}
          />
        )}
        dataSource={data} columns={columns as ColumnsType<Entry>}
        rowClassName={(row, index) => {
          return row.add ? 'row-addition' : 'row-deletion'
        }}
        rowSelection={{
          selectedRowKeys,
          onChange: selectRowKey
        }}
      />
      <Drawer
        title="Fine Delta"
        placement="right"
        width={540}
        closable={false}
        onClose={() => toggleCompare(!showCompare)}
        visible={showCompare}
      >
        <div style={{ display: 'grid', 'gridTemplateColumns': '1fr 1fr' }}>
          <div style={{ gridColumn: "0/1" }}><h3>Previous</h3></div>
          <div style={{ gridColumn: "1/0" }}><h3>New</h3></div>
          {keyDelta && keyDelta.map((item, key) => {
            if (item.added) {
              return <p key={key}
                style={{ gridColumn: "0/1" }}
                className='addition'>{item.value}</p>
            }
            if (item.removed) {
              return <p key={key}
                style={{ gridColumn: "1/2" }}
                className='subtraction'>{item.value}</p>
            }
            return null
          }

          )}

        </div>
      </Drawer>
    </>
  )
}

export default DeltaTable
