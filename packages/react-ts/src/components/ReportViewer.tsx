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

		let oldStr = truncateEntry(oldObj).join('\n')
		let newStr = truncateEntry(newObj).join('\n')
		let raw = jsdiff.diffLines(oldStr, newStr)
		return raw.filter(i => i.added || i.removed).map(type => {
			let { added, removed } = type;
			let entries = type.value.split('\n').filter(i => i.length > 5)
			return entries.map(i => ({
				change: added ? 'add' : 'remove',
				...JSON.parse(i)
			}))
		}).flat().sort((a, b) => a.partnerID - b.partnerID)
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
			phone: item['Phone'],
			fax: item['Fax'],
			// user_count: item['User Count'],
			dealertrackID: item['DealerTrack Id'],
			partnerID: item['Partner Dealer ID'],
			// lenderRepName: item['Lender Rep Name'],
			enrollment: item['Enrollment Phase']
		})).sort((a, b) => a.partnerID - b.partnerID)
		return truncated.map(i => JSON.stringify(i))
	}


	useEffect(() => {
		loadState()
	}, [])



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

			{result.length > 0 && (
				<div>
					<Table
						size="small"
						pagination={{
							defaultPageSize: 50
						}}
						dataSource={result} columns={columns}
						rowClassName={(row, index) => {
							return row.change === 'add' ? 'addition' : 'deletion'
						}}
					/>
				</div>
			)}
			<pre>{JSON.stringify(result, null, 2)}</pre>
		</div>

	)
}


export default ReportViewer;
