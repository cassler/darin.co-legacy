import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Workflower, ImplementationResult, ImplementationPackage, ImpPayload } from '@wf/core';

import ListView from './components/ListView'
import SelectPartner from './components/SelectPartner';
import FileSelect from './components/FileSelect';
import { data as drwRequestData } from './data/drwRequest';
import { data as drwRefData } from './data/refData';
import { settings } from './data/settings';
import { Statistic } from 'antd';

const AppProps = {
	partner: "DRW" as PartnerCode, // "BOA"
	config: settings.drw, // see partner_settings.ts
	requested: drwRequestData,
	reference: drwRefData
}

export interface IParseResult {
	data: any[];
	errors: any;
	meta: any;
}

export type PartnerCode = "BOA" | "DRW" | "CNZ" | "GOO" | "DAS"


function App() {

	// Define our initial state and types
	const [requested, setReq] = useState<IParseResult | undefined>(AppProps.requested)
	const [reference, setRef] = useState<IParseResult | undefined>(AppProps.reference)
	const [partner, setPartner] = useState<PartnerCode>(AppProps.partner)
	const [config, setConfig] = useState(AppProps.config);
	const [result, setResult] = useState<ImplementationResult[] | null>(null)
	const [log, setLog] = useState<ImpPayload | null>(null)

	// When choosing a new partner, also apply their configs
	const handlePartnerSelect = (partner: PartnerCode) => {
		setPartner(partner);
		if (partner === "BOA") setConfig(settings.boa);
		if (partner === "DRW") setConfig(settings.drw);
	}

	// If we have enough data, do a new calculation immediately
	useEffect(() => {
		if (!result) {
			if (requested && reference && partner && config) {
				const wf = new Workflower({
					partnerCode: partner,
					options: config,
					requested: requested.data,
					reference: reference.data
				});
				setResult(wf.init);
				setLog(wf.fullPayload);
			}
		}
	}, [result, requested, reference, partner, config])

	// Manually run a new calculation and put results into state
	const createResult = () => {
		if (requested?.data && reference?.data && partner && config) {
			let res = new Workflower({
				partnerCode: partner,
				options: config,
				requested: requested.data,
				reference: reference.data
			})
			if (res.init) {
				setResult(res.init);
				setLog(res.fullPayload);
				return;
			}
		}
	}

	// Return our app
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
			</header>
			<div className="App-control">
				<h2>Create Workflower for &nbsp;
					<SelectPartner
						partners={["BOA", "DRW", "CNZ", "GOO"] as PartnerCode[]}
						defaultPartner={partner}
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
				<div>
					<ImpPackage item={log.cancel} />
					<ImpPackage item={log.implement} />
					<ImpPackage item={log.unmatched} />
					<ImpPackage item={log.invalid} />
				</div>
			)}
			{
				result && result !== null && (
					<ListView result={result} />
				)
			}

		</div >
	);
}

interface ImpPackageI {
	item: ImplementationPackage
}
const ImpPackage: React.FC<ImpPackageI> = ({ item }) => {
	return (
		<div>
			<h3>{item.title} - {item.items.length}</h3>
			<p>{item.message}</p>
		</div>
	)
}

export default App;

