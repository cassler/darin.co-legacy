import { ColumnsType } from 'antd/es/table';
import React, { useState, useEffect } from 'react';
import FileSelect from './FileSelect';
import { IParseResult } from '../context';
import * as jsdiff from 'diff';
import { Button, Table, Descriptions } from 'antd';
import JSONTree from 'react-json-tree'
import { set, get } from 'idb-keyval';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons'


export function ReportViewer() {
	const [oldData, setOldData] = useState<IParseResult | null>(null);
	const [newData, setNewData] = useState<IParseResult | null>(null);
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
				change: added ? <PlusCircleOutlined /> : <MinusCircleOutlined />,
				add: added ? true : false,
				...JSON.parse(i)
			}))
		}).flat().map((item, key) => ({
			...item,
			key
		}))
	}

	const handleChange = (result: IParseResult, slug: string) => {
		if (slug === 'next') {
			setNewData(result)
			setColumns(result.meta.fields)
			set("nextCols", JSON.stringify(result.meta.fields))
			set("nextData", JSON.stringify(result))
		}
		if (slug === 'prev') {
			setOldData(result)
			setColumns(result.meta.fields)
			set("prevCols", JSON.stringify(result.meta.fields))
			set("prevData", JSON.stringify(result))
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
	const columns = colNames.map(col => ({
		title: col.toUpperCase(),
		dataIndex: col,
		// width: col.width,
		key: col.toLowerCase(),
		ellipsis: true,
		change: '',
		sorter: (a, b) => a[col] - b[col],
		sortDirections: ['ascend', 'descend'],
		// defaultSortOrder: ['ascend'],
		// render: (text, record) => (
		// 	<div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
		// 		{text}
		// 	</div>
		// ),
	})).filter(i => i.title !== 'KEY' && i.title !== 'ADD')


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
		padding: '20px',
		border: '3px solid #f00'
	}
	const sideBarStyle = {
		padding: '24px 48px 24px 24px',
		display: "grid",
		gridTemplateRows: "min-content 1fr min-content"
	}
	return (
		<>
			<div style={{ ...sideBarStyle, border: '1px solid #f00' }}>

				<FileSelect label="Old DT Report" slug="prev" callback={handleChange} />
				<FileSelect label="New DT Report" slug="next" callback={handleChange} />

				<Button onClick={() => setResult(diffData(oldData.data, newData.data))}>
					Nice
			</Button>
				<Button onClick={() => loadState()}>
					Load
			</Button>
			</div>
			<div style={contentStyle}>
				{result.length > 0 && (
					<div>
						<Table
							size="small"
							pagination={{
								defaultPageSize: 50
							}}
							expandable={{
								expandedRowRender: renderExpand,
								rowExpandable: record => record.change !== 'Not Expandable',
							}}
							dataSource={result} columns={columns as ColumnsType<Entry>}
							rowClassName={(row, index) => {
								return row.add ? 'addition' : 'deletion'
							}}
						/>
					</div>
				)}
				<pre>{JSON.stringify(result, null, 2)}</pre>
			</div>
		</>

	)
}


export default ReportViewer;
