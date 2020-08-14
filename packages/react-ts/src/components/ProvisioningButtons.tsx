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
				data={payload.eBizUpload} /> &nbsp;
			<DownloadButton
				label="Finance Driver" type="primary" partner={partner}
				data={payload.financeDriverUpload} />
				&nbsp;
			<DownloadButton
				label="Product Subscript"
				type="primary" partner={partner}
				data={payload.prodSubAttachment}
			/>
		</>
	)

export default ProvisioningButtons;
