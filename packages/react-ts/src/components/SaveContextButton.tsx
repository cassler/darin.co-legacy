import React, { useContext } from 'react';
import { WFContext } from '../context';
import { message, Popconfirm, Button } from 'antd';
import { set, get } from 'idb-keyval';
import { settings } from '../data/settings';
import { PartnerCode } from '@wf/types';
/**
 * @TODO - This functionality should exist inside the context itself.
 */
export function SaveContextButton() {
	const { ctx } = useContext(WFContext);



	return (

		<div style={{ textAlign: 'center' }}>
			<Popconfirm
				title="This will overwrite any existing data."
				onConfirm={ctx.saveContext(ctx)}
				onCancel={() => { }}
				okText="Save"
				cancelText="Cancel"
			>
				<Button size="small" type="link">Save</Button>
			</Popconfirm>
			<Popconfirm
				title="Current session will be lost."
				onConfirm={ctx.loadContext}
				onCancel={() => { }}
				okText="Continue Loading"
				cancelText="Cancel"
			>
				<Button size="small" type="link" >Load</Button>
			</Popconfirm>
			<Button
				type="link"
				size="small"
				onClick={() => ctx.setClear()}>Clear</Button>
		</div>
	)
}

export default SaveContextButton;
