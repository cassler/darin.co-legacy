import React from 'react';
import ImpPackage from './ImpPackage';
import { Divider, Collapse, Badge } from 'antd';

interface actionTexts {
	[key: string]: string
}
const actionItemText: actionTexts = {
	ready: `These are the dealers that are ready to implement for the partner according to the provided data and selected partner settings. Check the results to make sure they correspond to what's expected. You can then download pre-formatted files for provisioning the dealer for billing, finance forms and lead routing.`,
	notContacted: `Confirm the DT account is not mis-matched. If the account is properly matched then reach out to ADM (admrequestes@dealertrack.com) and ask that they set the account to 'Prospect'.`,
	cancel: `Do NOT process cancellations for dealers who are listed as 'Not Contacted' or 'No DT account found'. Follow the steps above for dealers in these buckets.`,
	notFound: `The partner may not have added these dealers to their DT partner file yet. Wait 24 hours to see if a match takes place. If you continue to receive this error, reach out to the partner to confirm they have properly added the dealer to their DT partner file.`
}

export const ResultsView = (props) => {
	const { partner, log, result } = props;
	return (
		<>
			<h2>Action Items</h2>
			{/* <p>{actionItemText}</p> */}
			<ImpPackage partner={partner} item={log.implement} payload={log.provisioning} description={actionItemText.ready} />
			<Divider dashed />
			<h2>Follow Up Items</h2>
			<div className="GridFour">
				<ImpPackage partner={partner} item={log.invalid} description={actionItemText.notContacted} />
				<ImpPackage partner={partner} item={log.unmatched} description={actionItemText.notFound} />
			</div>
			<Divider dashed />
			<h2>Housekeeping</h2>
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
