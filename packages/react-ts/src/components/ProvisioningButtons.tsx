import React from 'react';
import { PartnerCode } from '@wf/types';
import { ImpPayloadI } from './ImpPackage';
import DownloadButton from './DownloadButton';

interface ProvisioningButtonsProps {
	payload: ImpPayloadI,
	partner: PartnerCode,
	title?: string
}

export const ProvisioningButtons: React.FC<ProvisioningButtonsProps> =
	({ payload, partner, title }) => (
		<>

			<DownloadButton
				label="eBiz Suite" type="primary" partner={partner}
				data={payload.eBizUpload}
				tip="Use to add dealers to partner eBiz profile"
			/> &nbsp;
			<DownloadButton
				label="Finance Driver" type="primary" partner={partner}
				data={payload.financeDriverUpload}
				tip="File for provisioning partner's FD for dealers" />
				&nbsp;
			<DownloadButton
				label="Product Subscription"
				type="primary" partner={partner}
				data={payload.prodSubAttachment}
				tip="Send to production.subscription@coxautoinc.com for billing assets"
			/>
		</>
	)

export default ProvisioningButtons;
