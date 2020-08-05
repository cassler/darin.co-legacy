import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import { Workflower, ImplementationResult, ImpPayload } from '@wf/core';

import SelectPartner from './components/SelectPartner';
import FileSelect from './components/FileSelect';
import ImpPackage from './components/ImpPackage';

import { data as drwRequestData } from './data/drwRequest';
import { data as drwRefData } from './data/refData';
import { settings } from './data/settings';
import { Statistic, Result, Layout, Menu, Breadcrumb, Card, Divider, Button, Badge, Collapse } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

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
	//
	// Most of this could be accomplished with a reducer
	//
	// Define our initial state and types
	//
	const [requested, setReq] =
		useState<IParseResult | undefined>(AppProps.requested)
	const [reference, setRef] =
		useState<IParseResult | undefined>(AppProps.reference)
	const [partner, setPartner] = useState<PartnerCode>(AppProps.partner)
	const [config, setConfig] = useState(AppProps.config);
	const [result, setResult] = useState<ImplementationResult[] | null>(null)
	const [log, setLog] = useState<ImpPayload | null>(null)
	const [busy, toggleBusy] = useState<boolean>(false)

	// this will initialize the app with sample data + results
	const demoMode = false;

	// When choosing a new partner, also apply their configs
	const handlePartnerSelect = (partner: PartnerCode) => {
		setPartner(partner);
		if (partner === "BOA") setConfig(settings.boa);
		if (partner === "DRW") setConfig(settings.drw);
	}

	// fill data with pre-populated values
	const setDemoMode = (hot?: boolean | undefined) => {
		setRef(AppProps.reference);
		setReq(AppProps.requested);
		setPartner(AppProps.partner);
		setConfig(AppProps.config);
		createResult()
	}
	// simple state reset utility
	const resetFormData = () => {
		setRef(undefined)
		setReq(undefined)
		setResult(null)
		setLog(null)
		handlePartnerSelect("BOA")
		setConfig(settings.boa)
	}
	// Manually run a new calculation and put results into state
	const createResult = useCallback(() => {
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
			}
		}
	}, [requested, reference, partner, config])

	useEffect(() => {
		if (!log && demoMode) createResult()
		// return () => {
		// 	cleanup
		// }
	}, [log, createResult, demoMode])


	// define some text for the body
	const actionItemText = "These are the dealers that are ready to implement for the partner according" +
		"to the provided data and selected partner settings. Check the results to make sure" +
		"they correspond to what's expected. You can then download pre-formatted files for" +
		"provisioning the dealer for billing, finance forms and lead routing. "

	// Return our app
	return (
		<Layout>
			<Header className="header">
				<div className="logo" />
				<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
					<Menu.Item key="1">Workflower</Menu.Item>
					<Menu.Item key="2">Docs</Menu.Item>
					<Menu.Item key="3">Github</Menu.Item>
				</Menu>
			</Header>
			<Content style={{ padding: '0 50px' }}>
				<Breadcrumb style={{ margin: '16px 0' }}>
					<Breadcrumb.Item>Tools</Breadcrumb.Item>
					<Breadcrumb.Item>Select Data</Breadcrumb.Item>
					{requested && reference && (<Breadcrumb.Item>Review</Breadcrumb.Item>)}
				</Breadcrumb>
				<Layout className="site-layout-background" style={{ padding: '24px 0' }}>
					<Sider theme="light" className="site-layout-background" width={400}>
						<Card title="Create Workflower">
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
							<Divider />
							<h4>Using settings for</h4>
							<SelectPartner
								partners={["BOA", "DRW", "CNZ", "GOO"] as PartnerCode[]}
								defaultPartner={partner}
								callback={handlePartnerSelect}
							/> &nbsp;
							<Button onClick={() => createResult()} disabled={!requested || !reference} type="primary">
								Generate!
							</Button><br /><br />
							<Button size="small" onClick={() => setDemoMode(true)} type="link">
								Use demo data
							</Button>
							<Button size="small" onClick={() => resetFormData()} type="link">
								Reset Data
							</Button>
						</Card>
						<Card title="Snapshot">
							<Statistic title="Live with Partner" value={config.live_ids.length} />
							<Statistic title="DT Accounts" value={reference?.data.length} />
							<Statistic title="Items on Request" value={requested?.data.length} />
						</Card>
					</Sider>
					<Content style={{ padding: '0 24px', minHeight: 280 }}>
						{log ? (
							<>
								<h2>Action Items</h2>
								<p>{actionItemText}</p>
								<ImpPackage partner={partner} item={log.implement} payload={log.provisioning} description={actionItemText} />
								<Divider dashed />
								<h2>Follow Up Items</h2>
								<div className="GridFour">
									<ImpPackage partner={partner} item={log.invalid} />
									<ImpPackage partner={partner} item={log.unmatched} />
								</div>
								<Divider dashed />
								<h2>Housekeeping</h2>
								<ImpPackage partner={partner} item={log.cancel} />
								{result && (
									<>
										<Divider dashed />
										<h2>Review Data</h2>
										<Collapse>
											<Collapse.Panel header={(
												<>
													<h4>Full Report <Badge count={result.length} /></h4>
												</>
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
						) : busy ? (
							<div>Waiting...</div>
						) : (
									<Result
										status="404"
										title="Ready"
										subTitle="Provide a DT report and a request file."
										extra={(
											<Button
												type="primary"
												disabled={!reference || !requested}
												onClick={() => createResult()}>
												I did!
											</Button>
										)}
									/>
								)}
					</Content>
				</Layout>
			</Content>
			<Footer style={{ textAlign: 'center' }}>Darin Cassler & Cox Auto ©2020</Footer>
		</Layout >


	);
}



export default App;

