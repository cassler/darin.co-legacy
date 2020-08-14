import React, { useState } from 'react';
import './App.css';
import ViewSettings from './components/ViewSettings';
import { Divider, Modal, Layout, Card, Tabs, Button, Menu } from 'antd';
import { motion, AnimatePresence } from "framer-motion"
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
	const padBig = { padding: '72px 24px 48px' };
	const layoutStyle = {
		display: "grid",
		gridTemplateColumns: "280px 1fr"
	}
	const sideBarStyle = {
		padding: '24px 24px 0',
		display: "grid",
		gridTemplateRows: "1fr min-content"
	}

	const motionPrefs = {
		transition: {
			ease: "easeInOut",
			duration: 0.3,
			delay: 0
		},
		initial: { y: -100, opacity: 0, scale: 0.7 },
		animate: { y: 0, opacity: 1, scale: 1 },
		exit: { y: 100, opacity: 0, scale: 3.7 }
	}
	return (
		<Layout>

			<h1 className='App-logo'>Workflower <small>Core</small></h1>
			<Content style={padBig}>
				<WFProvider>
					<Layout style={padSmall}>
						<WFContext.Consumer>
							{({ ctx }) => (
								<div style={layoutStyle}>
									<div style={sideBarStyle}>
										<Stepper
											partner={ctx.partner}
											setStep={ctx.setStep}
											refSize={ctx.reference?.data.length}
											reqSize={ctx.requested?.data.length}
											index={ctx.step} />
										<div>
											<Divider />
											<PreferenceMenu handleClick={handleClick} partner={ctx.partner} />
										</div>
									</div>
									<AnimatePresence exitBeforeEnter>
										{ctx.step <= 3 ? (
											<motion.div {...motionPrefs} key="0">
												<Card className='result-card'>
													<WorkflowForm />
												</Card>
											</motion.div>
										) : (
												<motion.div {...motionPrefs} key="1">
													<ResultsContainer />
												</motion.div>
											)}
									</AnimatePresence>

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

