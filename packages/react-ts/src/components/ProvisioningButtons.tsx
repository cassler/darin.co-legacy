import React, { useContext } from 'react';
import { PartnerCode } from '@wf/types';
import { ImpPayloadI } from './ImpPackage';
import DownloadButton from './DownloadButton';
import { WFContext } from '../context';

interface ProvisioningButtonsProps {
	payload: ImpPayloadI,
	partner: PartnerCode,
	title?: string
}

export const ProvisioningButtons: React.FC<ProvisioningButtonsProps> =
	({ payload, partner, title }) => {
		const { ctx } = useContext(WFContext);

		const psTooltip = () => {
			if (ctx.config.prodSubTemplate) {
				return (
					<div>
						<h4>{ctx.config.prodSubTemplate.subject}</h4>
						{ctx.config.prodSubTemplate.content.map(txt => <>{txt}<br /></>)}
						<br />
						<p>{payload.prodSubAttachment.length} dealers attached</p>
					</div >
				)
			} else {
				return 'Send file to production.subscription@coxautoinc.com'
			}
		}

		return (
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
					tip={psTooltip}
				/>

			</>
		)
	}

export default ProvisioningButtons;
