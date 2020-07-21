import {
	sample_dt_report_drw_2 as dt_report,
	sample_drw_submit as partner_submit,
	sample_ebs_entries_drw as ebs_entries
} from "@wf/sample-data";
import { uniqBy, intersection, difference, differenceBy, intersectionBy } from 'lodash'
import { DTReportItem, DTReportItemSimple, EBSProvisionItem } from '@wf/interfaces';
/**
 * Input fields needed to generate a FinanceDriver entry
 */
export interface FDProvisionInput {
	'Partner ID': string // req
	'Partner Dealer ID': string | number | bigint // req
	'Created Date'?: string // req
	'FinanceDriver Status'?: string // req
	'Dealer Notification Email Address'?: string // needed
	'AdfEmailAddress'?: string // needed
}


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
function checkEnrollmentStatus(item: DTReportItemSimple | DTReportItem, partner: "DRW" | "BOA"): ICheckEnrollmentStatusMessage {
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
			include: false
		}
	}
	return { dt: item["DealerTrack Id"], partnerId: item["Lender Dealer Id"], ...output };
}



/**
	 * Expect these to be new. Included on match but not in EBS
	 * 7123, 7124, 7133, 7175, 7178
	 * Expect this to be live on EBS but not matched: 3422
	 */
interface IProcessPartnerSubmission {
	partner: "DRW" | "BOA",
	submitted: EBSProvisionItem[],
	matched: DTReportItem[],
	live: any[]
}

function processPartnerSubmissions({ partner, submitted, matched, live }: IProcessPartnerSubmission) {
	// create arrays to hold data
	let included: DTReportItem[] = []
	let messages: ICheckEnrollmentStatusMessage[] = []
	let excluded: ICheckEnrollmentStatusMessage[] = []
	let output: any[]

	// limit our work to matched dealers included on request file. This is all we need to worry about
	const active_matched = matched.filter(i =>
		submitted.map(s => s["Partner Dealer ID"]).includes(i["Lender Dealer Id"])
	)

	// cycle through dealermatch file for enrollments
	for (const i of active_matched) {
		const result = { ...checkEnrollmentStatus(i, partner) }
		result.include ? included.push(i) : excluded.push(result);
		result.message ? messages.push(result) : null;
	}

	// now we'll isolate the ones not in our live environment
	const new_entries = active_matched.filter(i =>
		!live.includes(i["Lender Dealer Id"])
	)

	// build an output of these items
	output = new_entries.map(i => ({
		partner: partner,
		dealertrack_id: i["DealerTrack Id"],
		dbaName: i["DBA Name"],
		partnerId: i["Lender Dealer Id"],
		street: i.Street,
		city: i.City,
		state: i.State,
		zip: i.Zip
	}))

	// This is just for some helpful debugging
	console.log(messages)
	console.log(output)
	console.log("Dealers excluded:", excluded.map(i => i.dt))
	console.log(new_entries.length + " Dealers added:", new_entries.map(i => i["DealerTrack Id"]))

	/**
	 * @todo identify all fields needed to generate Prod Sub from output
	 * @todo identify all fields needed to generate ebs file from output
	 * @todo identify all fields needed to generate FD provisioning from output
	 */
}

processPartnerSubmissions({
	partner: "DRW",
	submitted: partner_submit,
	matched: dt_report,
	live: ebs_entries
})
