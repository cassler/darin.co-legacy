import React, { useState, useEffect } from 'react';
import './App.css';
import { Workflower, ImplementationResult, ImpPayload } from '@wf/core';

import ListView from './components/ListView'
import SelectPartner from './components/SelectPartner';
import FileSelect from './components/FileSelect';
import ImpPackage from './components/ImpPackage';

import { data as drwRequestData } from './data/drwRequest';
import { data as drwRefData } from './data/refData';
import { settings } from './data/settings';
import { Statistic, Space, Layout, Menu, Breadcrumb, Card, Divider, Button } from 'antd';
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

	const actionItemText = "These are the dealers that are ready to implement for the partner according" +
		"to the provided data and selected partner settings. Check the results to make sure" +
		"they correspond to what's expected. You can then download pre-formatted files for" +
		"provisioning the dealer for billing, finance forms and lead routing. "

	// Return our app
	return (
		<Layout>
			<Header className="header">
				<div className="logo" />
				<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
					<Menu.Item key="1">nav 1</Menu.Item>
					<Menu.Item key="2">nav 2</Menu.Item>
					<Menu.Item key="3">nav 3</Menu.Item>
				</Menu>
			</Header>
			<Content style={{ padding: '0 50px' }}>
				<Breadcrumb style={{ margin: '16px 0' }}>
					<Breadcrumb.Item>Home</Breadcrumb.Item>
					<Breadcrumb.Item>List</Breadcrumb.Item>
					<Breadcrumb.Item>App</Breadcrumb.Item>
				</Breadcrumb>
				<Layout className="site-layout-background" style={{ padding: '24px 0' }}>
					<Sider theme="light" className="site-layout-background" width={300}>
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
							<Button onClick={() => createResult()} disabled={requested?.data.length === 0 || reference?.data.length === 0} type="primary">
								Generate!
							</Button>

						</Card>

						<Card title="Snapshot">
							<Statistic title="Live with Partner" value={config.live_ids.length} />
							<Statistic title="DT Accounts" value={reference?.data.length} />
							<Statistic title="Items on Request" value={requested?.data.length} />
						</Card>
					</Sider>
					<Content style={{ padding: '0 24px', minHeight: 280 }}>
						{log && (
							<>
								<h2>Action Items</h2>
								<p>{actionItemText}</p>
								<ImpPackage item={log.implement} payload={log.provisioning} description={actionItemText} />
								<Divider dashed />
								<h2>Follow Up Items</h2>
								<div className="GridFour">
									<ImpPackage item={log.unmatched} />
									<ImpPackage item={log.invalid} />
								</div>
								<h2>Housekeeping</h2>
								<ImpPackage item={log.cancel} />
							</>
						)}
					</Content>
				</Layout>
			</Content>
			<Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
		</Layout>


	);
}



export default App;

