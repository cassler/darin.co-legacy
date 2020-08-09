import { checkEnrollmentStatus, ICheckEnrollmentStatusMessage } from '@wf/core'
import { uniqBy, uniq, intersection, difference } from 'lodash'
import { DTReportItem, PartnerCode, partnerConfigInput } from '@wf/types';
// import { partnerConfigs } from './partnerConfig';


export function getValuesByKeyName(data: object[], key: string, values?: any[]) {
	if (!values) return data.map(i => i[key])
	return data.filter(i => values.includes(i[key]))
}

export interface ProcessPartnerSubmissionProps {
	partner: PartnerCode,
	submitted: object[], // this should be more flexible
	matched: DTReportItem[],
	live: number[],
	generate: ["EBS", "PS", "FD"] | null // deprectated
	config: partnerConfigInput
}

export type ProcessPartnerSubmissionResult = {
	info: ICheckEnrollmentStatusMessage,
	account: DTReportItem,
	item: object
}

export function processPartnerSubmissions(props: ProcessPartnerSubmissionProps) {
	// create arrays to hold data
	const { partner, submitted, matched, live, config } = props;
	// let config = partnerConfigs.find(i => i.partner === partner)
	/**
	 * @yields array of IDs for the respective namespace.
	 * @description This is repetitive for the sake of cleanliness.
	 * */

	const id_sets = {
		submitted: getValuesByKeyName(submitted, config.internal_id), //?
		matched: getValuesByKeyName(matched, "Lender Dealer Id"),
		live: live
	}

	/**
	 * @yields array of 'new' items submitted but not live.
	 * @description - This is very repetitive code for the sake of readability
	 * */

	const delta = {
		added: difference(id_sets.submitted, id_sets.live).filter(Boolean),
		removed: difference(id_sets.live, id_sets.submitted)
	}

	/**
	 * @name new_items_validate
	 *
	 * @type DTReportItem[]
	 * @yields Remove anything without a match
	 *
	 * @todo Refactor this filter into a pure fuctnion
	 * @todo Apply custom rules from partnerConfig
	 */

	const new_items_validate = submitted.filter(i => delta.added.includes(i[config.internal_id])) //?
	// console.log(JSON.stringify(submitted.map(i => i[config.internal_id])))
	// console.log('ADDED:', delta.added)
	// console.log(new_items_validate)
	/**
	 * Post Processing & Generating Output
	 *
	 * @description Apply additional checks on the working set of new entries by
	 * looping through the provided array and generating object data for the respective
	 * dealer in multiple formats.
	 *
	 * @todo convert inner loop to pure function that returns values.
	 * @todo convert to mapped function outputs rather than array pushes.
	 */

	const output: ProcessPartnerSubmissionResult[] = new Array();

	for (const item of new_items_validate) {
		// check for a match
		let pid = item[config.internal_id];
		let dtMatch = matched.find(i => i["Lender Dealer Id"] == pid)
		// validate enrollment on this match
		output.push({
			info: dtMatch ? { ...checkEnrollmentStatus(dtMatch["DealerTrack Id"], partner, dtMatch["Lender Dealer Id"], dtMatch["Enrollment Phase"]) } : null,
			account: dtMatch || null,
			item: item
		})
	}

	return output;

}
