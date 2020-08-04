import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Papa from 'papaparse';
import { Workflower, ImplementationResult } from '@wf/core';
import ListView from './components/ListView'
import SelectPartner from './components/SelectPartner';
import FileSelect from './components/FileSelect';
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
	const [partner, setPartner] = useState("BOA")
	const [config, setConfig] = useState(settings.boa);
	const [result, setResult] = useState<ImplementationResult[] | null>(null)
	const [log, setLog] = useState<any>(null)

	const handlePartnerSelect = (partner: string) => {
		setPartner(partner);
		if (partner === "BOA") setConfig(settings.boa);
		if (partner === "DRW") setConfig(settings.drw);
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
			<SelectPartner
				partners={["BOA", "DRW", "CNZ", "GOO"]}
				callback={handlePartnerSelect}
			/>
			<div>
				<FileSelect
					label="Reference Data"
					slug="ref"
					callback={setRef}
					count={reference?.data.length || 0}
				/>
				<FileSelect
					label="Request Data"
					slug="req"
					callback={setReq}
					count={requested?.data.length || 0}
				/>
			</div>

			{requested?.data && reference?.data && (
				<button onClick={() => createResult()}>
					Generate!
				</button>
			)}
			{result && result !== null && (
				<ListView result={result} />
			)}

		</div >
	);
}

export default App;

