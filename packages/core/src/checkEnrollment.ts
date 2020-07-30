import { uniqBy, intersection, difference, differenceBy, intersectionBy } from 'lodash'
import { DTReportItem, DTReportItemSimple, PartnerCode } from '@wf/types';
/**
 * Iterate over entries in a Dealertrack report and provide feedback on various enrollment issues
 */
export interface ICheckEnrollmentStatusMessage {
	status: 'ACCEPTED' | 'REJECTED' | 'WARNING',
	dealertrackID?: number,
	partnerID?: number | bigint | string,
	title: string,
	message?: string,
	include: boolean
}

export interface ICheckEnrollmentProps {
	item: DTReportItemSimple | DTReportItem,
	partner: PartnerCode
}

export function checkEnrollmentStatus(
	dealertrackID: number,
	partner: PartnerCode,
	partnerID: number | string | bigint,
	phase: string,
): ICheckEnrollmentStatusMessage {


	const pid = `${partner}-${partnerID}`
	let output: ICheckEnrollmentStatusMessage;
	// console.log(item)
	switch (phase) {
		case "Not Contacted": output = {
			status: 'REJECTED',
			title: `Inelligble Dealertrack ID`,
			message: `Enrollment phase is "Not Contacted" for ${dealertrackID}. This account is not eligible for product subscription. This may be due to a problem with DT matching process. `,
			include: false,
		}
			break;
		case "Prospect": output = {
			status: 'WARNING',
			title: `Incomplete Enrollment`,
			message: `Enrollment phase is "Prospect" for ${dealertrackID}. This will limit access to some functionality until enrollment has been completed.`,
			include: true,
		}
			break;
		case "Reactivate": output = {
			status: 'WARNING',
			title: `Limited Account Access for Dealer`,
			message: `The dealer must reactivate their Dealertrack account to restore access to some functionality.`,
			include: true,
		}
			break;
		case "Password Issued": output = {
			status: 'ACCEPTED',
			title: `Success. Credentials issues to dealer.`,
			message: null,
			include: true
		}
		case "Access Agreement Received": output = {
			status: 'ACCEPTED',
			title: `Dealer added to provisioning files.`,
			message: null,
			include: true,
		}
			break;
		default: output = {
			status: 'REJECTED',
			title: 'Not detected',
			message: phase,
			include: true
		}
	}
	return { dealertrackID: dealertrackID, partnerID: partnerID, ...output };
}
