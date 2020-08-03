import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Papa from 'papaparse';

import { Workflower, partnerConfigInput } from '@wf/core';

import { data as drwRequestData } from './data/drwRequest';
import { data as drwRefData } from './data/refData';

const settings = {
	partner: "DRW",
	crm: "NoEmail@darwinautomotive.com",
	dealerContact: "NoEmail@darwinautomotive.com",
	leads: "NoEmail@darwinautomotive.com",
	internal_id: "Partner Dealer ID",
	ebiz_dt_dealer_id_field: "Lender Dealer Id",
	submitted_file: "/Users/darin/Code/@workflower/packages/examples/src/data/Digital_Retail_Suite_Dealer_File-DRW(4).csv",
	dt_report_file: "/Users/darin/Code/@workflower/packages/examples/src/data/c8bf95f1-b4d8-486d-ad1b-3c4f0e6b69a6.csv",
	live_ids: [1, 2, 3, 4],
	ebiz_profile: 7531215,
	valid_phases: ["Password Issued", "Prospect", "Reactivate", "Access Agreement Received"],
	reference_doc: 'https://coxautoinc.sharepoint.com/:w:/r/sites/LendingandTier1DigitalRetailing/_layouts/15/Doc.aspx?sourcedoc=%7B1CE6D145-6232-4183-9658-F98696769E5A%7D&file=How%20to%20Complete%20a%20CarNow%20Lender%20Project.docx&action=default&mobileredirect=true',
	generate: {
		fd: true,
		ebs: true,
		ps: true,
		info: true,
	},
	custom_validation: (item: any) => {
		return item.hasOwnProperty('Status') && item.Status === "A"
	},
}

const AppProps = {
	partner: "BOA", // "BOA"
	config: settings, // see partner_settings.ts
	submitted: settings.submitted_file,
	requested: drwRequestData,
	reference: drwRefData,
}


export interface IParseResult {
	data: any[];
	errors: any;
	meta: any;
}

function App() {
	const [requested, setReq] = useState<IParseResult | undefined>(AppProps.requested)
	const [reference, setRef] = useState<IParseResult | undefined>(AppProps.reference)
	const [partner, setPartner] = useState("BOA")
	const [config, setConfig] = useState(AppProps.config);
	const [result, setResult] = useState<any>({})

	const handleSubmit = (event: any, label: string) => {
		if (label === "req") {
			/// set requestdata
			for (const file of event.target.files) {
				Papa.parse(file, {
					header: true,
					dynamicTyping: true,
					complete: (res) => {
						setReq(res)
					}
				})
				createResult()
			}

		};
		if (label === "ref") {
			/// set reference data
			for (const file of event.target.files) {
				Papa.parse(file, {
					header: true,
					dynamicTyping: true,
					complete: (res) => {
						setRef(res)
					}
				})
				createResult()
			}
		}
	}

	const createResult = () => {
		if (requested?.data && reference?.data && partner && config) {
			let res = new Workflower({
				partner,
				config,
				requested: requested.data,
				reference: reference.data
			})
			if (res.init) {
				setResult(res.init);
				return;
			}
		}
	}




	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.tsx</code> and save to reload.
				</p>

				<div style={styles.twoUp}>
					<div style={styles.inner}>
						<label>Select Reference Data</label><br />
						<input onChange={(e) => handleSubmit(e, "ref")} type="file" />
					</div>
					<div style={styles.inner}>
						<label>Select Request Data</label><br />
						<input onChange={(e) => handleSubmit(e, "req")} type="file" />
					</div>
				</div>
				{requested && requested?.data && reference?.data && (
					<>
						<h4>Requested Count: {requested.data.length}</h4>
						<h4>Reference Count: {reference.data.length}</h4>
						<button onClick={() => createResult()}>
							Generate!
						</button>
					</>
				)}

			</header>
			<div className="App-list">
				<pre><code>{JSON.stringify(result, null, 2)}</code></pre>
			</div>
		</div>
	);
}

export default App;

const styles = {
	twoUp: {
		display: "flex",
		gridGap: "10px"
	},
	middle: {
		maxWidth: "600px",
		marginLeft: "auto",
		marginRight: "auto",
		fontSize: "12px",
		align: "left",
	},
	inner: {
		padding: "15px",
		border: "1px solid #ccc",
		margin: "10px"
	}
}
