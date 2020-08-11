import React, { useState, useContext } from 'react';
import { PartnerCode } from '@wf/types';
import { Workflower } from '@wf/core';
import SelectPartner from './SelectPartner';
import ExclusionSet from './ExclusionSet';
import FileSelect from './FileSelect';
import { settings } from '../data/settings';
import { WFContext } from '../context';
import { Statistic, Popover, Divider, Button } from 'antd';
import { FormOutlined } from '@ant-design/icons';



export const WorkflowForm: React.FC = () => {

	const { ctx } = useContext(WFContext);
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

	// fill data with pre-populated values
	const setDemoMode = (hot?: boolean | undefined) => {
		ctx.setDemo();
	}
	// simple state reset utility
	const resetFormData = () => {
		ctx.setClear()
	}
	// Manually run a new calculation and put results into state
	const createResult = () => {
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
	}


	return (
		<div>
			<>
				<div className="upload-ui">
					<div></div>
					<FileSelect
						label="Reference Data"
						slug="ref"
						callback={ctx.setReference}
						count={ctx.reference?.data.length || 0}
						helper={`CSV from Dealertrack > Reports > Partner (${ctx.partner})`}
						internal_id={ctx.config.internal_id}
					/>
					<FileSelect
						label="Request Data"
						slug="req"
						callback={ctx.setRequested}
						count={ctx.requested?.data.length || 0}
						helper={`CSV of requests from ${ctx.partner}`}
						internal_id={ctx.config.internal_id}
					/>
				</div>
				<div>
					<h4>Using settings for</h4>
					<SelectPartner
						partners={["BOA", "DRW", "CNZ", "GOO"] as PartnerCode[]}
						defaultPartner={ctx.partner}
						callback={handlePartnerSelect}
					/> &nbsp;
							<Button
						onClick={() => createResult()}
						disabled={!ctx.requested || !ctx.reference || busy}
						type="primary">
						{busy ? "Working..." : "Generate"}
					</Button>
					<Divider />
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
					<Divider />
					<Button onClick={() => setDemoMode(true)} type="link">
						Use demo data
							</Button>
					<Button onClick={() => resetFormData()} type="link">
						Reset Data
							</Button>
				</div>
			</>
		</div>
	)
}

export default WorkflowForm;
