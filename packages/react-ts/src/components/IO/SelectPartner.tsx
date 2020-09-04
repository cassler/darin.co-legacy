import React from 'react';
import 'antd/dist/antd.css';
import { Menu, Dropdown, Button, message } from 'antd';
import { DownOutlined } from '@ant-design/icons'
import { PartnerCode } from '@wf/types';

type Props = {
	partners: string[],
	callback: Function,
	defaultPartner: PartnerCode
}


const SelectPartner: React.FC<Props> = ({ partners, callback, defaultPartner }) => {

	const handleClick = (e: any) => {
		console.log('click', e);
		callback(e.key)
		message.info(`Changed partners to ${e.key}`);
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
				{defaultPartner ? defaultPartner : 'Partners'} <DownOutlined />
			</Button>
		</Dropdown>
	)

}

export default SelectPartner;
