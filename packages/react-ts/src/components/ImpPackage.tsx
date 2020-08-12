import React from 'react';
import { ImplementationPackage, ImplementationResult } from '@wf/core';
import DownloadButton from './DownloadButton';
import ProvisioningButtons from './ProvisioningButtons';
import { Alert, Divider, Collapse } from 'antd';
import { PartnerCode } from '@wf/types';

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
	// const className = payload ? "main-output" : "default-output";
	return (
		<div>
			<div>
				<Alert
					message={(
						<h4>
							{item.title}
							{item.items.length > 0 && (
								<>
									<Divider type="vertical" />
									{item.items.length}
								</>
							)}
						</h4>
					)}
					description={description}
					type={type}
					showIcon
				/>
			</div>
			{hasItems && (
				<Collapse onChange={callback} ghost>
					<Collapse.Panel header={(
						<h4>
							Preview Dealers
							{payload ? (
								<>
									<Divider type="vertical" />
									<ProvisioningButtons
										payload={payload}
										partner={partner}
										title="Get Provisioning Files"
									/>
								</>
							) : (
									<DownloadButton label="Download raw CSV" data={item.items} partner={partner} />
								)}
						</h4>
					)} key={item.title}>
						{item.items.map(i => <ResultItem item={i} partner={partner} />)}
					</Collapse.Panel>
				</Collapse>
			)}
		</div>
	)
}

interface ResultItemI {
	item: ImplementationResult,
	partner: PartnerCode
}
export const ResultItem: React.FC<ResultItemI> = ({ item, partner }) => {
	const keypairs = Object.keys(item.original).map((col, index) => ({
		name: col,
		val: Object.values(item.original)[index]
	})).filter(i => i.val !== null)
	return (
		<div>
			<h4>
				{partner} <code>{item.pid}</code> / DT <code>{item.account.dealertrackID}</code>
				<Divider type="vertical" />
				<small>{item.notes}</small>
			</h4>
			<div style={{ display: "flex", overflow: "scroll", maxWidth: '60vw', }}>
				{keypairs.map(i => (

					<div style={{ display: "inline-block", flexShrink: 0 }}>{i.val}
						<Divider type="vertical" /></div>
				))}
			</div>
			<Divider dashed />
		</div>
	)
}



export default ImpPackage;
