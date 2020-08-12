import React, { useState, useContext, useEffect, useCallback } from 'react';
import { PartnerCode } from '@wf/types';
import { Workflower } from '@wf/core';
import SelectPartner from './SelectPartner';
import ExclusionSet from './ExclusionSet';
import FileSelect from './FileSelect';
import { settings } from '../data/settings';
import { WFContext } from '../context';
import { Statistic, Popover, Divider, Button, Result } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from "framer-motion"



export const WorkflowForm: React.FC = () => {

	const { ctx } = useContext(WFContext);
	const step = ctx.step;
	const [busy, toggleBusy] = useState<boolean>(false)

	// When choosing a new partner, also apply their configs
	const handlePartnerSelect = (partner: PartnerCode) => {
		ctx.setPartner(partner);
		if (partner === "BOA") ctx.setConfig(settings.boa);
		if (partner === "DRW") ctx.setConfig(settings.drw);
	}

	const updateLiveIDs = (items: number[] | string[] | bigint[]) => {
		const newConfig = {
			...ctx.config,
			live_ids: items
		}
		ctx.setConfig(newConfig);
	}

	// Manually run a new calculation and put results into state
	const createResult = useCallback(() => {
		toggleBusy(true)
		if (ctx.requested?.data && ctx.reference?.data && ctx.partner && ctx.config) {
			let res = new Workflower({
				partnerCode: ctx.partner,
				options: ctx.config,
				requested: ctx.requested.data,
				reference: ctx.reference.data
			})
			if (res.init) {
				ctx.setResult(res.init, res.fullPayload);
			}
		}
		toggleBusy(false)
	}, [ctx, toggleBusy])

	useEffect(() => {
		if (ctx.demo && !ctx.log && ctx.requested && ctx.reference) {
			createResult()
		}
	}, [createResult, ctx])


	return (
		<div>
			<AnimatePresence exitBeforeEnter>


				{(step === 0) && (
					<motion.div
						key={"0"}
						transition={{ ease: "easeInOut", duration: 0.3 }}
						initial={{ x: 300, opacity: 0, scale: 0.8 }}
						animate={{ x: 0, opacity: 1, scale: 1 }}
						exit={{ x: -300, opacity: 0, scale: 0.8 }}
					>
						<Result
							status="403"
							title="Select a partner"
							subTitle="Which DR partner are we working with today?"
							extra={(
								<>
									<SelectPartner
										partners={["BOA", "DRW", "CNZ", "GOO"] as PartnerCode[]}
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
					<motion.div
						key="1"
						transition={{ ease: "easeInOut", duration: 0.3 }}
						initial={{ x: 300, opacity: 0, scale: 0.8 }}
						animate={{ x: 0, opacity: 1, scale: 1 }}
						exit={{ x: -300, opacity: 0, scale: 0.8 }}
					>
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
					<motion.div
						key="2"
						transition={{ ease: "easeInOut", duration: 0.3 }}
						initial={{ x: 300, opacity: 0, scale: 0.8 }}
						animate={{ x: 0, opacity: 1, scale: 1 }}
						exit={{ x: -300, opacity: 0, scale: 0.8 }}
					>
						<Result
							status="500"
							title="And the partner requests..."
							subTitle="Add a file that includes requests from the partner."
							extra={(
								<>
									<FileSelect
										label="Request Data"
										slug="req"
										callback={ctx.setRequested}
										count={ctx.requested?.data.length || 0}
										helper={`CSV of requests from ${ctx.partner}`}
										internal_id={ctx.config.internal_id}
									/>
								</>
							)}
						/>
					</motion.div>
				)}
				{step === 3 && (
					<motion.div
						key="3"
						transition={{ ease: "easeInOut", duration: 0.3 }}
						initial={{ x: 300, opacity: 0, scale: 0.8 }}
						animate={{ x: 0, opacity: 1, scale: 1 }}
						exit={{ x: -300, opacity: 0, scale: 0.8 }}
					>
						<Result
							status="success"
							title="Looks good!"
							subTitle="We have everything we need to process these."
							extra={(
								<Button
									onClick={() => createResult()}
									disabled={!ctx.requested || !ctx.reference || busy}
									type="primary">
									{busy ? "Working..." : `Generate for ${ctx.partner}`}
								</Button>
							)}
						/>



						<div className="Stat-Group">
							<Popover content={<ExclusionSet currentIds={ctx.config.live_ids} callback={updateLiveIDs} />}>
								<div>
									<Statistic title="Live with Partner" value={ctx.config.live_ids.length} />
									<FormOutlined />
								</div>
							</Popover>
							<Statistic title="DT Accounts" value={ctx.reference?.data.length} />
							<Statistic title="Items on Request" value={ctx.requested?.data.length} />
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default WorkflowForm;
