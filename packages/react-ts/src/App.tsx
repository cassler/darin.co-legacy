import React from 'react';
import './App.css';
import ViewSettings from './components/ViewSettings';
import { Dropdown, Modal, Layout, Card, Button, Divider } from 'antd';
import { motion, AnimatePresence } from "framer-motion"
import WorkflowForm from './components/WorkflowForm';
import Stepper from './components/Stepper';
import SaveContextButton from './components/SaveContextButton';
import PreferenceMenu from './components/PreferenceMenu';
import { WFProvider, WFContext } from './context';
import ResultsView from './components/ResultsView'


function App() {
	function handleClick(e) {
		console.log('click', e);
	}

	const layoutStyle = {
		display: "grid",
		gridTemplateColumns: "300px 1fr",
		minHeight: "100vh",
		width: "100%",
		marginTop: '75px'
	}
	const sideBarStyle = {
		padding: '24px 48px 24px 24px',
		display: "grid",
		gridTemplateRows: "min-content 1fr min-content"
	}

	const toolbarStyle: React.CSSProperties = {
		position: "fixed",
		top: 0,
		left: 0,
		right: 0,
		width: "100%",
		background: '#fff',
		display: 'grid',
		padding: '18px 24px',
		gridTemplateColumns: '1fr 270px',
		alignItems: 'center',
		boxShadow: '2px 2px 8px rgba(100, 100, 100, 0.1)',
		zIndex: 500
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

		<WFProvider>
			<Layout>
				<WFContext.Consumer>
					{({ ctx }) => (
						<div style={layoutStyle}>
							<div>
								<div style={toolbarStyle}>
									<div>
										<h1 className='App-logo'>
											Workflower <small>Core</small>
										</h1>
									</div>
									<div style={{ display: "flex", justifyContent: 'flex-end', textAlign: 'right' }}>
										<Dropdown overlay={() => (
											<PreferenceMenu handleClick={handleClick} partner={ctx.partner} />
										)}>
											<Button size="small" type="link" >Options</Button>
										</Dropdown>
										<Divider type="vertical" />
										<SaveContextButton />
									</div>
								</div>
								<div style={sideBarStyle}>

									<Stepper
										partner={ctx.partner}
										setStep={ctx.setStep}
										refSize={ctx.reference?.data.length}
										reqSize={ctx.requested?.data.length}
										index={ctx.step} />

								</div>
							</div>
							<AnimatePresence exitBeforeEnter>
								{ctx.step <= 4 ? (
									<motion.div {...motionPrefs} key="0">
										<Card className='result-card'>
											<WorkflowForm />
										</Card>
									</motion.div>
								) : (
										<motion.div {...motionPrefs} key="1">
											<ResultsView
												partner_name={ctx.partner_name}
												partner={ctx.partner} log={ctx.log} result={ctx.result} liveCount={ctx.config.live_ids.length} handleBack={() => {
													ctx.setStep(Math.max(0, ctx.step - 1))
												}}
											/>
										</motion.div>
									)}
							</AnimatePresence>
							{/* {ctx.step > 0 && (<div style={{ position: 'fixed', top: '24px', right: '24px' }}>
								<SaveContextButton />
							</div>)} */}
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


	);
}



export default App;

