import React, { useContext } from 'react';
import { WFContext } from '../context';
import { message, Popconfirm, Button } from 'antd';
import { set, get } from 'idb-keyval';

/**
 * @TODO - This functionality should exist inside the context itself.
 */
export function SaveContextButton() {
	const { ctx } = useContext(WFContext);

	const loadContext = () => {
		// Go find our requests
		get<string>("saveState").then(value => {
			if (value) {
				message.info('Restored App State')
				ctx.loadState(JSON.parse(value))
			} else {
				message.info("No save state found.")
			}
		})
	}

	const saveContext = () => {
		set("saveState", JSON.stringify({
			requested: ctx.requested,
			reference: ctx.reference,
			partner: ctx.partner,
			partner_name: ctx.partner_name,
			config: ctx.config,
			result: ctx.result,
			log: ctx.log,
			busy: ctx.busy,
			currentTab: ctx.currentTab,
			demo: ctx.demo,
			step: ctx.step,
			showPartnerSettings: ctx.showPartnerSettings
		}))
		message.success('Saved state locally! You can safely close the window.');
	}

	return (
		<>
			<Popconfirm
				title="This will overwrite any existing data."
				onConfirm={saveContext}
				onCancel={() => { }}
				okText="Save"
				cancelText="Cancel"
			>
				<Button size="small">Save Session</Button>
			</Popconfirm>
			<Popconfirm
				title="Current session will be lost."
				onConfirm={loadContext}
				onCancel={() => { }}
				okText="Continue Loading"
				cancelText="Cancel"
			>
				<Button size="small" >Load Session</Button>
			</Popconfirm>
			<Button
				size="small"
				onClick={() => ctx.setClear()}>Clear Session</Button>
		</>
	)
}

export default SaveContextButton;
