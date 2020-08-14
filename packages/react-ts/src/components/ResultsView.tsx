import React, { useState } from 'react';
import { ImplementationPackage } from '@wf/core';
import ImpPackage from './ImpPackage';
import ProvisioningButtons from './ProvisioningButtons'
import DealerListItem from './DealerListItem'
import { Badge, Popover, PageHeader, Divider, Typography, Collapse } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
const { Text } = Typography

const cardShadow = {
	boxShadow: '2px 5px 10px rgba(100,100,110,0.2), 1px 1px 3px rgba(50,50,50,0.1)'
}

const topLevelSummaryStyle = {
	display: "grid",
	gridTemplateColumns: "1fr 1fr",
	gridTemplateRows: 'max-content min-content',
	gap: '24px',
	justifyContent: 'stretch',
	alignItems: 'stretch'
}
export const ResultsView = (props) => {
	const { partner, log, result, liveCount } = props;
	return (
		<>
			<div>
				<h1 style={{ textAlign: 'center' }}>Today at {partner}</h1>
				<Divider />
				<div style={{ textAlign: 'center' }}>
					<div style={{
						display: "grid",
						justifyContent: 'center',
						gridTemplateColumns: '190px 190px 190px 190px',
						gap: '12px'
					}}>
						{Object.keys(log).map((i, index) => {
							const obj = log[i] as ImplementationPackage;
							const count = obj.items?.length;
							if (count > 0) return (
								<div>
									<Popover content={obj.desc} title={obj.title} style={{ maxWidth: 400 }}>
										<div style={{ textAlign: 'center' }}>
											<h3 style={{ position: 'relative', left: '-5px' }}>
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
									<Divider type="vertical" />
								</div>
							)
						})}
					</div>
					<p><Text type="secondary">
						{`Showing info for ${result.length} entries.`}<br />
						{`Excluding ${liveCount} ID noted as live.`}
					</Text>
					</p>
					<Divider>Download Files</Divider>
					<ProvisioningButtons
						payload={log.provisioning}
						partner={partner}
						title="Get Provisioning Files"
					/>
				</div>
			</div>
			<Divider>Preview {log.implement.items.length} dealers</Divider>
			<div style={{
				display: "grid",
				gridTemplateColumns: "1fr 1fr 1fr",
				gap: '24px'
			}}>
				{log.implement.items.map(item => (
					<DealerListItem item={item} />
				))}
			</div>
		</>
	)
}

export default ResultsView;
