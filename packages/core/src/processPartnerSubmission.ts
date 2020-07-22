import { checkEnrollmentStatus, ICheckEnrollmentStatusMessage } from '@wf/core'
import { uniqBy, uniq, intersection, difference } from 'lodash'
import { DTReportItem, DTReportItemSimple, EBSProvisionItem } from '@wf/interfaces';
import { PartnerCodes } from './partnerConfig'

export function getValuesByKeyName(data: object[], key: string, values?: any[]) {
	if (!values) return data.map(i => i[key])
	return data.filter(i => values.includes(i[key]))
}

/**
	 * Expect these to be new. Included on match but not in EBS
	 * 7123, 7124, 7133, 7175, 7178
	 * Expect this to be live on EBS but not matched: 3422
	 */
export interface ProcessPartnerSubmissionProps {
	partner: PartnerCodes,
	submitted: EBSProvisionItem[],
	matched: DTReportItem[],
	live: number[],
	generate: ["EBS", "PS", "FD"] | null
}

export type ProcessPartnerSubmissionResult = {
	info: ICheckEnrollmentStatusMessage,
	account: DTReportItem,
	item: object
}

export function processPartnerSubmissions(props: ProcessPartnerSubmissionProps) {
	// create arrays to hold data
	const { partner, submitted, matched, live, generate } = props;
	const output: ProcessPartnerSubmissionResult[] = []

	// 1. Compare submitted items with available match items.
	const id_sets = {
		submitted: getValuesByKeyName(submitted, "Partner Dealer ID"), //?
		matched: getValuesByKeyName(matched, "Lender Dealer Id"),
		live: live
	}

	const delta = {
		added: difference(id_sets.submitted, id_sets.live),
		removed: difference(id_sets.live, id_sets.submitted)
	}

	const new_items_validate = submitted.filter(i => delta.added.includes(i["Partner Dealer ID"])) //?
	// const new_items_validate = submitted
	// console.log(new_items_validate)
	for (const item of new_items_validate) {
		// check for a match
		let pid = item["Partner Dealer ID"];
		let dtMatch = matched.find(i => i["Lender Dealer Id"] == pid)
		// validate enrollment on this match
		output.push({
			info: { ...checkEnrollmentStatus(dtMatch, partner) },
			account: dtMatch || null,
			item: item
		})

	}

	// console.log('ADDED:', delta.added)
	// console.log('REMOVED:', JSON.stringify(delta.removed))

	return output;

}
