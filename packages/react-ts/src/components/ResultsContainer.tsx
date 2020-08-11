import React, { useState, useContext } from 'react';
import { Workflower } from '@wf/core';
import { PartnerCode, partnerConfigInput } from '@wf/types';
import { IParseResult } from '../context';
import ResultsView from './ResultsView';
import { Result } from 'antd';
import { WFContext } from '../context';

type Props = {
	partner: PartnerCode,
	config: partnerConfigInput,
	requested: IParseResult,
	reference: IParseResult
}
export const ResultsContainer = (props: Props) => {
	const { ctx } = useContext(WFContext);

	const [ready, setReady] = useState(false)
	const [working, setWorking] = useState(false)

	const generateResult = () => {
		setWorking(true);
		let res = new Workflower({
			partnerCode: ctx.partner,
			options: ctx.config,
			requested: ctx.requested.data,
			reference: ctx.reference.data
		})
		ctx.setResult(res.init, res.fullPayload);
		setReady(true);
		setWorking(false);
	}

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
