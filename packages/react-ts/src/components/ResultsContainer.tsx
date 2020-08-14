import React, { useContext, useState, useEffect } from 'react';
import ResultsView from './ResultsView';
import { Result, Button } from 'antd';
import { WFContext } from '../context';
import { ImplementationResult } from '@wf/core';
import { ArrowLeftOutlined } from '@ant-design/icons'


export const ResultsContainer = () => {
	const { ctx } = useContext(WFContext);
	const result: ImplementationResult[] = ctx.result;






	return (
		<div>
			<Button
				style={{ position: "fixed", top: '24px', right: '24px' }}
				disabled={ctx.step === 0}
				type="link"
				onClick={() => ctx.setStep(Math.max(0, ctx.step - 1))}
			>
				<ArrowLeftOutlined /> Go Back
				</Button>
			{ctx.log && (
				<div>

					<ResultsView partner={ctx.partner} log={ctx.log} result={ctx.result} liveCount={ctx.config.live_ids.length} />

				</div>
			)}

			{!ctx.log && (
				<Result status="404" title="Ready" subTitle="Provide a DT report and a request file." />
			)}

		</div>
	)
}

export default ResultsContainer;
