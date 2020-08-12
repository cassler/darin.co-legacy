import React, { useContext, useState, useEffect } from 'react';
import ResultsView from './ResultsView';
import { Result, Button } from 'antd';
import { WFContext } from '../context';
import { ImplementationResult } from '@wf/core';
import { Doughnut } from 'react-chartjs-2';


export const ResultsContainer = () => {
	const { ctx } = useContext(WFContext);
	const result: ImplementationResult[] = ctx.result;






	return (
		<div>
			{ctx.log && (
				<div>

					<ResultsView partner={ctx.partner} log={ctx.log} result={ctx.result} />

				</div>
			)}

			{!ctx.log && (
				<Result status="404" title="Ready" subTitle="Provide a DT report and a request file." />
			)}

		</div>
	)
}

export default ResultsContainer;
