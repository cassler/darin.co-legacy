import React, { useState } from 'react';
import './App.css';
import ViewSettings from './components/ViewSettings';
import { Divider, Modal, Layout, Card, Tabs, Button, Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import WorkflowForm from './components/WorkflowForm';
import Stepper from './components/Stepper';
import PreferenceMenu from './components/PreferenceMenu';
import { WFProvider, WFContext } from './context';
import ResultsContainer from './components/ResultsContainer'
const { Content } = Layout;


function App() {
	function handleClick(e) {
		console.log('click', e);
	}
	const padSmall = { padding: '0', minHeight: 280 };
	const padBig = { padding: '24px 48px' };

	return (
		<Layout>
			<Content style={padBig}>
				<WFProvider>
					<Layout style={padSmall}>
						<WFContext.Consumer>
							{({ ctx }) => (
								<div style={{ display: "grid", gridTemplateColumns: "280px 1fr" }}>
									<div style={{
										padding: '24px 24px 0',
										display: "grid",
										gridTemplateRows: "1fr min-content"
									}}>
										<div>
											<Stepper
												partner={ctx.partner}
												refSize={ctx.reference?.data.length}
												reqSize={ctx.requested?.data.length}
												index={ctx.step} />
										</div>
										<div>
											<Divider />
											<PreferenceMenu handleClick={handleClick} partner={ctx.partner} />
										</div>

									</div>
									<Card className='result-card'>
										<WorkflowForm />
										{ctx.step > 3 && (
											<ResultsContainer />
										)}

									</Card>
									<Modal
										title={`Partner Settings - ${ctx.partner}`}
										width={800}
										style={{ top: 24 }}
										visible={ctx.showPartnerSettings && ctx.config}
										onOk={() => ctx.togglePartnerSettings(false)}
										onCancel={() => ctx.togglePartnerSettings(false)}
									>
										<ViewSettings config={ctx.config} />
									</Modal>
								</div>
							)}
						</WFContext.Consumer>
					</Layout>
				</WFProvider>
			</Content>
		</Layout >

	);
}



export default App;

