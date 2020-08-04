import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Workflower, ImplementationResult } from '@wf/core';
import ListView from './components/ListView'
import SelectPartner from './components/SelectPartner';
import FileSelect from './components/FileSelect';
import { data as drwRequestData } from './data/drwRequest';
import { data as drwRefData } from './data/refData';
import { settings } from './data/settings';
import { Statistic } from 'antd';

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
			<div className="App-control">
				<h2>Create Workflower for &nbsp;
					<SelectPartner
						partners={["BOA", "DRW", "CNZ", "GOO"]}
						callback={handlePartnerSelect}
					/>
				</h2>
			</div>
			<div className="Uploaders">
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
			<div className="Statline">
				<Statistic title="Live with Partner" value={config.live_ids.length} />
				<Statistic title="DT Accounts" value={reference?.data.length} />
				<Statistic title="Items on Request" value={requested?.data.length} />
			</div>

			{
				requested?.data && reference?.data && (
					<button onClick={() => createResult()}>
						Generate!
					</button>
				)
			}
			{log && (
				<pre>{JSON.stringify(log, null, 2)}</pre>
			)}
			{
				result && result !== null && (
					<ListView result={result} />
				)
			}

		</div >
	);
}

export default App;

