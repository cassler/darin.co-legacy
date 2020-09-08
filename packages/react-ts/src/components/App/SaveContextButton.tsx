import React, { useContext } from 'react';
import { WFContext } from '../../context';
import { message, Popconfirm, Button } from 'antd';
/**
 * @TODO - This functionality should exist inside the context itself.
 */
export function SaveContextButton() {
	const { ctx } = useContext(WFContext);

	const handleSave = () => {
		ctx.saveContext(ctx);
		message.success('Saved session succesfully. You can close this window safely.')
	}

	return (

		<div style={{ textAlign: 'center' }}>
			<Popconfirm
				title="This will overwrite any existing data."
				onConfirm={handleSave}
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
			<Popconfirm
				title="This will delete any saved sessions."
				onConfirm={ctx.setClear}
				onCancel={() => { }}
				okText="Destroy it."
				cancelText="Nevermind"
			>
				<Button
					type="link"
					size="small"
				>Clear</Button>
			</Popconfirm>
		</div>
	)
}

export default SaveContextButton;
