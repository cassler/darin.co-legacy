import React from 'react';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import { FormGroup, InputGroup, Switch } from '@blueprintjs/core';
import { partnerConfigInput, EnrollmentPhase } from '@wf/types'

type Props = {
	config: partnerConfigInput
}
const ViewSettings: React.FC<Props> = ({ config }) => {
	const { internal_id, leads, crm, dealerContact, valid_phases, ebiz_profile, generate } = config;

	const phases: EnrollmentPhase[] = ["Password Issued", "Prospect", "Reactivate", "Access Agreement Received", "Not Contacted"]
	return (
		<>

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
					<Button disabled={true}>Save Changes</Button>
				</div>
			</div>
		</>
	)
}


export default ViewSettings;
