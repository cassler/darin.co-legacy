import React from 'react';
import { ImplementationResult, toPhone } from '@wf/core';
import { Card, Badge, Tooltip, Typography, Space, Divider } from 'antd';
import { BadgeProps } from 'antd/lib/badge'
const { Text } = Typography;

type Props = {
	item: ImplementationResult
}

interface BadgeListProps extends BadgeProps {
	desc: string
}

export const DealerListItem: React.FC<Props> = ({ item }) => {
	const { street, city, state, zip } = item.account;
	const {
		enrollmentStatusOK,
		notImplemented,
		accountStatusOK,
		partnerStatusOK
	} = item.checks;

	const badges: BadgeListProps[] = [
		{
			title: 'Enrollment',
			status: enrollmentStatusOK ? "success" : "warning",
			desc: 'Meets DT Enrollment requirements?'
		},
		{
			title: 'Account',
			status: accountStatusOK ? "success" : "warning",
			desc: 'Valid DT account found?'
		},
		{
			title: 'Partner',
			status: partnerStatusOK ? "success" : "warning",
			desc: 'Meets partner requirements?'
		},
		{
			title: 'Live',
			status: notImplemented ? "default" : "warning",
			desc: 'Is this dealer already live?'
		},
	]

	const cardShadow = {
		boxShadow: '2px 5px 10px rgba(100,100,110,0.2), 1px 1px 3px rgba(50,50,50,0.1)'
	}
	return (
		<Card style={cardShadow}>
			<Space>
				<div>
					<Text disabled><small>Partner</small></Text><br />
					<Text strong>{item.pid}</Text>
				</div>
				<Divider type="vertical" />
				<div>
					<Text disabled><small>DealerTrack</small></Text><br />
					<Text strong>{item.account.dealertrackID}</Text>
				</div>
			</Space>
			<Divider />
			<h2 style={{ fontWeight: 700, lineHeight: '1.1em' }}>
				{item.account.legalName}
			</h2>
			<Space style={{ fontSize: '10px' }}>
				{badges.map(b => (
					<Tooltip title={b.desc}>
						<div><Badge status={b.status} title={b.title} />{b.title}</div>
					</Tooltip>
				))}
			</Space>
			<Divider />
			<div>
				<Text type="secondary">
					{street}<br /> {city}, {state} {zip}
				</Text><br />
				<Text disabled>{item.account.phone > 0 && toPhone(item.account.phone)}</Text>
			</div>
		</Card>
	)
}
export default DealerListItem;
