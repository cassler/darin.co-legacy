import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Papa from 'papaparse';

import { Workflower, ImplementationResult } from '@wf/core';


import { data as drwRequestData } from './data/drwRequest';
import { data as drwRefData } from './data/refData';
import { settings } from './data/settings';

const AppProps = {
	partner: "BOA", // "BOA"
	config: settings.boa, // see partner_settings.ts
	requested: drwRequestData,
	reference: drwRefData
}


export interface IParseResult {
	data: any[];
	errors: any;
	meta: any;
}

function App() {
	const [requested, setReq] = useState<IParseResult | undefined>(AppProps.requested)
	const [reference, setRef] = useState<IParseResult | undefined>(AppProps.reference)
	const [partner, setPartner] = useState("DRW")
	const [config, setConfig] = useState(settings.drw);
	const [result, setResult] = useState<ImplementationResult[] | null>(null)
	const [log, setLog] = useState<any>(null)

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

	useEffect(() => {
		if (!result) {
			if (requested && reference && partner && config) {
				const wf = new Workflower({
					partner,
					config,
					requested: requested.data,
					reference: reference.data
				});
				setResult(wf.init);
			}
		}
	}, [result, requested, reference, partner, config])

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
				setLog(res.itemsToImplement);
				return;
			}
		}
	}




	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
			</header>
			<p>
				Using settings for {partner}.
					<li>{config.live_ids?.length} dealers live</li>
				<li>Looking at internal ID: {JSON.stringify(config.internal_id)}</li>
				<li><b>CRM:</b> {JSON.stringify(config.crm)}</li>
				<li><b>Reference: </b><a href={config.reference_doc}>Sharepoint Doc</a></li>
			</p>

			<div style={styles.twoUp}>
				<div style={styles.inner}>
					<label>Select Reference Data</label><br />
					<input onChange={(e) => handleSubmit(e, "ref")} type="file" />
					<h4>Reference Count: {reference?.data.length}</h4>
				</div>
				<div style={styles.inner}>
					<label>Select Request Data</label><br />
					<input onChange={(e) => handleSubmit(e, "req")} type="file" />
					<h4>Requested Count: {requested?.data.length}</h4>
				</div>
			</div>
			{requested?.data && reference?.data && (
				<button onClick={() => createResult()}>
					Generate!
				</button>
			)}
			<div className="App-list">
				{result ? (
					<div>
						<h2>Results</h2>
						<ul>
							{result && result.length > 1 ? result.map(i => (
								<li>
									<h3>
										<small>Partner: {i.pid} / DT: {i.account?.dealertrackID} - {i.account?.enrollment}</small><br />
										{i.account?.dbaName}</h3>

								</li>
							)) : null}
						</ul>
					</div>
				) : (
						<div>...calculating</div>
					)}
			</div>
		</div >
	);
}

export default App;

export const ResultItem = (item: ImplementationResult) => (
	<div>
		{item.pid}
	</div>
)

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
