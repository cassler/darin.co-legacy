import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { getJSONfromSpreadsheet } from '../../csv';
// import { Workflower } from '@wf/core';

const partner_settings = [
	{// identify settings and fill certain fields
		partner: "BOA",
		// ebiz profile entry
		crm: "NoReply@bankofamerica.com",
		// ebiz profile entry
		dealerContact: "NoReply@bankofamerica.com",
		// ebiz profile entry
		internal_id: "Dealer Magellan #",
		// name of ID used internally by partner
		leads: "NoReply@bankofamerica.com",
		// value used for eBiz profile "DT Dealer ID"
		ebiz_dt_dealer_id_field: "DealerTrack Id",
		// JSON of file submission from this partner
		submitted_file: "/Users/darin/Code/@workflower/packages/examples/src/data/shorter-as-csv-new.csv",
		// JSON of DT Business Report for partner
		dt_report_file: "/Users/darin/Code/@workflower/packages/examples/src/data/115b4b53-2907-4d9b-b917-9134ff44eed3.csv",
		// list of IDs live with service, any way you want
		live_ids: [1, 2, 3],
		ebiz_profile: 5860435,
		// Enrollment Phases to Accept
		valid_phases: ["Password Issued", "Prospect", "Reactivate", "Access Agreement Received"],
		generate: {
			fd: true,
			ebs: true,
			ps: true,
			info: true,
		},
		reference_doc: 'https://coxautoinc.sharepoint.com/:w:/r/sites/LendingandTier1DigitalRetailing/_layouts/15/Doc.aspx?sourcedoc=%7B1CE6D145-6232-4183-9658-F98696769E5A%7D&file=How%20to%20Complete%20a%20CarNow%20Lender%20Project.docx&action=default&mobileredirect=true',
		// extra tests to be performed like checking "Program Active Status"
		custom_validation: (item: any) => {
			// console.log('validating', item)
			return (
				item["Program Active Status"] === "Active" &&
				// item["Corporate Services Addendum Status"].includes("Completed")
				item["Corporate Services Addendum Status"] === ("Completed")
			)
		},
	}
]

function App() {

	const [config, setConfig] = useState(partner_settings[0])

	const ref = getJSONfromSpreadsheet(config.dt_report_file);
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.tsx</code> and save to reload.
        </p>
				<code>
					{JSON.stringify(ref)}
				</code>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
        </a>
			</header>
		</div>
	);
}

export default App;
