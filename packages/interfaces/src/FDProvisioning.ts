import { sample_dt_report_drw, sample_drw_submit } from "@wf/sample-data";
import { uniqBy, intersection, difference } from 'lodash'

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


const requested_ids = sample_drw_submit.map(i => i["Partner Dealer ID"])
const matched_ids = sample_dt_report_drw.map(i => i["Lender Dealer Id"])

console.log(
	'Matched and Requested', intersection(matched_ids, requested_ids).length
)

console.log('Requested not matched', difference(requested_ids, matched_ids))
