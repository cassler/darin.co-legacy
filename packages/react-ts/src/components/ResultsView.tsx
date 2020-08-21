import React, { useState, useEffect } from 'react';
import { ImplementationPackage } from '@wf/core';
import ImpPackage from './ImpPackage';
import ProvisioningButtons from './ProvisioningButtons'
import DealerListItem from './DealerListItem'
import { Badge, Popover, PageHeader, Divider, Typography, Tabs } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
const { Text } = Typography
const { TabPane } = Tabs

const cardShadow = {
	boxShadow: '2px 5px 10px rgba(100,100,110,0.2), 1px 1px 3px rgba(50,50,50,0.1)'
}

const scorecardStyle = {
	display: "grid",
	justifyContent: 'center',
	gridTemplateColumns: '190px 190px 190px 190px',
	gap: '5px'
}

export const ResultsView = (props) => {
	const { partner, partner_name, log, result, liveCount } = props;
	const [currentTabTitle, setTab] = useState(log.implement.title)
	const [currentView, setView] = useState('implement')
	useEffect(() => {
		switch (currentTabTitle) {
			case log.implement.title:
				setView('implement')
				break;
			case log.cancel.title:
				setView('cancel')
				break;
			case log.unmatched.title:
				setView('unmatched')
				break;
			case log.invalid.title:
				setView('invalid')
				break;
		}
	}, [currentTabTitle, log.cancel.title, log.implement.title, log.invalid.title, log.unmatched.title])
	return (
		<>
			<div style={{ padding: "48px" }}>
				<h1 style={{ textAlign: 'center' }}>Today at {partner_name || partner}</h1>
				<Tabs defaultActiveKey={log.implement.title} centered onChange={(key) => setTab(key)}>
					{Object.keys(log).map((i, index) => {
						const obj = log[i] as ImplementationPackage;
						const count = obj.items?.length;
						if (count > 0) return (
							<TabPane key={`${obj.title}`} tab={(
								<Popover content={obj.desc} title={obj.title} style={{ maxWidth: 400 }}>
									<div style={{ textAlign: 'center', padding: '0 12px' }}>
										<h3 style={{ position: 'relative', left: '-5px', fontSize: '18px', letterSpacing: '-0.03em' }}>
											<Badge status={obj.status} count={count} />
											{obj.title}
										</h3>
										<h1 style={{
											fontSize: '72px',
											lineHeight: '72px',
											color: '#444',
											paddingBottom: 0,
											marginBottom: 5,
											paddingLeft: '8px'
										}}>
											{count}
											<QuestionCircleOutlined
												size={24}
												style={{
													color: '#ccc',
													fontSize: '18px',
													position: 'relative',
													// top: '-4px',
													right: '-8px'
												}}

											/>
										</h1>

									</div>
								</Popover>
							)}>
								<Divider type="vertical" />
							</TabPane>
						)
					})}
				</Tabs>

				<div style={{ textAlign: 'center' }}>
					<p><Text type="secondary">
						{`Showing info for ${result.length} entries.`}<br />
						{`Excluding ${liveCount} ID noted as live.`}
					</Text>
					</p>
					<Divider>Download Files</Divider>
					<p><ProvisioningButtons
						payload={log.provisioning}
						partner={partner}
						title="Get Provisioning Files"
					/>
					</p>

				</div>
			</div>
			<Divider>Preview {log[currentView].items.length} dealers ({currentTabTitle})</Divider>
			<div style={{
				display: "grid",
				gridTemplateColumns: "1fr 1fr 1fr",
				gap: '24px'
			}}>
				{log[currentView].items.map(item => (<DealerListItem item={item} />))}
			</div>
		</>
	)
}

export default ResultsView;
