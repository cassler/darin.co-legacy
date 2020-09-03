import React, { useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import { Table, Dropdown, Modal, Button, Row, Checkbox, Menu } from 'antd';
import { IParseResultNamed } from '../context';
import { SortAscendingOutlined, DownOutlined } from '@ant-design/icons';


export interface CSVTablePropsI {
	payload: IParseResultNamed,
	columnCount?: number,
	exclude?: string[]
}

type Entry = {
	change: string
	add: string
}
export const CSVTable: React.FC<CSVTablePropsI> = ({ payload, columnCount, exclude }) => {

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
			<Dropdown placement="bottomRight" overlay={
				<Menu>
					{payload.meta.fields.map(field => (
						<Menu.Item>
							<Checkbox
								onChange={(val) => dropCol(val)}
								style={{ display: 'block' }}
								checked={selectedColumns.includes(field)}
								value={field}>{field}</Checkbox>
						</Menu.Item>
					))}
				</Menu>
			}>
				<a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
					Select Columns <DownOutlined />
				</a>
			</Dropdown>

			<Table
				size="small"
				dataSource={payload.data}
				columns={columns as ColumnsType<Entry>}
				scroll={{ x: 1300 }}

			/>
		</>
	)
}

export const CSVTableModal: React.FC<CSVTablePropsI> = ({ payload, columnCount, exclude }) => {
	const [visible, toggle] = useState(false)
	return (
		<>
			<Button onClick={() => toggle(!visible)}>
				Preview Data
			</Button>
			<Modal
				visible={visible} title={payload.fileName} width="95vw"
				style={{ width: '95vw', height: '100vh' }}
				onCancel={() => toggle(false)}
				onOk={() => toggle(false)}
			>
				<CSVTable payload={payload} columnCount={columnCount} exclude={exclude} />
			</Modal>
		</>
	)
}


export default CSVTable
