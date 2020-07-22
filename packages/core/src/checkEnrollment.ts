import { uniqBy, intersection, difference, differenceBy, intersectionBy } from 'lodash'
import { DTReportItem, DTReportItemSimple, EBSProvisionItem } from '@wf/interfaces';
import { PartnerCodes } from './partnerConfig'
/**
 * Iterate over entries in a Dealertrack report and provide feedback on various enrollment issues
 */
export interface ICheckEnrollmentStatusMessage {
	status: 'pass' | 'fail' | 'warning',
	dt?: number,
	partnerId?: number | bigint | string,
	title: string,
	message?: string,
	include: boolean
}



export interface ICheckEnrollmentProps {
	item: DTReportItemSimple | DTReportItem,
	partner: PartnerCodes
}

export function checkEnrollmentStatus(
	item: DTReportItemSimple | DTReportItem,
	partner: PartnerCodes
): ICheckEnrollmentStatusMessage {

	const phase = item["Enrollment Phase"]
	const [dtid, partnerId] = [item["DealerTrack Id"], item["Lender Dealer Id"]]
	const pid = `${partner}-${partnerId}`
	let output: ICheckEnrollmentStatusMessage;
	switch (phase) {
		case "Not Contacted": output = {
			status: 'fail',
			title: `Inelligble Dealertrack ID`,
			message: `Enrollment phase is "Not Contacted" for ${dtid}. This account is not eligible for product subscription. This may be due to a problem with DT matching process. Check for possible alternate accounts to remap ${pid}.`,
			include: false,
		}
			break;
		case "Prospect": output = {
			status: 'warning',
			title: `Incomplete Enrollment`,
			message: `Enrollment phase is "Prospect" for ${dtid}. This will limit access to some functionality until enrollment has been completed.`,
			include: true,
		}
			break;
		case "Reactivate": output = {
			status: 'warning',
			title: `Limited Account Access for Dealer`,
			message: `The dealer must reactivate their Dealertrack account to restore access to some functionality.`,
			include: true,
		}
			break;
		case "Password Issued": output = {
			status: 'pass',
			title: `Success. Credentials issues to dealer.`,
			message: null,
			include: true
		}
		case "Access Agreement Received": output = {
			status: 'pass',
			title: `Success. Dealer enrollment is valid.`,
			message: null,
			include: true,
		}
			break;
		default: output = {
			status: 'warning',
			title: 'Not detected',
			message: `${item["Enrollment Phase"]}`,
			include: true
		}
	}
	return { dt: item["DealerTrack Id"], partnerId: pid, ...output };
}
