import React, { useState, useEffect, useContext } from 'react';
import { ImplementationResult, ImplementationPackage } from '@wf/core';
import PreviewTable from './PreviewTable'
import { Badge, Popover, Card, PageHeader, Divider, Typography, Tabs, Table } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { SimpleAccount } from '@wf/types';
import { WFContext } from '../context';
import { motion, AnimatePresence } from 'framer-motion';


const tabScoreStyle: React.CSSProperties = {
	marginRight: '24px',
	display: "grid",
	gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
	gap: '24px',
	marginBottom: '24px'
}

export const ResultsView = (props) => {

	const { partner, partner_name, log, result, liveCount, handleBack } = props;
	const [currentTabTitle, setTab] = useState(log.implement.title)
	const [currentView, setView] = useState('implement');
	useEffect(() => {
		switch (currentTabTitle) {
			case 'combined':
				setView('combined')
				break;
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

	function alphaSort(a, b) {
		// Use toUpperCase() to ignore character casing
		const bandA = a.account.dbaName.toUpperCase();
		const bandB = b.account.dbaName.toUpperCase();

		let comparison = 0;
		if (bandA > bandB) {
			comparison = 1;
		} else if (bandA < bandB) {
			comparison = -1;
		}
		return comparison;
	}

	const combined: ImplementationResult[] = [
		...log.implement.items,
		...log.cancel.items,
		...log.invalid.items,
		...log.unmatched.items
	].filter(i => i.account).sort((a, b) => {
		let [accountA, accountB] = [a.account as SimpleAccount, b.account as SimpleAccount]
		let comparison = 0;
		if (accountA.dbaName > accountB.dbaName) {
			comparison = 1;
		} else if (accountA.dbaName < accountB.dbaName) {
			comparison = -1
		}
		return comparison;
	})

	const listSet = currentTabTitle === 'Combined View' ? combined : log[currentView].items;


	const tabScore = (obj: ImplementationPackage) => {
		const variants = {
			start: { fontSize: '60px' },
			final: { fontSize: '36px' },
		}
		return (


			<Popover content={obj.desc} title={obj.title} style={{ maxWidth: 400 }}>
				<Card
					key={`${obj.title}`}
					onClick={() => setTab(obj.title)}
					className={`scoreCard ${currentTabTitle === obj.title && "current-tab"}`}>
					<>
						<motion.h3
							animate={{ opacity: [0, 1] }}
							transition={{ duration: 0.5, delay: 1 }}
						>
							{obj.title}&nbsp;
						<Badge status={obj.status} count={obj.items.length} />
						</motion.h3>
						<motion.h1 animate={{ fontSize: ['72px', '48px'] }}
							transition={{ duration: 0.5, delay: 1 }}>
							<motion.span>{obj.items.length}</motion.span>
							<QuestionCircleOutlined
								size={24}
								style={{
									color: '#ccc',
									fontSize: '13px',
									marginLeft: '7px'
								}}
							/>
						</motion.h1>
					</>
				</Card>
			</Popover>
		)
	}


	return (
		<>
			<PageHeader title={`Today at ${partner_name || partner}`}
				onBack={() => handleBack()}
			/>
			<div style={tabScoreStyle}>
				{Object.keys(log).map((i, index) => {
					const obj = log[i] as ImplementationPackage;
					const count = obj.items?.length;
					return count > 0 && (
						tabScore(obj)
					)
				})}
				<Card key="Combined View"
					onClick={() => setTab("Combined View")}
					className={`scoreCard ghost ${currentTabTitle === "Combined View" && "current-tab"}`}>
					<h3>Combined View <Badge status="processing" count={combined.length} /></h3>
					<h1>
						<span>{combined.length}</span>
						<QuestionCircleOutlined
							size={24}
							style={{
								color: '#ccc',
								fontSize: '13px',
								marginLeft: '7px'
							}}
						/>
					</h1>
				</Card>
			</div>

			<div style={{ marginRight: '24px' }}>
				<AnimatePresence exitBeforeEnter>
					<motion.div
						key={currentTabTitle}
						initial={{ opacity: 0, x: 100, }}
						animate={{ opacity: 1, x: 0, }}
						exit={{ opacity: 0, x: -100, }}
						transition={{ duration: 0.25 }}>
						{currentTabTitle === "Combined View" ? (
							<>
								<PreviewTable
									title="Ready"
									items={log.implement.items}
									payload={log.provisioning}
									partner={partner}
									totalSize={result.length}
									excludeSize={liveCount}
									summary={log.implement.desc}
								/>
								<PreviewTable
									title="Not Ready"
									items={log.invalid.items}
									partner={partner}
									totalSize={result.length}
									excludeSize={liveCount}
									summary={log.invalid.desc}
								/>
								<PreviewTable
									title="Unmatched Accounts"
									items={log.unmatched.items}
									partner={partner}
									totalSize={result.length}
									excludeSize={liveCount}
									summary={log.unmatched.desc}
								/>
								<PreviewTable
									title="Pending Cancel"
									items={log.cancel.items}
									partner={partner}
									totalSize={result.length}
									excludeSize={liveCount}
									summary={log.cancel.desc}
								/>
							</>
						) : (


								<PreviewTable
									title={currentTabTitle}
									items={listSet}
									payload={log.provisioning}
									partner={partner}

									totalSize={result.length}
									excludeSize={liveCount}
								/>

							)}
					</motion.div>
				</AnimatePresence>
			</div>
		</>
	)
}

export default ResultsView;
