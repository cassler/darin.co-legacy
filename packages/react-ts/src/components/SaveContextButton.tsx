import React, { useContext } from 'react';
import { WFContext } from '../context';
import { message, Button } from 'antd';
import { set, get } from 'idb-keyval';

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
		message.success('Saved state locally!');
	}

	return (
		<>
			<Button onClick={() => saveContext()}>Save</Button>
			<Button onClick={() => loadContext()}>Load</Button>
		</>
	)
}

export default SaveContextButton;
