import React from 'react';
import { Button } from 'antd';
import { CSVLink } from 'react-csv';
import moment from 'moment';
import { PartnerCode } from '@wf/types';
import { CloudDownloadOutlined } from '@ant-design/icons'
type Props = {
	label: string,
	data: any[],
	partner: PartnerCode,
	count?: number,
	type?: "dashed" | "default" | "ghost" | "link" | "primary" | "text"
}
const DownloadButton: React.FC<Props> = ({ label, data, partner, type }) => {
	let today = moment().format("MM-DD-YYYY");
	let filename = label.replace(/ /g, "_") + `-${partner}-${today}.csv`
	return (
		<CSVLink
			data={data}
			filename={filename}
		>
			<Button type={type || "link"} >
				<CloudDownloadOutlined />
				{label}
			</Button>
		</CSVLink>
	)
}


export default DownloadButton;
