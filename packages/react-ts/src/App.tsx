import React from 'react';
import './App.css';
import ViewSettings from './components/ViewSettings';
import { Steps, Layout, Tabs, Button } from 'antd';
import WorkflowForm from './components/WorkflowForm';
import { WFProvider, WFContext } from './context';
import ResultsContainer from './components/ResultsContainer'
const { Step } = Steps;
const { Content } = Layout;

function App() {

	const padSmall = { padding: '0', minHeight: 280 };
	const padBig = { padding: '24px 50px' };
	return (
		<Layout>
			<Content style={padBig}>
				<WFProvider>
					<Layout style={padSmall}>
						<WFContext.Consumer>
							{({ ctx }) => (
								<Tabs
									defaultActiveKey="1"
									activeKey={ctx.currentTab}
									onTabClick={(key) => ctx.setTab(key)}
								>
									<Tabs.TabPane tab="Workflower" key="0"></Tabs.TabPane>
									<Tabs.TabPane tab="Intake Requests" key="1">
										<div style={{ display: "grid", gridTemplateColumns: "280px 1fr", alignItems: "start" }}>
											<div style={{ paddingRight: '24px' }}>
												<Steps direction="vertical" current={ctx.step}>
													<Step title="Select Partner" description={`Which partner are we working with? ${ctx.partner}`} />
													<Step title="Provide DT Data" description="This is a description." />
													<Step title="Provide Request Data" description="This is a description." />
													<Step title="Generate Results" description="This is a description." />
													<Step title="Review" description="This is a description." />
												</Steps>
												{ctx.step > 0 && (
													<Button onClick={() => ctx.setStep(Math.max(0, ctx.step - 1))}>
														Go Back
													</Button>
												)}
												<div>
													<Button onClick={() => ctx.setClear()} type="link">
														Reset Workflow
													</Button>
													<Button onClick={() => ctx.setDemo()} type="link">
														Use Example Data
													</Button>
												</div>
											</div>
											<div>
												<WorkflowForm />
												<ResultsContainer />
											</div>
										</div>
									</Tabs.TabPane>

									<Tabs.TabPane tab="Partner Settings" key="2">
										<Content style={padSmall}>
											<ViewSettings config={ctx.config} />
										</Content>
									</Tabs.TabPane>
								</Tabs>
							)}
						</WFContext.Consumer>
					</Layout>
				</WFProvider>
			</Content>
		</Layout >

	);
}



export default App;

