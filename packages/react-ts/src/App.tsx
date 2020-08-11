import React from 'react';
import './App.css';
import ViewSettings from './components/ViewSettings';
import ResultsView from './components/ResultsView';
import { Result, Layout, Tabs } from 'antd';
import WorkflowForm from './components/WorkflowForm';
import { WFProvider, WFContext } from './context';
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
									<Tabs.TabPane tab="Setup" key="1">
										<Content style={padSmall}>
											<Result
												status="404"
												title="Ready"
												subTitle="Provide a DT report and a request file."
											/>
											<WorkflowForm />
										</Content>
									</Tabs.TabPane>
									<Tabs.TabPane tab="Partner Settings" key="2">
										<Content style={padSmall}>
											<ViewSettings config={ctx.config} />
										</Content>
									</Tabs.TabPane>
									<Tabs.TabPane tab="Results" key="3">
										<Content style={padSmall}>
											{ctx.log ? (
												<ResultsView partner={ctx.partner} log={ctx.log} result={ctx.result} />
											) : (
													<Result
														status="404"
														title="Ready"
														subTitle="Provide a DT report and a request file."
													/>
												)}
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

