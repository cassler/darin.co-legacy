import React, { useState, useContext, useEffect } from 'react';
import { PartnerCode } from '@wf/types';
import { Workflower } from '@wf/core';
import SelectPartner from './SelectPartner';
import ExclusionSet from './ExclusionSet';
import FileSelect from './FileSelect';
import AutoCompleter from './AutoCompleter';
import Bookmarklet from './Bookmarklet';
import { settings } from '../data/settings';
import { WFContext } from '../context';
import { set, get } from 'idb-keyval';
import { Statistic, Popover, Divider, Button, Result, Input, Switch, message, Popconfirm } from 'antd';
import { FormOutlined, ArrowLeftOutlined, FileExcelOutlined, OrderedListOutlined } from '@ant-design/icons';
import { Spinner, FormGroup } from '@blueprintjs/core';
import { motion, AnimatePresence } from "framer-motion"



export const WorkflowForm: React.FC = () => {

	const { ctx } = useContext(WFContext);
	const { step } = ctx;
	const [busy, toggleBusy] = useState<boolean>(false)
	const [renderCount, countRender] = useState<number>(0)
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


	const defaultMotion = {
		transition: { ease: "easeInOut", duration: 0.3 },
		initial: { x: 300, opacity: 0, scale: 0.1 },
		animate: { x: 0, opacity: 1, scale: 1 },
		exit: { x: -300, opacity: 0, scale: 0.1 }
	}

	useEffect(() => {
		if (!ctx.reloaded && renderCount === 0) {
			ctx.loadContext()
			countRender(renderCount + 1)
		}
	}, [ctx, renderCount])

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
									<Popconfirm
										title="Current session will be lost."
										onConfirm={ctx.loadContext}
										onCancel={() => { }}
										okText="Continue Loading"
										cancelText="Cancel"
									>
										<Button size="small" type="link" >Restore Session</Button>
									</Popconfirm>
									<Popconfirm
										title="This will delete any saved session"
										onConfirm={ctx.hardReset}
										onCancel={() => { }}
										okText="Destroy it."
										cancelText="Spare it"
									>
										<Button type="link">
											Clear Saved Session
													</Button>
									</Popconfirm>
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
					<motion.div key="3" {...defaultMotion}>
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
						<div style={{ textAlign: 'center' }}>
							<Popover content={(
								<div>
									<h3>Try Salesforce or eBiz</h3>
									<p>In most cases, you'll want to exclude dealers who have already been implemented. A Salesforce report of assets may be appropriate but is not always available.</p>
									<p>You might want to use the current eBiz profile members. The button below can grab these for you while viewing dealers in an eBiz profile. Save this bookmarklet, navigate to eBiz and click it while viewing the eBiz profile. A list will be copied to your clipboard. Paste the result into a new file and save it as a .CSV. You can now use that to exclude dealers in the eBiz profile..</p>
									<p><Bookmarklet /></p>
									<Button target='_blank'>See the docs</Button>
								</div>)}>
								<Button type="link">Need a hint?</Button>

							</Popover>

						</div>
					</motion.div>
				)}
				{step === 4 && (
					<motion.div key="4" {...defaultMotion}>
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

const eBizBookmarkletJS = `javascript:(function()%7B%22use%20strict%22%3Bvar%20_slicedToArray%3Dfunction(e%2Ct)%7Bif(Array.isArray(e))return%20e%3Bif(Symbol.iterator%20in%20Object(e))return%20function(e%2Ct)%7Bvar%20r%3D%5B%5D%2Cn%3D!0%2Co%3D!1%2Ca%3Dvoid%200%3Btry%7Bfor(var%20i%2Cl%3De%5BSymbol.iterator%5D()%3B!(n%3D(i%3Dl.next()).done)%26%26(r.push(i.value)%2C!t%7C%7Cr.length!%3D%3Dt)%3Bn%3D!0)%3B%7Dcatch(e)%7Bo%3D!0%2Ca%3De%7Dfinally%7Btry%7B!n%26%26l.return%26%26l.return()%7Dfinally%7Bif(o)throw%20a%7D%7Dreturn%20r%7D(e%2Ct)%3Bthrow%20new%20TypeError(%22Invalid%20attempt%20to%20destructure%20non-iterable%20instance%22)%7D%3Bfunction%20_toConsumableArray(e)%7Bif(Array.isArray(e))%7Bfor(var%20t%3D0%2Cr%3DArray(e.length)%3Bt%3Ce.length%3Bt%2B%2B)r%5Bt%5D%3De%5Bt%5D%3Breturn%20r%7Dreturn%20Array.from(e)%7Dfunction%20onlyUnique(e%2Ct%2Cr)%7Breturn%20r.indexOf(e)%3D%3D%3Dt%7Dfunction%20copyToClipboard(e)%7Bvar%20t%3Ddocument.createElement(%22textarea%22)%3Bt.value%3De%2Ct.setAttribute(%22readonly%22%2C%22%22)%2Ct.style.position%3D%22absolute%22%2Ct.style.left%3D%22-9999px%22%2Cdocument.body.appendChild(t)%3Bvar%20r%3D0%3Cdocument.getSelection().rangeCount%26%26document.getSelection().getRangeAt(0)%3Bt.select()%2Cdocument.execCommand(%22copy%22)%2Cdocument.body.removeChild(t)%2Cr%26%26(document.getSelection().removeAllRanges()%2Cdocument.getSelection().addRange(r))%7Dvar%20rows%3D%5B%5D.concat(_toConsumableArray(document.getElementById(%22dealer.editable-list%22).getElementsByTagName(%22tr%22))).map(function(e)%7Bvar%20t%3De.innerText.split(%22%20-%20%22)%2Cr%3D_slicedToArray(t%2C2)%2Cn%3Dr%5B0%5D%2Co%3Dr%5B1%5D%3Breturn%20n%2B%22%2C%22%2Bo.substring(0%2Co.length-1).trim()%7D).filter(onlyUnique)%2CcsvString%3D%22EBIZ_ID%2CNAME%5Cn%22%2Brows.join(%22%2C%5Cn%22)%3BcopyToClipboard(csvString)%2Cconsole.log(%22Copied%20%22%2Brows.length%2B%22%20items%20to%20clipboard.%20Save%20this%20as%20a%20CSV.%22)%3B%7D)()`

export default WorkflowForm;
