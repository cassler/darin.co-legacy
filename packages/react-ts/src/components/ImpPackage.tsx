import React from 'react';
import { ImplementationPackage } from '@wf/core';
import DownloadButton from './DownloadButton';
import ProvisioningButtons from './ProvisioningButtons';
import { Alert, Badge, Collapse } from 'antd';
import CsvDownloader from 'react-csv-downloader';
import { PartnerCode } from '../App';

export interface ImpPayloadI {
	eBizUpload: any[],
	financeDriverUpload: any[],
	prodSubAttachment: any[]
}
export interface ImpPackageI {
	item: ImplementationPackage,
	description?: string,
	partner: PartnerCode,
	payload?: ImpPayloadI
}

const ImpPackage: React.FC<ImpPackageI> = ({ item, payload, description, partner }) => {
	const callback = (key: string | string[]): void => {
		console.log(key)
	}
	const type = item.type ? item.type : "info";
	const hasItems = item.items && item.items.length > 1;
	const className = payload ? "main-output" : "default-output";
	return (
		<div>
			<div className={className}>
				<Alert
					message={(
						<h4>
							{item.title}

						</h4>
					)}
					description={item.message}
					type={type}
					showIcon
				/>
				<div>
					{payload && (
						<ProvisioningButtons
							payload={payload}
							partner={partner}
							title="Get Provisioning Files"
						/>
					)}
				</div>
			</div>
			{hasItems && (
				<Collapse onChange={callback}>
					<Collapse.Panel header={(
						<h4>
							View Dealers
							<DownloadButton label="Download as CSV" data={item.items} partner={partner} />
						</h4>
					)} key={item.title}>
						{item.items.map(i => (
							<div>
								{/** @todo - make this its own component */}
								<b>{i.pid} - {i.account.dealertrackID} - {i.account.dbaName}</b>
								<p>{i.account.enrollment}</p>
								<p>{i.notes}</p>
								<p>{i.original["Date Entered"] || null}</p>
								<p>corp serv: {i.original["Corporate Services Addendum Status"] || null}</p>
								<p>prog_act: {i.original["Program Active Status"] || null}</p>
								<code><pre>{JSON.stringify(i.original)}</pre></code>
								{/**@todo ----------------------------------- end */}
							</div>
						))}
					</Collapse.Panel>
				</Collapse>
			)}
		</div>
	)
}



export default ImpPackage;
