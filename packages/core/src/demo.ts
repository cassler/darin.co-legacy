import {
	checkEnrollmentStatus,
	asEbizPayload,
	asProdSubPayload,
	asFinanceDriverPayload,
	processPartnerSubmissions,
	getPartnerConfig,
	PartnerCodes,
	partnerConfigInput
} from '@wf/core'

import { getJSONfromSpreadsheet, writeToCsv } from '@wf/csv';
import { DTReportItem, DTReportItemSimple } from '@wf/interfaces/src';
import * as fs from 'fs'
/**
 *
 * @param partner
 */


function run_intake_process(partner: PartnerCodes, generateFiles: boolean) {
	const config = getPartnerConfig(partner);

	let filePath = './src/data/';
	// let fileName = 'Digital_Retail_Suite_Dealer_File-DRW-1.csv';
	// const submitted = getJSONfromSpreadsheet(filePath + fileName);
	// console.log(submitted)

	const data = processPartnerSubmissions({
		partner: partner,
		submitted: getJSONfromSpreadsheet(filePath + config.submitted_file) as object[],
		matched: getJSONfromSpreadsheet(filePath + config.dt_report_file) as DTReportItem[],
		live: config.live_ids,
		generate: ["EBS", "PS", "FD"]
	});

	// @todo create file with loggin messages
	let infos = data.map(i => i.info)
	// all our DT matches
	let accounts = data.map(i => i.account)
	// only those that pass pre-requisites
	let eligible_accounts = accounts.filter(i => config.valid_phases.includes(i["Enrollment Phase"]))

	if (generateFiles) {
		writeToCsv(
			data.map(i => i.info),
			`intake-result-logging-${partner}`
		);
		writeToCsv(
			asProdSubPayload(eligible_accounts, partner),
			`prodsub-submission-${partner}`
		);
		writeToCsv(
			asEbizPayload(eligible_accounts, partner),
			`ebiz-upload-${partner}`
		);
		writeToCsv(
			asFinanceDriverPayload(eligible_accounts, partner),
			`fd-provision-${partner}`
		)
	}
	return ({
		info: data.map(i => i.info),
		prodsub: asProdSubPayload(eligible_accounts, partner),
		ebs: asEbizPayload(eligible_accounts, partner),
		fd: asFinanceDriverPayload(eligible_accounts, partner)
	})

}

const res = run_intake_process("DRW", true);
console.log(res);

