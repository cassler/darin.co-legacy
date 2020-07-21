import { checkEnrollmentStatus, processPartnerSubmissions } from '@wf/core'

import {
	sample_dt_report_drw_2 as dt_report,
	sample_drw_submit as partner_submit,
	sample_ebs_entries_drw as ebs_entries
} from "@wf/sample-data";

processPartnerSubmissions({
	partner: "DRW",
	submitted: partner_submit,
	matched: dt_report,
	live: ebs_entries,
	generate: ["EBS", "PS", "FD"]
})
