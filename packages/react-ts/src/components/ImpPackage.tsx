import React from 'react';
import { ImplementationPackage } from '@wf/core';
import DownloadButton from './DownloadButton';
import { Statistic, Alert, Badge, Layout, Menu, Breadcrumb, Card, Divider, Button, Collapse } from 'antd';
const { Panel } = Collapse;

interface ImpPackageI {
	item: ImplementationPackage,
	description?: string,
	payload?: {
		eBizUpload: any[],
		financeDriverUpload?: any[],
		prodSubAttachment?: any[]
	}
}

const ImpPackage: React.FC<ImpPackageI> = ({ item, payload, description }) => {
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
						<>
							<h4>Get Provisioning Files</h4>
							<DownloadButton label="eBiz Suite" data={payload.eBizUpload} />
							<DownloadButton label="Finance Driver" data={payload.financeDriverUpload} />
							<DownloadButton label="Product Subscript" data={payload.prodSubAttachment} />
						</>
					)}
				</div>
			</div>
			{hasItems && (
				<Collapse onChange={callback}>
					<Panel header={(
						<>
							View Dealers
						<Badge
								count={item.items.length}
								offset={[10, -2]}
							/>
						</>
					)} key={item.title}>
						{/** @todo - make this its own component */}
						{item.items.map(i => (
							<div>
								<b>{i.pid} - {i.account.dbaName}</b>
								<p>{i.notes}</p>
							</div>
						))}

					</Panel>
				</Collapse>
			)}
		</div>
	)
}

export default ImpPackage;
