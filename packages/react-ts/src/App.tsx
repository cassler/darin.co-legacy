import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Papa from 'papaparse';

import { Workflower, partnerConfigInput } from '@wf/core';
import { getJSONfromSpreadsheet } from '@wf/csv'; // Utility for easy file handling

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
	// requested: getJSONfromSpreadsheet(settings.submitted_file), // JSON of local file indicated
	// reference: getJSONfromSpreadsheet(settings.dt_report_file) // JSON of local file indicated
}


export interface IParseResult {
	data: any[];
	errors: any;
	meta: any;
}

function App() {
	const [requested, setReq] = useState<IParseResult | null>(null)
	const [reference, setRef] = useState<IParseResult | null>(null)
	const [prefs, setPrefs] = useState<any | null>(null)

	const [result, submitWF] = useState<any | null>(null)

	const handleSubmit = (event: any, target: string) => {
		let files = event.target.files;
		for (const file of files) {
			Papa.parse(file, {
				dynamicTyping: true,
				header: true,
				complete: function (res) {
					if (target === "req") setReq(res);
					if (target === "ref") setRef(res)
				}
			})
		}
		console.log(files)
	}

	const createWF = () => {
		let wf = new Workflower(prefs);
		submitWF(wf.matchResult())
	}

	useEffect(() => {
		if (requested && reference) {
			setPrefs({
				partner: "BOA",
				config: settings,
				requested,
				reference
			})
		}
	}, [requested, reference, prefs])

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.tsx</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
        </a>
				<label>Select Reference Data</label>
				<input onChange={(e) => handleSubmit(e, "ref")} type="file" />
				<hr />
				<label>Select Request Data</label>
				<input onChange={(e) => handleSubmit(e, "req")} type="file" />


				{prefs && (
					<div>
						<button onClick={(e) => createWF()}>
							Generate
							</button>
						{/* <pre>{JSON.stringify(prefs, null, 2)}</pre> */}
						<code><pre>
							{JSON.stringify(result, null, 2)}
						</pre></code>
					</div>

				)}
			</header>
		</div>
	);
}

export default App;
