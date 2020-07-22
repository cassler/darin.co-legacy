import { checkEnrollmentStatus, asProdSubItem, asEbizItem, asEbizPayload, asProdSubPayload, processPartnerSubmissions, getPartnerConfig } from '@wf/core'
import { DTReportItem } from '@wf/interfaces'
import {
	sample_dt_report_drw as dt_report,
	real_drw_submit as partner_submit,
	sample_ebs_entries_drw as ebs_entries
} from "@wf/sample-data";
import { PartnerCodes } from './partnerConfig';

// kik

function run_intake_process(partner: PartnerCodes) {
	let config = getPartnerConfig(partner);
	const data = processPartnerSubmissions({
		partner: partner,
		submitted: config.submitted_file,
		matched: config.dt_report_file,
		live: config.live_ids,
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
	console.log(ps[0])
	console.log(infos)

}

run_intake_process("DRW")
