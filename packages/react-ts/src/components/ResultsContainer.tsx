import React, { useContext } from 'react';
import ResultsView from './ResultsView';
import { Result } from 'antd';
import { WFContext } from '../context';

export const ResultsContainer = () => {
	const { ctx } = useContext(WFContext);

	return (
		<div>
			{ctx.log && (
				<ResultsView partner={ctx.partner} log={ctx.log} result={ctx.result} />
			)}

			{!ctx.log && (
				<Result status="404" title="Ready" subTitle="Provide a DT report and a request file." />
			)}

		</div>
	)
}

export default ResultsContainer;
