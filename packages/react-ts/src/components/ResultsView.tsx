import React, { useState, useEffect } from 'react';
import { ImplementationPackage } from '@wf/core';
import ProvisioningButtons from './ProvisioningButtons'
import PreviewTable from './PreviewTable'
import DealerListItem from './DealerListItem'
import { Badge, Popover, Card, Divider, Typography, Tabs, Table } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import Grid from 'antd/lib/card/Grid';
const { Text } = Typography
const { TabPane } = Tabs

const cardShadow = {
	boxShadow: '2px 5px 10px rgba(100,100,110,0.2), 1px 1px 3px rgba(50,50,50,0.1)'
}

const tabScoreStyle: React.CSSProperties = {
	// textAlign: "center",
	// padding: 0,
	marginRight: '24px',
	display: "grid",
	gridTemplateColumns: '1fr 1fr 1fr 1fr',
	gap: '24px',
	marginBottom: '24px'
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
			<h1 style={{ textAlign: 'center', marginTop: '48px' }}>
				Today at {partner_name || partner}
			</h1>

			<div style={tabScoreStyle}>
				{Object.keys(log).map((i, index) => {
					const obj = log[i] as ImplementationPackage;
					const count = obj.items?.length;
					return count > 0 && (
						<Card
							key={`${obj.title}`}
							onClick={() => setTab(obj.title)}
							className={`scoreCard ${currentTabTitle === obj.title && "current-tab"}`}>
							<Popover content={obj.desc} title={obj.title} style={{ maxWidth: 400 }}>
								<>
									<h3>
										{obj.title}&nbsp;
										<Badge status={obj.status} count={count} />
									</h3>
									<h1 style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between'
									}}>
										<span>{count}</span>

										<QuestionCircleOutlined
											size={24}
											style={{
												color: '#ccc',
												fontSize: '13px',
												marginLeft: '7px'
												// position: 'relative',
												// top: '-8px'
											}}
										/>
									</h1></>
							</Popover>
						</Card>
					)
				})}
			</div>

			<div style={{ marginRight: '24px' }}>
				<PreviewTable
					title={currentTabTitle}
					items={log[currentView].items}
					payload={log.provisioning}
					partner={partner}
					totalSize={result.length}
					excludeSize={liveCount}
				/>
			</div>
		</>
	)
}

export default ResultsView;
