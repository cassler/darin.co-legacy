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
			{ctx.log && (
				<div>

					<ResultsView
						partner_name={ctx.partner_name}
						partner={ctx.partner} log={ctx.log} result={ctx.result} liveCount={ctx.config.live_ids.length} handleBack={() => {
							ctx.setStep(Math.max(0, ctx.step - 1))
						}}
					/>

				</div>
			)}

			{!ctx.log && (
				<Result status="404" title="Ready" subTitle="Provide a DT report and a request file." />
			)}

		</div>
	)
}

export default ResultsContainer;
