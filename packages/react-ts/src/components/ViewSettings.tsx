import React, { HTMLProps } from 'react';
import {
	Button, Divider, Tag, PageHeader, Card
} from 'antd';
import 'antd/dist/antd.css';
import { FormGroup, InputGroup, Switch, Label, Checkbox } from '@blueprintjs/core';
import { ImplementationResult, partnerConfigInput, EnrollmentPhase } from '@wf/core';
import { PartnerCode } from '@wf/types'

type Props = {
	config: partnerConfigInput
}
const ViewSettings: React.FC<Props> = ({ config }) => {
	const { internal_id, partner, leads, crm, dealerContact, valid_phases, ebiz_dt_dealer_id_field, ebiz_profile, generate } = config;
	const handleChange = (e: any) => {
		console.log(e)
	}
	const phases: EnrollmentPhase[] = ["Password Issued", "Prospect", "Reactivate", "Access Agreement Received", "Not Contacted"]
	return (
		<>
			<PageHeader
				title={partner}
				subTitle="Edit Preferences"
				tags={(
					<Tag color="green">{config.live_ids.length} live</Tag>
				)}
			/>
			<Card>
				<div className="Partner-Settings-Panel">
					<div>
						<FormGroup
							helperText="Column name from request file where partner ID is found."
							label="Internal ID"
							labelFor="internal-id"
							labelInfo="(required)"
						>
							<InputGroup id="internal-id" placeholder={internal_id} />
						</FormGroup>
						<FormGroup
							helperText="Used for configuring eBiz profile setups 'Delaer Address for Leads'"
							label="Leads"
							labelFor="internal-id"
							labelInfo="(required)"
						>
							<InputGroup id="internal-id" placeholder={leads} />
						</FormGroup>
						<FormGroup
							helperText="Used for configuring eBiz profile setups 'Dealer Primary Contact'"
							label="Dealer Contact Email Address"
							labelFor="dealer-contact"
							labelInfo="(required)"
						>
							<InputGroup id="dealer-contact" placeholder={dealerContact} />
						</FormGroup>
						<FormGroup
							helperText="Used for lead routing in FinanceDriver'"
							label="CRM/ADF Address"
							labelFor="crm"
							labelInfo="(required)"
						>
							<InputGroup id="crm" placeholder={crm} />
						</FormGroup>
						<FormGroup
							helperText="Numerical ID of partners production account in eBiz"
							label="eBiz Profile"
							labelFor="ebiz_profile"
							labelInfo="(required)"
						>
							<InputGroup id="ebiz_profile" placeholder={`${ebiz_profile}`} />
						</FormGroup>
					</div>
					<div>
						<FormGroup>
							<h4>Toggle Generate Output for</h4>
							<Switch checked={generate.fd} onChange={(e) => console.log(e)} label="Uses FinanceDriver" />
							<Switch checked={generate.ebs} onChange={(e) => console.log(e)} label="Uses eBiz Suite" />
							<Switch checked={generate.ebs} onChange={(e) => console.log(e)} label="Uses Product Subscription" />
						</FormGroup>
						<FormGroup>
							<h4>Allow DT Enrollment phases</h4>
							{phases.map(phase => (
								<Switch checked={valid_phases.includes(phase)} label={phase} />
							))}
						</FormGroup>
						<Divider />
						<Button disabled={true}>Save Changes</Button>
					</div>
				</div>
			</Card>
		</>
	)
}


export default ViewSettings;
