import React, { useState, useContext } from 'react';
import './App.css';

import ImpPackage from './components/ImpPackage';
import ViewSettings from './components/ViewSettings';


import { Result, Layout, Divider, Button, Badge, Collapse, Tabs } from 'antd';
import WorkflowForm from './components/WorkflowForm';
import { WFProvider, WFContext } from './context';

const { Content, Footer } = Layout;


export interface IParseResult {
	data: any[];
	errors: any;
	meta: any;
}

export type PartnerCode = "BOA" | "DRW" | "CNZ" | "GOO" | "DAS"


function App() {

	const [currentTab, setTab] = useState<string>("1");

	// define some text for the body
	interface actionTexts {
		[key: string]: string
	}
	const actionItemText: actionTexts = {
		ready: `These are the dealers that are ready to implement for the partner according to the provided data and selected partner settings. Check the results to make sure they correspond to what's expected. You can then download pre-formatted files for provisioning the dealer for billing, finance forms and lead routing.`,
		notContacted: `Confirm the DT account is not mis-matched. If the account is properly matched then reach out to ADM (admrequestes@dealertrack.com) and ask that they set the account to 'Prospect'.`,
		cancel: `Do NOT process cancellations for dealers who are listed as 'Not Contacted' or 'No DT account found'. Follow the steps above for dealers in these buckets.`,
		notFound: `The partner may not have added these dealers to their DT partner file yet. Wait 24 hours to see if a match takes place. If you continue to receive this error, reach out to the partner to confirm they have properly added the dealer to their DT partner file.`
	}

	// Return our app
	return (
		<Layout>
			<Content style={{ padding: '0 50px' }}>
				<WFProvider>

					<Layout className="site-layout-background" style={{ padding: '24px 0' }}>
						<WFContext.Consumer>
							{({ ctx }) => (


								<Tabs defaultActiveKey="1" activeKey={ctx.currentTab} onTabClick={(key) => ctx.setTab(key)}>
									<Tabs.TabPane tab="Workflower" key="0"></Tabs.TabPane>
									<Tabs.TabPane tab="Setup" key="1">
										<Result
											status="404"
											title="Ready"
											subTitle="Provide a DT report and a request file."
										/>
										<WorkflowForm />
									</Tabs.TabPane>
									<Tabs.TabPane tab="Partner Settings" key="2">
										<Content style={{ padding: '0', minHeight: 280 }}>
											<WFContext.Consumer>
												{({ ctx }) => <ViewSettings config={ctx.config} />}
											</WFContext.Consumer>
										</Content>
									</Tabs.TabPane>
									<Tabs.TabPane tab="Results" key="3">
										<Content style={{ padding: '0 24px', minHeight: 280 }}>
											<WFContext.Consumer>
												{({ ctx }) => ctx.log ? (
													<>
														<h2>Action Items</h2>
														{/* <p>{actionItemText}</p> */}
														<ImpPackage partner={ctx.partner} item={ctx.log.implement} payload={ctx.log.provisioning} description={actionItemText.ready} />
														<Divider dashed />
														<h2>Follow Up Items</h2>
														<div className="GridFour">
															<ImpPackage partner={ctx.artner} item={ctx.log.invalid} description={actionItemText.notContacted} />
															<ImpPackage partner={ctx.partner} item={ctx.log.unmatched} description={actionItemText.notFound} />
														</div>
														<Divider dashed />
														<h2>Housekeeping</h2>
														<ImpPackage partner={ctx.partner} item={ctx.log.cancel} description={actionItemText.cancel} />
														{ctx.result && (
															<>
																{/** --- make this a standalone components */}
																<Divider dashed />
																<h2>Review Data</h2>
																<Collapse>
																	<Collapse.Panel header={(
																		<h4>Full Report <Badge count={ctx.result.length} /></h4>
																	)} key={"1"}>
																		{ctx.result.map(i => (
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
												) : (
														<Result
															status="404"
															title="Ready"
															subTitle="Provide a DT report and a request file."
															extra={(
																<Button
																	type="primary"
																	disabled={true}
																	onClick={() => console.log('hah')}>
																	I did!
																</Button>
															)}
														/>
													)}
											</WFContext.Consumer>
										</Content>
									</Tabs.TabPane>
								</Tabs>
							)}
						</WFContext.Consumer>
					</Layout>
				</WFProvider>
			</Content>
			<Footer style={{ textAlign: 'center' }}>Darin Cassler &amp; Cox Auto ©2020</Footer>
		</Layout >


	);
}



export default App;

