import React, { HTMLProps } from 'react';
import {
	Tag, PageHeader, Card
} from 'antd';
import 'antd/dist/antd.css';
import { InputGroup, FormGroup, Button, FileInput } from '@blueprintjs/core'
import { ImplementationResult, partnerConfigInput } from '@wf/core';
import { PartnerCode } from '@wf/types'

type Props = {
	config: partnerConfigInput
}
const ViewSettings: React.FC<Props> = ({ config }) => {
	const { internal_id, partner } = config;
	const handleChange = (e: any) => {
		console.log(e)
	}
	return (
		<>
			<PageHeader
				title={partner}
				subTitle="Edit Preferences"
				tags={(
					<Tag color="green">{config.live_ids.length} live</Tag>
				)}
				extra={(
					<Button disabled={true} intent="primary">Save Changes</Button>
				)}
			/>
			<Card>
				<FormGroup
					helperText="Helper text with details..."
					label="Label A"
					labelFor="text-input"
					labelInfo="(required)"
				>
					<InputGroup id="text-input" placeholder="Placeholder text" />
					<FileInput disabled={false} inputProps={{ accept: "csv", onChange: (e) => handleChange(e.target) }} text="Choose file..." onInputChange={(event) => console.log(event.target)} onChange={(e) => console.log(e.currentTarget)} />
				</FormGroup>
			</Card>
		</>
	)
}


export default ViewSettings;
