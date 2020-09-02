import { ColumnsType } from 'antd/es/table';
import React, { useState, useEffect } from 'react';
import FileSelect from './FileSelect';
import { IParseResult } from '../context';
import * as jsdiff from 'diff';
import { Button, Table, Descriptions, Result, Divider } from 'antd';
import JSONTree from 'react-json-tree'
import { set, get } from 'idb-keyval';
import { SwapOutlined, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons'


export function ReportViewer() {
	const [oldData, setOldData] = useState<IParseResult & { fileName: string } | undefined>();
	const [newData, setNewData] = useState<IParseResult & { fileName: string } | undefined>();
	const [cols, setColumns] = useState([])
	const [result, setResult] = useState<{
		added: boolean,
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
			setColumns(result.meta.fields)
			set("nextCols", JSON.stringify(result.meta.fields))
			set("nextData", JSON.stringify(data))
		}
		if (slug === 'prev') {
			let data = { ...result, fileName }
			setOldData(data)
			setColumns(result.meta.fields)
			set("prevCols", JSON.stringify(result.meta.fields))
			set("prevData", JSON.stringify(data))
		}
	}

	const resetCache = (type: string) => {
		if (type === 'next') {
			setNewData(undefined)
			setColumns([])
			set("nextCols", null)
			set("nextData", null)
		}
		if (type === 'prev') {

			setOldData(undefined)
			setColumns([])
			set("prevCols", null)
			set("prevData", null)
		}
	}

	const loadState = async () => {
		const next = get<string>("nextData").then(data => {
			setNewData(JSON.parse(data))
		})
		console.log(next)
		const cols = get<string>("nextCols").then(data => {
			setColumns(JSON.parse(data))
		})
		console.log(cols)
		const prev = get<string>("prevData").then(data => {
			setOldData(JSON.parse(data))
		})
		console.log(prev)
	}



	useEffect(() => {
		loadState()
	}, [])


	type Entry = {
		change: string
	}


	const colNames = result.length > 0 ? Object.keys(result[0]).slice(0, 10) : [];
	const rawColumns = colNames.map(col => ({
		title: col.toUpperCase(),
		dataIndex: col,
		// width: col.width,
		key: col.toLowerCase(),
		ellipsis: true,
		change: '',
		sorter: (a, b) => a[col] - b[col],
		sortDirections: ['ascend', 'descend'],
		// filters: [
		// 	{ text: 'Additions', value: true },
		// 	{ text: 'Deletions', value: false }
		// ],
		// onFilter: (value, record) => record.add === value,
		defaultSortOrder: ['ascend'],
		render: (text, record) => (
			<div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
				{text}
			</div>
		),
	})).filter(i => !['KEY', 'ADD', 'CHANGE', 'LENDER ID'].includes(i.title))

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
		...rawColumns,
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

	const contentStyle = {
		// padding: '24px',
		width: '100vw',
	}
	const deltaFileUI: React.CSSProperties = {
		padding: '0 100px 0',
		display: 'grid',
		gridTemplateColumns: '1fr 100px 1fr',
		alignItems: 'center',
		justifyItems: 'center'
	}
	return (
		<>

			<div style={contentStyle}>
				<div>
					<div style={deltaFileUI}>

						<Result
							status={oldData ? "success" : "info"}
							title="Previous File Added"
							subTitle={oldData && oldData.fileName ? oldData.fileName : 'No file added'}
							extra={[
								!oldData && <FileSelect label="Old DT Report" slug="prev" callback={handleChange} />,
								oldData && <p><Button key="buy" onClick={() => resetCache('prev')}>Reset</Button></p>,
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
								newData && <p><Button key="buy" onClick={() => resetCache('next')}>Reset</Button></p>,
							]}
						/>

					</div>

				</div>
				{result.length > 0 && (
					<div>
						<Table
							size="small"
							pagination={{
								defaultPageSize: 15
							}}
							expandable={{
								expandedRowRender: renderExpand,
								rowExpandable: record => record.change !== 'Not Expandable',
							}}
							dataSource={result} columns={columns as ColumnsType<Entry>}
							rowClassName={(row, index) => {
								return row.add ? 'row-addition' : 'row-deletion'
							}}
						/>
					</div>
				)}
				{/* <pre>{JSON.stringify(result, null, 2)}</pre> */}
			</div>
		</>

	)
}


export default ReportViewer;
