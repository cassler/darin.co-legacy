import React, { useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import { Table, Modal, Button, Checkbox, Menu, Dropdown, Row, PageHeader } from 'antd';
import { IParseResultNamed } from '../../context';
import { DownOutlined } from '@ant-design/icons';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import OutsideClickHandler from 'react-outside-click-handler';

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
export const CSVTable: React.FC<CSVTablePropsI> = (
	{ payload, columnCount, exclude, filename }
) => {

	const initialColumns = payload.meta.fields.filter(i => payload.data[0][i] !== null)
	const [selectedColumns, setColumns] = useState<string[]>(initialColumns.slice(0, columnCount ? columnCount : 999))

	const makeTableCols = (fields: string[], first?: number, filter?: string[]) => {
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
				width: `${sample[col]}`.length * 10 + 50,
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

	function updateTableColumns(event: CheckboxChangeEvent) {
		// Use value of checkbox to add or remove from current list
		// Find if this value exists in the current column selection
		let colIndex = selectedColumns.indexOf(event.target.value);
		// If we don't have this value, add it.
		if (colIndex < 0) {
			setColumns([
				...selectedColumns,
				event.target.value
			])
			// Otherwise, slice out this value by index
		} else {
			setColumns([
				...selectedColumns.slice(0, colIndex),
				...selectedColumns.slice(colIndex + 1, selectedColumns.length)
			])
		}
	}

	const [showDropdown, toggleDropdown] = useState(false)
	const columns = makeTableCols(selectedColumns, columnCount, exclude)

	const ColumnDropdown = (
		<Dropdown
			visible={showDropdown}
			trigger={['click']}
			overlay={(
				<OutsideClickHandler onOutsideClick={() => toggleDropdown(false)} >
					<Menu style={{ boxShadow: '1px 1px 10px #ccc', padding: '10px 0' }}>
						{payload.meta.fields.map(field => (
							<Row style={{ padding: '4px 20px' }}>
								<Checkbox
									onChange={updateTableColumns}
									style={{ display: 'block' }}
									checked={selectedColumns.includes(field)}
									value={field}>{field}</Checkbox>
							</Row>
						))}

						<Menu.Divider />
						<Menu.Item>
							<Button size="small" onClick={() => setColumns(payload.meta.fields)}>Select All</Button>&nbsp;
											<Button size="small" onClick={() => setColumns([])}>Unselect All</Button>&nbsp;
											<Button size="small" type="primary" onClick={() => toggleDropdown(false)}>OK</Button>
						</Menu.Item>
					</Menu>
				</OutsideClickHandler>

			)}>
			<Button type="link" className="ant-dropdown-link" onClick={() => toggleDropdown(!showDropdown)}>
				Select Columns <DownOutlined />
			</Button>
		</Dropdown>
	)
	return (
		<>
			<Table
				size="small"
				dataSource={payload.data}
				columns={columns as ColumnsType<Entry>}
				scroll={{ x: 1300, y: 700 }}
				title={() => (
					<PageHeader
						title={filename}
						extra={ColumnDropdown}
					/>
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


export default CSVTable;

