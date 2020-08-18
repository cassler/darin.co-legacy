import React from 'react';
import { Button } from 'antd';
import { CSVLink } from 'react-csv';
import moment from 'moment';
import { PartnerCode } from '@wf/types';
import { CloudDownloadOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd';

type Props = {
	label: string,
	data: any[],
	partner: PartnerCode,
	count?: number,
	tip?: string,
	type?: "dashed" | "default" | "ghost" | "link" | "primary" | "text"
}
const DownloadButton: React.FC<Props> = ({ label, data, partner, type, tip }) => {
	let today = moment().format("MM-DD-YYYY");
	let filename = label.replace(/ /g, "_") + `-${partner}-${today}.csv`
	return (
		<CSVLink
			data={data}
			filename={filename}
		>
			<Tooltip title={tip ? tip : label}>
				<Button type={type || "link"} >
					<CloudDownloadOutlined />
					{label}
				</Button>
			</Tooltip>
		</CSVLink>
	)
}


export default DownloadButton;
