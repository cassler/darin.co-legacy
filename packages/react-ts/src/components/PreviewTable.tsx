import React from 'react';
import { ImplementationResult, toPhone, ImpPayload } from '@wf/core';
import { PartnerCode } from '@wf/types';
import { ProvisioningButtons } from './ProvisioningButtons';
import { Badge, Tooltip, Typography, Space, Table } from 'antd';
import { BadgeProps } from 'antd/lib/badge'
const { Text } = Typography;


interface PreviewTableProps {
	items: ImplementationResult[],
	title?: string,
	excludeSize?: number,
	totalSize?: number,
	summary?: string
	payload?: {
		eBizUpload: any[];
		financeDriverUpload: any[];
		prodSubAttachment: any[];
	},
	partner: PartnerCode
}
export const PreviewTable: React.FC<PreviewTableProps> = ({ items, title, partner, payload, totalSize, excludeSize, summary }) => {

	return (
		<Table
			scroll={{ y: 320 }}
			title={() => (
				<div style={{
					display: 'grid',
					gridTemplateColumns: '1fr 1fr',
					justifyContent: 'space-between',
					padding: '12px',
					alignItems: 'center'
				}}>
					<div>
						<h3>Showing items that are {title} ({items.length})</h3>
						<Text type="secondary">{summary}</Text>
						<Text disabled>Showing info for {totalSize} entries. Excluding {excludeSize} ID noted as live.</Text>
					</div>
					{payload && (

						<div style={{ textAlign: 'right' }}>
							<ProvisioningButtons
								payload={payload}
								partner={partner}
								title="Get Provisioning Files"
							/>
						</div>
					)}
				</div>
			)}

			pagination={{ position: ["bottomRight"], pageSize: 50 }}
			size="small"
			dataSource={items.map(i => ({
				pid: i.pid,
				...i.checks,
				tests: [
					{ name: 'Enrollment Status', value: i.checks.enrollmentStatusOK, desc: 'Meets DT Enrollment requirements?' },
					{ name: 'Account Status', value: i.checks.accountStatusOK, desc: 'Valid DT account found?' },
					{ name: 'Partner Status', value: i.checks.partnerStatusOK, desc: 'Meets partner requirements?' },
					{ name: 'Live Status', value: i.checks.notImplemented, desc: 'Is this dealer already live?' },
				],
				...i.account,
			}))}
			columns={[
				{
					title: 'DT ID',
					dataIndex: 'dealertrackID',
					key: 'dt',
					width: 80,
					render: text => <Text code>{text}</Text>
				},
				{
					title: 'Partner ID',
					dataIndex: 'pid',
					key: 'pid',
					width: 115,
					render: text => <Text code>{text}</Text>
				},
				{
					title: 'Checks',
					dataIndex: 'tests',
					key: 'tests',
					width: 80,
					render: (tests: { name: string, value: boolean, desc: string }[]) => tests.map(t => (
						<Tooltip title={t.desc}>
							<Badge status={t.value ? "success" : "warning"} title={t.name} />
						</Tooltip>
					))
				},
				{
					title: 'Dealer Name',
					dataIndex: 'dbaName',
					key: 'dba'
				},
				{
					title: 'Enrollment Phase',
					dataIndex: 'enrollment',
					key: 'enroll',
					width: 240
				},
				{
					title: 'City',
					dataIndex: 'city',
					key: 'city',
					width: 140
				},
				{
					title: 'State',
					dataIndex: 'state',
					key: 'state',
					width: 65
				},
				{
					title: 'Zip',
					dataIndex: 'zip',
					key: 'zip',
					width: 60
				},

			]} />

		/**
		 * notImplemented
accountStatusOK
partnerStatusOK
		 */
	)
}

export default PreviewTable;
