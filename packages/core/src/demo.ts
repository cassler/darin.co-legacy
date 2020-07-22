import { checkEnrollmentStatus, processPartnerSubmissions } from '@wf/core'
import { uniqBy, intersection, difference, differenceBy, intersectionBy } from 'lodash'
import {
	sample_dt_report_drw as dt_report,
	real_drw_submit as partner_submit,
	sample_ebs_entries_drw as ebs_entries
} from "@wf/sample-data";

// kik
processPartnerSubmissions({
	partner: "DRW",
	submitted: partner_submit,
	matched: dt_report,
	live: ebs_entries,
	generate: ["EBS", "PS", "FD"]
})

console.log('DOsNE, no repeat')
