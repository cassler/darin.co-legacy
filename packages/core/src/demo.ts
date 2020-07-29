import {
	checkEnrollmentStatus,
	asEbizPayload,
	asProdSubPayload,
	asFinanceDriverPayload,
	processPartnerSubmissions,
	getPartnerConfig,
	partnerConfigInput
} from '@wf/core'

import { getJSONfromSpreadsheet, writeToCsv } from '@wf/csv';
import { DTReportItem, DTReportItemSimple, PartnerCode, RequestDRW, RequestBOA, Request } from '@wf/types';
import * as fs from 'fs'
/**
 *
 * @param partner
 */


function toIAccount(input: DTReportItem, partner?: PartnerCode) {
	return {
		dealertrackID: input["DealerTrack Id"],
		partnerID: input["Lender Dealer Id"],
		enrollment: input["Enrollment Phase"],
		street: input.Street,
		city: input.City,
		state: input.State,
		zip: input.Zip,
		phone: input["Phone No"],
		fax: input["Fax No"] || ""
	}
}

function toIRequest(input: any, partner?: PartnerCode): Request | null {
	let config = getPartnerConfig(partner);
	if (partner) {
		// check the partner configs to see if this should be active
		let active = config.custom_validation(input);
		let partnerID = input[config.internal_id];
		// if we dont have anything, throw it out.
		if (!partnerID) {
			console.log('NO PARTNER ID FOUND')
			return;
		}
		// return a cleaned up version of the request
		return {
			partner: partner,
			partnerID: input[config.internal_id],
			active: active,
			// original: input
		}
	}
	// if the partner isnt provided, we're gonna guess
	return;
}

export default toIRequest;


function run_intake_process(partner: PartnerCode, generateFiles: boolean) {
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

	let simple = getJSONfromSpreadsheet(filePath + config.dt_report_file)
		.map(i => toIAccount(i as DTReportItem, partner));

	let req = getJSONfromSpreadsheet(filePath + config.submitted_file)
		.map(i => toIRequest(i, partner))
		.filter(Boolean)
		.map(r => {
			let acc = simple.find(i => i.partnerID === r.partnerID)
			return { ...r, ...acc }
		})

	const onlyNew = req.filter(p => config.live_ids.includes(p.dealertrackID))
	console.log(onlyNew)
	// for (const p of payload) {
	// 	let isLive = config.live_ids.includes(p.dealertrackID)
	// 	console.log(isLive)
	// }
	// console.log(onlyNew.length)

	// let input: Request[] = req.map(r => {
	// 	let acc = simple.find(i => i.partnerID === r.partnerID);
	// 	return { ...r, ...acc }
	// })






	//
	//
	// WE'RE PAUSING EVERYTHING!!!
	//
	//
	//
	let run_original = false;
	if (run_original) {

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

}

const res = run_intake_process("BOA", true);
// console.log(res);

