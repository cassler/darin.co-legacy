import { checkEnrollmentStatus, ICheckEnrollmentStatusMessage, PartnerCodes } from '@wf/core'
import {
	sample_dt_report_drw_2 as dt_report,
	sample_drw_submit as partner_submit,
	sample_ebs_entries_drw as ebs_entries
} from "@wf/sample-data";
import { uniqBy, intersection, difference, differenceBy, intersectionBy } from 'lodash'
import { DTReportItem, DTReportItemSimple, EBSProvisionItem } from '@wf/interfaces';

/**
	 * Expect these to be new. Included on match but not in EBS
	 * 7123, 7124, 7133, 7175, 7178
	 * Expect this to be live on EBS but not matched: 3422
	 */
export interface IProcessPartnerSubmission {
	partner: PartnerCodes,
	submitted: EBSProvisionItem[],
	matched: DTReportItem[],
	live: any[],
	generate: ["EBS", "PS", "FD"] | null
}

export function processPartnerSubmissions({
	partner,
	submitted,
	matched,
	live,
	generate
}: IProcessPartnerSubmission) {
	// create arrays to hold data
	let included: DTReportItem[] = []
	let messages: ICheckEnrollmentStatusMessage[] = []
	let excluded: ICheckEnrollmentStatusMessage[] = []
	let output: any[] = []

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

	// This is just for some helpful debugging
	const newIds = new_entries.map(i => i["DealerTrack Id"]);
	console.log(messages)
	console.log("Dealers excluded:", excluded.map(i => i.dt))
	console.log(new_entries.length + " Dealers added. These will be included on your output files:", newIds)

	/**
	 * @todo identify all fields needed to generate Prod Sub from output
	 * @todo identify all fields needed to generate ebs file from output
	 * @todo identify all fields needed to generate FD provisioning from output
	 */

	if (generate) {
		generate.includes("EBS") ? console.log('TODO: Generate EBS File', newIds) : null
		generate.includes("PS") ? console.log('TODO: Generate ProdSub File', newIds) : null
		generate.includes("FD") ? console.log('TODO: Generate FinanceDriver File', newIds) : null
	}

}

