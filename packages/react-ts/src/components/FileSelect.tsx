import React from 'react';
import { Card, Tag } from 'antd';
import 'antd/dist/antd.css';
import Papa from 'papaparse';


type Props = {
	label: string,
	count?: number,
	slug: string,
	callback: Function,
}
const FileSelect: React.FC<Props> = ({ label, count, callback }) => {
	const getJSON = (event: any) => {
		for (const file of event.target.files) {
			Papa.parse(file, {
				header: true,
				dynamicTyping: true,
				complete: (res) => {
					callback(res)
				}
			})
		}
	}
	return (
		<Card title={label}>
			<input onChange={(e) => getJSON(e)} type="file" />
			<h4>Reference Count: {count}</h4>
		</Card>
	)
}


export default FileSelect;
