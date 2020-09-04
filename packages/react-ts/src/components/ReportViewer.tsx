import { ColumnsType } from 'antd/es/table';
import React, { useState, useEffect } from 'react';
import FileSelect from './IO/FileSelect';
import { IParseResult } from '../context';
import * as jsdiff from 'diff';
import { Button, Table, Descriptions, Result, Divider, PageHeader, Drawer } from 'antd';

import { set, get } from 'idb-keyval';
import { SwapOutlined, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons'
import DeltaTable from './Preview/DeltaTable'
import CSVTable, { CSVTableModal } from './Preview/CSVTable';

export type DiffDataProps = IParseResult & { fileName: string }

export function ReportViewer() {
	const [oldData, setOldData] = useState<DiffDataProps>();
	const [newData, setNewData] = useState<DiffDataProps>();
	const [result, setResult] = useState<{
		add: boolean,
		removed: boolean,
		count: number,
		change: string,
		value: string
	}[]>([])

	const diffData = (oldObj: object[], newObj: object[]) => {
		let oldStr = oldObj.map(i => JSON.stringify(i)).join('\n')
		let newStr = newObj.map(i => JSON.stringify(i)).join('\n')
		let raw = jsdiff.diffLines(oldStr, newStr)
		return raw.filter(i => i.added || i.removed).map((type, tIndex) => {
			let { added, removed } = type;
			let entries = type.value.split('\n').filter(i => i.length > 5)
			return entries.map((i, iIndex) => ({
				change: added ? <PlusCircleOutlined className='addition' /> : <MinusCircleOutlined className='deletion' />,
				add: added ? true : false,
				...JSON.parse(i)
			}))
		}).flat().map((item, key) => ({
			...item,
			key
		}))
	}

	const handleChange = (result: IParseResult, slug: string, fileName: string) => {
		if (slug === 'next') {
			let data = { ...result, fileName }
			setNewData(data)
			// setColumns(result.meta.fields)
			set("nextCols", JSON.stringify(result.meta.fields))
			set("nextData", JSON.stringify(data))
		}
		if (slug === 'prev') {
			let data = { ...result, fileName }
			setOldData(data)
			// setColumns(result.meta.fields)
			set("prevCols", JSON.stringify(result.meta.fields))
			set("prevData", JSON.stringify(data))
		}
	}

	const resetCache = (type: string) => {
		if (type === 'next') {
			setNewData(undefined)
			// setColumns([])
			set("nextCols", null)
			set("nextData", null)
		}
		if (type === 'prev') {

			setOldData(undefined)
			// setColumns([])
			set("prevCols", null)
			set("prevData", null)
		}
	}

	const loadState = async () => {
		const next = get<string>("nextData").then(data => {
			setNewData(JSON.parse(data))
		})
		console.log(next)
		const prev = get<string>("prevData").then(data => {
			setOldData(JSON.parse(data))
		})
		console.log(prev)
	}

	useEffect(() => {
		loadState()
	}, [])

	const contentStyle = {
		padding: '96px 24px 24px',
		width: '100vw',
	}
	const deltaFileUI: React.CSSProperties = {
		padding: '0 100px 0',
		display: 'grid',
		gridTemplateColumns: '1fr 100px 1fr',
		alignItems: 'center',
		justifyItems: 'center'
	}

	const makeTableCols = (payload: IParseResult, first?: number, filter?: string[]): ColumnsType[] => {
		const fields = payload.meta.fields
		const sample = payload.data[0];
		const columns = fields.map((col, index) => ({
			title: col.toUpperCase(),
			dataIndex: col,
			key: col.toLowerCase(),
			ellipsis: true,
			width: 30 + `${sample[col]}`.length * 5,
			change: '',
			sorter: (a, b) => a[col] - b[col],
			sortDirections: ['ascend', 'descend'],
			defaultSortOrder: ['ascend'],
			render: (text, record) => (
				<div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
					{text}
				</div>
			),
		})).filter(i => filter ? !filter.includes(i.title) : true)

		return first ? columns.slice(0, first) : columns
	}

	return (


		<div style={contentStyle}>
			<div>
				{result.length === 0 ? (
					<div style={deltaFileUI}>
						<Result
							status={oldData ? "success" : "info"}
							title="Previous File Added"
							subTitle={oldData && oldData.fileName ? oldData.fileName : 'No file added'}
							extra={[
								!oldData && <FileSelect label="Old DT Report" slug="prev" callback={handleChange} />,
								oldData && <div style={{ width: 200 }}>
									<Button key="buy" onClick={() => resetCache('prev')}>Reset</Button>&nbsp;
									<CSVTableModal payload={oldData} filename={oldData.fileName} />
								</div>
							]}
						/>
						<div style={{ textAlign: 'center' }}>
							<SwapOutlined style={{ fontSize: '48px', color: !oldData || !newData ? '#ccc' : '#333' }} />
							<Divider />
							<Button
								type="primary"
								disabled={!oldData || !newData}
								size="large"
								onClick={() => setResult(diffData(oldData.data, newData.data))}>
								Compare
								</Button>
						</div>

						<Result
							status={newData ? "success" : "info"}
							title="New File Added"
							subTitle={newData && newData.fileName ? newData.fileName : 'No file added'}
							extra={[
								!newData && <FileSelect label="New DT Report" slug="next" callback={handleChange} />,
								newData && <div style={{ width: 200 }}>
									<Button key="buy" onClick={() => resetCache('next')}>Reset</Button>&nbsp;
									<CSVTableModal filename={newData.fileName} payload={newData} />
								</div>
							]}
						/>

					</div>
				) : <DeltaTable data={result} onReset={() => setResult([])} />}
				{oldData && <CSVTable filename={oldData.fileName} payload={oldData} />}
			</div>
		</div>

	)
}


export default ReportViewer;
