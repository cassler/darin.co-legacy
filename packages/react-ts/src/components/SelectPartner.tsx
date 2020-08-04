import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { ImplementationResult } from '@wf/core';
import { Menu, Dropdown, Button, message, Tooltip } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons'

type Props = {
	partners: string[],
	callback: Function,
}


const SelectPartner: React.FC<Props> = ({ partners, callback }) => {
	const [selected, selectPartner] = useState<string>(partners[0])
	const handleClick = (e: any) => {
		message.info(`Changed partners to ${e.key}`);
		console.log('click', e);
		selectPartner(e.key)
		callback(e.key)
	}
	return (
		<Dropdown overlay={(
			<Menu onClick={(e) => handleClick(e)}>
				{partners.map(partner => (
					<Menu.Item key={partner}>{partner}</Menu.Item>
				))}
			</Menu>
		)}>
			<Button>
				{selected} <DownOutlined />
			</Button>
		</Dropdown>
	)

}

export default SelectPartner;
