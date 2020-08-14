import React from 'react';
import { Steps } from 'antd';
import { PartnerCode } from '@wf/types'

export interface IStepperProps {
	partner: PartnerCode,
	refSize: number | undefined,
	reqSize: number | undefined,
	index: number,
	items?: IStepperStep[]
	setStep?: (any) => void
}

export interface IStepperStep {
	title: string,
	description: string,
	readyDescription: string,
	isReady: boolean,
	onClick: Function
}


export const Stepper: React.FC<IStepperProps> = ({
	partner,
	refSize,
	reqSize,
	index,
	items,
	setStep
}) => {


	const defaultSteps: IStepperStep[] = items ? items : [
		{
			title: "Select Partner",
			description: "Who are we working with?",
			readyDescription: `Working with ${partner}`,
			isReady: partner ? true : false,
			onClick: () => setStep(0)
		},
		{
			title: "Provide DT Report",
			description: "Upload a business report",
			readyDescription: `Provided ${refSize} accounts`,
			isReady: refSize && refSize > 0,
			onClick: () => index > 1 && setStep(1)
		},
		{
			title: "Provide Request Data",
			description: "Upload a partner submission",
			readyDescription: `Provided ${reqSize} requests`,
			isReady: reqSize > 0,
			onClick: () => index > 2 && setStep(2)
		},
		{
			title: "Generate Results",
			description: "Needs more data",
			readyDescription: `Success!`,
			isReady: index > 3,
			onClick: () => index > 3 && setStep(3)
		},
		{
			title: "Review",
			description: "See the results",
			readyDescription: `See the results`,
			isReady: index > 3,
			onClick: () => index > 4 && setStep(4)
		},
	]

	return (
		<div>
			<Steps direction="vertical" current={index} >
				{defaultSteps.map(item => (
					<Steps.Step
						onClick={() => item.onClick()}
						title={item.title}
						description={item.isReady ? item.readyDescription : item.description}
					/>
				))}
			</Steps>
		</div>
	)
}

export default Stepper
