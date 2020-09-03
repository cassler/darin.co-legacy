import React, { useState } from 'react';
import { Table, PageHeader, Modal, Button } from 'antd';
import { IParseResultNamed } from '../context';
import { ColumnsType } from 'antd/es/table';

export interface CSVTablePropsI {
	payload: IParseResultNamed,
	columnCount?: number,
	exclude?: string[]
}
export const CSVTable: React.FC<CSVTablePropsI> = ({ payload, columnCount, exclude }) => {

	const makeTableCols = (payload: IParseResultNamed, first?: number, filter?: string[]) => {
		const fields = payload.meta.fields
		const sizes = Object.values(payload.data[0])
		const columns = fields.map((col, index) => ({
			title: col.toUpperCase(),
			dataIndex: col,
			key: col.toLowerCase(),
			ellipsis: true,
			width: 30 + `${sizes[index]}`.length * 10,
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

	const columns = makeTableCols(payload, columnCount, exclude)

	return (
		<Table
			size="small"
			dataSource={payload.data}
			columns={columns}
			scroll={{ x: 1300 }}
		/>
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
