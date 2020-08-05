import React from 'react';
import { Button, Badge, Space } from 'antd';
import { CSVLink } from 'react-csv';
import moment from 'moment';
import { PartnerCode } from '../App';

type Props = {
	label: string,
	data: any[],
	partner: PartnerCode,
	count?: number,
	type?: "dashed" | "default" | "ghost" | "link" | "primary" | "text"
}
const DownloadButton: React.FC<Props> = ({ label, data, partner, type }) => {
	let today = moment().format("MM-DD-YYYY");
	let filename = label.replace(/ /g, "_") + `-${partner}-${today}`
	return (
		<CSVLink
			data={data}
			filename={filename}
		>
			<Button type={type || "link"}>
				{label}
				<Space size="middle" />
				<Badge count={data.length} offset={[10, -3]} />
			</Button>
		</CSVLink>
	)
}


export default DownloadButton;
