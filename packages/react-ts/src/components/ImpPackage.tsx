import React from 'react';
import { ImplementationPackage } from '@wf/core';
import DownloadButton from './DownloadButton';
import { Alert, Badge, Collapse } from 'antd';

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
							{/**@todo make this its own component ----- start */}
							<h4>Get Provisioning Files</h4>
							<DownloadButton label="eBiz Suite" data={payload.eBizUpload} />
							<DownloadButton label="Finance Driver" data={payload.financeDriverUpload} />
							<DownloadButton label="Product Subscript" data={payload.prodSubAttachment} />
							{/**@todo ----------------------------------- end */}
						</>
					)}
				</div>
			</div>
			{hasItems && (
				<Collapse onChange={callback}>
					<Collapse.Panel header={(
						<h4>View Dealers <Badge count={item.items.length} /></h4>
					)} key={item.title}>
						{item.items.map(i => (
							<div>
								{/** @todo - make this its own component */}
								<b>{i.pid} - {i.account.dbaName}</b>
								<p>{i.notes}</p>
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
