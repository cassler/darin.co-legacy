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
		}
		return (
			<>
				<b>Live IDs:</b> {currentIds.length} / <b>New IDs</b> {newSet.length}
				<Input.TextArea
					rows={4}
					placeholder={JSON.stringify(currentIds)}
					onChange={(e) => updateValues(e.target.value)}
				/>
				<Button onClick={() => callback(newSet)}>
					Update Live IDs
				</Button>
				<Button
					type="link"
					href="https://ghe.coxautoinc.com/Darin-Cassler/workflower-client/blob/develop/lib/gatherEbizIds.js">
					Bookmarklet
				</Button>
			</>
		)
	}
export default ExclusionSet;
