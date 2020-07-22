import { checkEnrollmentStatus, asProdSubItem, asEbizItem, asEbizPayload, asProdSubPayload, processPartnerSubmissions, getPartnerConfig } from '@wf/core'

import {
	sample_dt_report_drw as dt_report,
	real_drw_submit as partner_submit,
	sample_ebs_entries_drw as ebs_entries
} from "@wf/sample-data";

// kik

const data = processPartnerSubmissions({
	partner: "DRW",
	submitted: partner_submit,
	matched: dt_report,
	live: ebs_entries,
	generate: ["EBS", "PS", "FD"]
});

// @todo create file with loggin messages
let infos = data.map(i => i.info)

let accounts = data.map(i => i.account)

/**
 * @todo - generate info file, write-out
 * @todo - generate product subscription file, write-out
 * @todo - generate ebs file, write out
 */
let ps = accounts.map(i => asProdSubItem(i, "DRW"))
let ebs = asEbizPayload(accounts, "DRW")

console.log(ebs)

console.log('DOsNE, no repeat')


