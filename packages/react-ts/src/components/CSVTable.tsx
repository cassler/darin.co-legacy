import React, { useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import { Table, Popover, Modal, Button, Space, Checkbox, Menu, Row } from 'antd';
import { IParseResultNamed } from '../context';
import { SortAscendingOutlined, DownOutlined } from '@ant-design/icons';


export interface CSVTablePropsI {
	payload: IParseResultNamed,
	columnCount?: number,
	exclude?: string[],
	filename: string
}

type Entry = {
	change: string
	add: string
}
export const CSVTable: React.FC<CSVTablePropsI> = ({ payload, columnCount, exclude, filename }) => {

	const [selectedColumns, setColumns] = useState<string[]>(payload.meta.fields.slice(0, 6))
	const makeTableCols = (fields: string[], first?: number, filter?: string[]) => {
		// const fields = payload.meta.fields
		const sample = payload.data[0]

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
			...fields.map(col => ({
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
			})).filter(i => filter ? filter.includes(i.title) : i)

		]


		return first ? columns.slice(0, first) : columns
	}

	const columns = makeTableCols(selectedColumns, columnCount, exclude)

	function dropCol(e) {
		console.log(e)
		let colIndex = selectedColumns.indexOf(e.target.value);
		if (colIndex < 0) {
			setColumns([
				...selectedColumns,
				e.target.value
			])
		} else {
			setColumns([
				...selectedColumns.slice(0, colIndex),
				...selectedColumns.slice(colIndex + 1, selectedColumns.length)
			])
		}
		// setColumns(e)
	}
	return (
		<>


			<Table
				size="small"
				dataSource={payload.data}
				columns={columns as ColumnsType<Entry>}
				scroll={{ x: 1300, y: 700 }}
				title={() => (
					<div style={{ display: 'flex', justifyContent: 'space-between', paddingRight: '48px' }}>
						<h3>{filename}</h3>
						<Popover content={
							<Menu>
								{payload.meta.fields.map(field => (
									<Row style={{ padding: 2 }}>
										<Checkbox
											onChange={(val) => dropCol(val)}
											style={{ display: 'block' }}
											checked={selectedColumns.includes(field)}
											value={field}>{field}</Checkbox>
									</Row>
								))}
							</Menu>
						}>
							<a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
								Select Columns <DownOutlined />
							</a>
						</Popover>
					</div>
				)}
			/>
		</>
	)
}

export const CSVTableModal: React.FC<CSVTablePropsI> = ({ filename, payload, columnCount, exclude }) => {
	const [visible, toggle] = useState(false)
	return (
		<>
			<Button onClick={() => toggle(!visible)}>
				Preview Data
			</Button>
			<Modal
				visible={visible} width="98vw"
				style={{ top: 75, left: 0, boxSizing: 'border-box' }}
				onCancel={() => toggle(false)}
				onOk={() => toggle(false)}
			>
				<CSVTable filename={filename} payload={payload} columnCount={columnCount} exclude={exclude} />
			</Modal>
		</>
	)
}


export default CSVTable
