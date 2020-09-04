import React from 'react';


interface Props {
	total: number,
	stats: { label: string, type: string, count: number }[]
}
export const StackedBar: React.FC<Props> = ({ total, stats }) => {
	const asPercent = (num: number) => {
		return num / total * 100 + '%'
	}
	return (
		<div className="stacked-bar">
			{stats.map(stat => (
				<div
					className={stat.type}
					style={{ width: asPercent(stat.count) }}>
					<span>{stat.label} ({stat.count})</span>
				</div>
			))}
		</div>
	)
}

export default StackedBar
