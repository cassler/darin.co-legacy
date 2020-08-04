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
		<div>
			<h4>{label} - {count}</h4>
			<input onChange={(e) => getJSON(e)} type="file" />
		</div>
	)
}


export default FileSelect;
