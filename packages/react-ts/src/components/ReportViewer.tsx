import React, { useState, useEffect } from 'react';
import FileSelect from './FileSelect';
import { IParseResult } from '../context';
import * as jsdiff from 'diff';
import { Button, Table } from 'antd';
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
		value: string
	}[]>([])

	const diffData = (oldObj: object[], newObj: object[]) => {

		let oldStr = truncateEntry(oldObj).map(i => JSON.stringify(i)).join('\n')
		let newStr = truncateEntry(newObj).map(i => JSON.stringify(i)).join('\n')
		return jsdiff.diffLines(oldStr, newStr)
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

	const truncateEntry = (items: object[]) => {
		const truncated = items.map(item => ({
			legalName: item['Legal Name'],
			dbaName: item['DBA Name'],
			street: item['Street'],
			city: item['City'],
			state: item['State'],
			zip: item['Zip'],
			country: item['Country'],
			phone: item['Phone No'],
			fax: item['Fax No'],
			// user_count: item['User Count'],
			dealertrackID: item['DealerTrack Id'],
			partnerID: item['Lender Dealer Id'],
			// lenderRepName: item['Lender Rep Name'],
			enrollment: item['Enrollment Phase']
		}))
		return truncated;
	}

	const tableData = result
		.filter(i => i.added || i.removed)
		.sort((a, b) => {
			return JSON.parse(a.value).partnerID - JSON.parse(b.value).partnerID
		})
		.map((r, index) => {
			let dealer = JSON.parse(r.value);
			return {
				added: r.added,
				removed: r.removed,
				change: r.added ? <PlusCircleOutlined /> : <MinusCircleOutlined />,
				partnerID: dealer.partnerID,
				dealertrackID: dealer.dealertrackID,
				key: `${index}`,
				legalName: dealer.legalName,
				dbaName: dealer.dbaName,
				street: dealer.street,
				city: dealer.city,
				state: dealer.state,
				zip: dealer.zip,
				country: dealer.country,
				phone: dealer.phone,
				fax: dealer.fax,
				enrollment: dealer.enrollment
			}
		})


	const columns = [
		{ name: 'change', width: 50 },
		{ name: 'partnerID', width: 50 },
		{ name: 'dealertrackID', width: 50 },
		{ name: 'dbaName', width: 150 },
		{ name: 'enrollment', width: 100 },
		{ name: 'street', width: 90 },
		{ name: 'city', width: 60 },
		{ name: 'state', width: 30 },
		{ name: 'zip', width: 30 },
		{ name: 'phone', width: 50 }].map(col => ({
			title: col.name.toUpperCase(),
			dataIndex: col.name,
			width: col.width,
			key: col.name.toLowerCase(),
			ellipsis: true,
			render: (text, record) => (
				<div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
					{text}
				</div>
			),
		}))

	return (
		<div>
			<div style={{ display: 'flex', width: '100%' }}>
				<FileSelect label="Old DT Report" slug="prev" callback={handleChange} />
				<FileSelect label="New DT Report" slug="next" callback={handleChange} />
			</div>
			<Button onClick={() => setResult(diffData(oldData.data, newData.data))}>
				Nice
			</Button>
			<Button onClick={() => loadState()}>
				Load
			</Button>
			{tableData.length > 0 && (
				<div>
					<Table
						size="small"
						pagination={{
							defaultPageSize: 50
						}}
						dataSource={tableData} columns={columns}
						rowClassName={(row, index) => {
							return row.added ? 'addition' : 'deletion'
						}}
					/>
				</div>
			)}
		</div>
	)
}


export default ReportViewer;
