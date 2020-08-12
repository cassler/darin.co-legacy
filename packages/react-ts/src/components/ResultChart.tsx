import React, { useContext, useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Button } from 'antd';

interface ResultChartProps {
	input: { label: string, count: number }[]
}
export const ResultChart: React.FC<ResultChartProps> = ({ input }) => {

	const chartData = (counts) => ({
		labels: counts.map(i => i.label),
		datasets: [{
			label: "Breakdown",
			data: counts.map(i => i.count),
			backgroundColor: [
				'#b7eb8f',
				'#ffe58f',
				'#ffccc7',
				'rgba(153, 102, 255, 0.6)',
				'rgba(54, 162, 235, 0.6)',
				'rgba(255, 206, 86, 0.6)'
			],
			borderColor: [
				'#b7eb8f',
				'#ffe58f',
				'#ffccc7',
				'rgba(153, 102, 255, 1)',
				'rgba(54, 162, 235, 1)',
				'rgba(255, 206, 86, 1)'
			],
			borderWidth: 1
		}]
	})
	const [full, simple] = [chartData(input), chartData(input.filter(i => i.label !== "Already Live"))]


	const [data, setData] = useState(simple)
	const [showAll, toggleShowAll] = useState(false)
	const toggleData = () => {
		toggleShowAll(!showAll)
		if (showAll) {
			setData(full)
		} else {
			setData(simple)
		}
	}
	return (
		<>
			<Doughnut data={data} legend={{ position: "right" }} height={12} width={12} options={{
				fontSize: 15
			}} />
			<Button onClick={() => toggleData()}>
				Toggle Me! {showAll ? "all" : "pending only"}</Button>
		</>
	)
}
export default ResultChart;
