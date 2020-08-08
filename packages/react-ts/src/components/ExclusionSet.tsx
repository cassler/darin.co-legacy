import React, { useState } from 'react';
import { Button, Input } from 'antd';

interface Props {
	currentIds: number[] | bigint[] | string[];
	callback: Function
}

export const ExclusionSet: React.FC<Props> =
	({ currentIds, callback }) => {
		const [newSet, setSet] = useState(currentIds);
		const updateValues = (str: string): void => {
			const asNumberArray = str.split(',').map(i => parseInt(i));
			setSet(asNumberArray);
			callback(asNumberArray);
		}
		return (
			<>
				<b>Live IDs:</b> {currentIds.length}
				<Input.TextArea
					rows={4}
					placeholder={JSON.stringify(currentIds)}
					onChange={(e) => updateValues(e.target.value)}
				/>
				<Button onClick={(e) => console.log(e)}>Click me</Button>
				<Button type="link" href="https://ghe.coxautoinc.com/Darin-Cassler/workflower-client/blob/develop/lib/gatherEbizIds.js">
					Bookmarklet
			</Button>
				{JSON.stringify(newSet.slice(0, 100))}
			</>
		)
	}
export default ExclusionSet;
