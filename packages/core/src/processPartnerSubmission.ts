import { checkEnrollmentStatus, ICheckEnrollmentStatusMessage, PartnerCodes } from '@wf/core'
import { uniqBy, uniq, intersection, difference } from 'lodash'
import { DTReportItem, DTReportItemSimple, EBSProvisionItem } from '@wf/interfaces';

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

export function getValuesByKeyName(data: object[], key: string, values?: any[]) {
	if (!values) return data.map(i => i[key])
	return data.filter(i => values.includes(i[key]))
}

export function processPartnerSubmissions(props: ProcessPartnerSubmissionProps) {
	// create arrays to hold data
	const { partner, submitted, matched, live, generate } = props;

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

	console.log('ADDED:', delta.added)
	console.log('REMOVED:', JSON.stringify(delta.removed))

	/**
	 * @todo - new array from request including only 'ADDED' items
	 * @todo - validate DT match for each of them
	 */

	const new_items_validate = submitted.filter(i => delta.added.includes(i["Partner Dealer ID"])) //?
	// const new_items_validate = submitted
	// console.log(new_items_validate)
	for (const item of new_items_validate) {
		let pid = item["Partner Dealer ID"];
		// check for a match
		let dtMatch = matched.find(i => i["Lender Dealer Id"] == pid)
		// if nothing comes back, throw this away
		if (!dtMatch) {
			console.log('Warning, dealer is not matched in DT', item["Partner Dealer ID"])
		} else {
			// validate enrollment on this match
			const result = { ...checkEnrollmentStatus(dtMatch, partner) }
			console.log(result)
		}

	}

	// cycle through dealermatch file for enrollments
	let included: object[] = []
	let excluded: object[] = []
	let messages: object[] = []
	for (const i of delta.added) {
		if (id_sets.matched.indexOf(i) >= 0) {
			const result = { ...checkEnrollmentStatus(i, partner) }
			result.include ? included.push(i) : excluded.push(result);
			result.message ? messages.push(result) : null;
		} else {
			console.warn(`Dealer does not exist as match ${partner} ${i}`)
		}
	}





	return;

}


