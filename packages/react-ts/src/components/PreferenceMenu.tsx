import React, { useContext } from 'react';
import { WFContext } from '../context';
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { PartnerCode } from '@wf/types';


interface IPreferenceMenu {
	title?: string,
	partner: PartnerCode,
	handleClick: (e: any) => void,
	style?: React.CSSProperties
}

export const PreferenceMenu: React.FC<IPreferenceMenu> = ({ title, partner, handleClick, style }) => {
	const { ctx } = useContext(WFContext);
	return (
		<Menu
			onClick={handleClick}

			mode="vertical" >
			<Menu.Item
				key="m1"
				icon={<MailOutlined />}
				onClick={() => ctx.setClear()}
				title="Reset">
				Reset Workflower
			</Menu.Item>
			<Menu.Item
				key="m2"
				icon={<AppstoreOutlined />}
				onClick={() => ctx.setDemo()}
				title="Use Example Data">
				Use Example Data
			</Menu.Item>
			<Menu.Item
				key="m3"
				disabled={!partner}
				onClick={() => ctx.togglePartnerSettings(!ctx.showPartnerSettings)}
				icon={<SettingOutlined />}
				title="Partner Settings">
				Partner Settings {partner && `(${partner})`}
			</Menu.Item>
		</Menu>
	)
}

export default PreferenceMenu
