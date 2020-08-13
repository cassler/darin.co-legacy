import React, { useState } from 'react';
import ImpPackage from './ImpPackage';
import { Card, Divider, Collapse, Badge, PageHeader, Typography, Space } from 'antd';
import { ImplementationResult } from '@wf/core'
const { Text, Link } = Typography;

interface actionTexts {
	[key: string]: string
}
const actionItemText: actionTexts = {
	ready: `These are the dealers that are ready to implement for the partner according to the provided data and selected partner settings. Check the results to make sure they correspond to what's expected. You can then download pre-formatted files for provisioning the dealer for billing, finance forms and lead routing.`,
	notContacted: `This account does not meet partner requirements for DT Enrollment. Confirm the DT account is not mis-matched. If the account is properly matched then reach out to ADM (admrequestes@dealertrack.com) and ask that they set the account to 'Prospect'.`,
	cancel: `These dealers are listed as being live do not meet partner requirements. Do NOT process cancellations for dealers who are listed as 'Not Contacted' or 'No DT account found'. Follow the steps above for dealers in these buckets.`,
	notFound: `The partner may not have added these dealers to their DT partner file yet. Wait 24 hours to see if a match takes place. If you continue to receive this error, reach out to the partner to confirm they have properly added the dealer to their DT partner file.`
}

type Props = {
	item: ImplementationResult
}


export function toPhone(str: string | number) {
	let text = str.toString()
	let [areaCode, exchange, num] = [
		text.slice(0, 3),
		text.slice(3, 6),
		text.slice(6, 10)
	]
	return `(${areaCode}) ${exchange}-${num}`
}
export const DealerListItem: React.FC<Props> = ({ item }) => {
	const { street, city, state, zip } = item.account;
	const { enrollmentStatusOK, notImplemented, accountStatusOK, partnerStatusOK } = item.checks;
	return (
		// <div style={{ display: "grid", gridTemplateColumns: '80px 90px 4fr 300px 120px 3fr', gap: '24px', width: '100%', alignItems: 'center' }}>
		<Card>
			<Space>
				<div><Text disabled><small>Partner</small><br /> </Text><Text strong>{item.pid}</Text></div>
				<div><Text disabled><small>DealerTrack</small></Text><br /><Text strong>{item.account.dealertrackID}</Text></div>
			</Space>

			<div>
				<h2>{item.account.legalName}</h2>
			</div>
			<div style={{ fontSize: '10px' }}>
				<Space>
					<div><Badge status={accountStatusOK ? "success" : "warning"} title="Account" />Account</div>
					<div><Badge status={enrollmentStatusOK ? "success" : "warning"} title="Enrollment" />Enrollment</div>
					<div><Badge status={partnerStatusOK ? "success" : "warning"} title="Partner" />Partner</div>
					<div><Badge status={notImplemented ? "default" : "warning"} title="Live" />Live</div>
				</Space>
			</div>
			<Divider />
			<div>
				<Text type="secondary">
					{street}<br /> {city}, {state} {zip}
				</Text><br />
				<Text disabled>{toPhone(item.account.phone)}</Text>
			</div>






		</Card>
	)
}


export const ResultsView = (props) => {
	const { partner, log, result } = props;

	return (
		<>
			<PageHeader
				title={`Results for ${partner}`}
				subTitle={`Showing info for ${result.length} dealers.`}
			/>

			<ImpPackage partner={partner} item={log.implement} description={actionItemText.ready} payload={log.provisioning} />
			<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: '24px' }}>
				{log.implement.items.map(item => (
					<DealerListItem item={item} />
				))}
			</div>
			<Divider />
			<ImpPackage partner={partner} item={log.invalid} description={actionItemText.notContacted} />
			<ImpPackage partner={partner} item={log.unmatched} description={actionItemText.notFound} />
			<ImpPackage partner={partner} item={log.cancel} description={actionItemText.cancel} />

			{result && (
				<>
					{/** --- make this a standalone components */}
					<Divider dashed />
					<h2>Review Data</h2>
					<Collapse>
						<Collapse.Panel header={(
							<h4>Full Report <Badge count={result.length} /></h4>
						)} key={"1"}>
							{result.map(i => (
								<>
									<b>{i.pid} - {i.account.dbaName}</b>
									<p>{i.notes}</p>
								</>
							))}
						</Collapse.Panel>
					</Collapse>
				</>
			)}
		</>
	)
}

export default ResultsView;
