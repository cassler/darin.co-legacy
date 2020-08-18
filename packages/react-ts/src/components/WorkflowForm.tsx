import React, { useState, useContext, useEffect } from 'react';
import { PartnerCode } from '@wf/types';
import { Workflower } from '@wf/core';
import SelectPartner from './SelectPartner';
import ExclusionSet from './ExclusionSet';
import FileSelect from './FileSelect';
import AutoCompleter from './AutoCompleter';
import { settings } from '../data/settings';
import { WFContext } from '../context';
import { Statistic, Popover, Divider, Button, Result, Input, Switch } from 'antd';
import { FormOutlined, ArrowLeftOutlined, FileExcelOutlined, OrderedListOutlined } from '@ant-design/icons';
import { Spinner, FormGroup } from '@blueprintjs/core';
import { motion, AnimatePresence } from "framer-motion"



export const WorkflowForm: React.FC = () => {

	const { ctx } = useContext(WFContext);
	const { step } = ctx;
	const [busy, toggleBusy] = useState<boolean>(false)
	const [useRequestFile, toggleRequestFile] = useState<boolean>(true)
	// When choosing a new partner, also apply their configs
	const handlePartnerSelect = (partner: PartnerCode) => {
		ctx.setPartner(partner);
		if (partner === "BOA") ctx.setConfig(settings.boa);
		if (partner === "DRW") ctx.setConfig(settings.drw);
		if (partner === "HAZ") ctx.setConfig(settings.haz);
		if (partner === "CNZ") ctx.setConfig(settings.cnz);
	}

	const updateLiveIDs = (items: number[] | string[] | bigint[]) => {
		const newConfig = {
			...ctx.config,
			live_ids: items
		}
		ctx.setConfig(newConfig);
		ctx.setStep(ctx.step + 1)
	}

	// Manually run a new calculation and put results into state
	const createResult = async () => {
		toggleBusy(true)
		if (ctx.requested?.data && ctx.reference?.data && ctx.partner && ctx.config) {
			setTimeout(async () => {

				let res = await new Workflower({
					partnerCode: ctx.partner,
					options: ctx.config,
					requested: ctx.requested.data,
					reference: ctx.reference.data
				})
				let result = await res.init;
				let payload = await res.fullPayload;
				const set = await ctx.setResult(result, payload);
				console.log(set);
				toggleBusy(false)

			}, 250)
		}
	}

	useEffect(() => {

		// if (ctx.demo && !ctx.log) {
		// 	createResult();
		// 	ctx.setStep(4)
		// }
	})

	const defaultMotion = {
		transition: { ease: "easeInOut", duration: 0.3 },
		initial: { x: 300, opacity: 0, scale: 0.1 },
		animate: { x: 0, opacity: 1, scale: 1 },
		exit: { x: -300, opacity: 0, scale: 0.1 }
	}

	return (
		<div style={{ position: "relative", minHeight: '640px' }}>
			<AnimatePresence exitBeforeEnter>
				{(step === 0) && (
					<motion.div
						key={"0"}
						{...defaultMotion}
						transition={{ ease: "easeInOut", duration: 0.4, delay: 0.3 }}
					>
						<Result
							status="403"
							title="Select a partner"
							subTitle="Which DR partner are we working with today?"
							extra={(
								<>
									<SelectPartner
										partners={["BOA", "DRW", "CNZ", "HAZ"] as PartnerCode[]}
										defaultPartner={ctx.partner}
										callback={handlePartnerSelect}
									/>
									<Divider />
									<Button onClick={() => ctx.setClear()} type="link">
										Reset Workflow
													</Button>
									<Button onClick={() => ctx.setDemo()} type="link">
										Use Example Data
													</Button>
								</>
							)}
						/>
					</motion.div>
				)}
				{step === 1 && (
					<motion.div key="1" {...defaultMotion}>
						<Result
							status="404"
							title="Add a Dealertrack Report"
							subTitle="Provide a reference file from Dealertrack > Business Reports"
							extra={(
								<><FileSelect
									label="Reference Data"
									slug="ref"
									callback={ctx.setReference}
									count={ctx.reference?.data.length || 0}
									helper={`CSV from Dealertrack > Reports > Partner (${ctx.partner})`}
									internal_id={ctx.config.internal_id}
								/>
								</>
							)}
						/>
					</motion.div>

				)}
				{step === 2 && (
					<motion.div key="2" {...defaultMotion}>
						<Result
							status="500"
							title="And the partner requests..."
							subTitle="Add a file that includes requests from the partner."
							extra={(
								<>
									{useRequestFile ? (
										<FileSelect
											label="Request Data"
											slug="req"
											callback={ctx.setRequested}
											count={ctx.requested?.data.length || 0}
											helper={`CSV of requests from ${ctx.partner}`}
											internal_id={ctx.config.internal_id}
										/>
									) : (
											<AutoCompleter />
										)}
									<Divider />
									<FormGroup helperText="Hint: Don't have a file? Switch to manual mode!">
										<Switch
											onChange={() => toggleRequestFile(!useRequestFile)}
											unCheckedChildren={<><FileExcelOutlined /> File</>}
											checkedChildren={<><OrderedListOutlined /> Manual</>}
										/>
									</FormGroup>

								</>
							)}
						/>
					</motion.div>
				)}
				{step === 3 && (
					<Result
						status={ctx.log ? "success" : "info"}
						title={ctx.log ? "Looks good!" : "Identify excluded dealers"}
						subTitle="Provide a file that lists dealers already implemented. You can select the column after uploading."
						extra={(
							<FileSelect
								label="IDs to Exclude"
								slug="exclude"
								callback={updateLiveIDs}
								count={ctx.requested?.data.length || 0}
								helper={`Indicate what to ignore for ${ctx.partner}`}
								internal_id={ctx.config.internal_id}
							/>
						)} />
				)}
				{step === 4 && (
					<motion.div key="3" {...defaultMotion}>
						<Result
							status={ctx.log ? "success" : "info"}
							title={ctx.log ? "Looks good!" : "Ready to analyze"}
							subTitle="We have everything we need to process these."
							extra={(
								<>
									<div className="Stat-Group" style={{ minHeight: '240px' }}>
										<Popover content={<ExclusionSet currentIds={ctx.config.live_ids} callback={updateLiveIDs} />}>
											<div>
												<Statistic title="Live with Partner" value={ctx.config.live_ids.length} />
												<FormOutlined />
											</div>
										</Popover>
										<Statistic title="DT Accounts" value={ctx.reference?.data.length} />
										<Statistic title="Items on Request" value={ctx.requested?.data.length} />
									</div>
									{busy ? (
										<Spinner size={60} />
									) : (
											!ctx.log ? (
												<Button
													onClick={() => createResult()}
													disabled={!ctx.requested || !ctx.reference || busy}
													type="primary">
													{busy ? "Working..." : `Generate for ${ctx.partner}`}
												</Button>
											) : (
													<div style={{ position: "absolute", bottom: '0', right: '0' }}>
														<Button
															onClick={() => ctx.setStep(ctx.step + 1)}
															disabled={!ctx.log || busy}
															type="primary">
															{busy ? "Working..." : `See results!`}
														</Button>
													</div>
												)
										)}
								</>
							)}
						/>

					</motion.div>
				)}

			</AnimatePresence>
			<Button
				style={{ position: "absolute", bottom: '0', left: '0' }}
				disabled={ctx.step === 0}
				type="link"
				onClick={() => ctx.setStep(Math.max(0, ctx.step - 1))}
			>
				<ArrowLeftOutlined /> Go Back
				</Button>
		</div>
	)
}

export default WorkflowForm;
