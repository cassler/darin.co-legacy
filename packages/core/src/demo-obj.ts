import chalk from 'chalk';
import boxen from 'boxen';

import {
	checkEnrollmentStatus,
	asEbizPayload,
	asProdSubPayload,
	asFinanceDriverPayload,
	processPartnerSubmissions,
	partnerConfigInput
} from '@wf/core'

import { getJSONfromSpreadsheet, writeToCsv } from '@wf/csv';
import { DTReportItem, PartnerCode, RequestDRW, RequestBOA } from '@wf/types';
import * as fs from 'fs'

// import { partnerConfigs } from './partnerConfig'
/**
 *
 * @param partner
 */





function notesFromFlags(passPartner: boolean, passEnrollment: boolean, alreadyLive: boolean, phase: string) {
	let message = '';
	if (!passPartner) message += 'Skipped. Does not meet partner pre-requisites from config';
	if (!passEnrollment) message += `Skipped. Dealer not fully enrolled. Currently ${phase}`;
	if (alreadyLive) message += `Dealer already live.`;
	if (passPartner && passPartner && !alreadyLive) message += "All tests passed. Included on file.";
	return message;
}

// simple container return
function getFlags(item, acc, config) {
	return {
		meetsPartnerRequirements: config.custom_validation(item),
		meetsEnrollmentRequirements: acc ? config.valid_phases.includes(acc["Enrollment Phase"]) : false,
		alreadyInProduction: acc ? config.live_ids.includes(item[config.internal_id]) || config.live_ids.includes(acc["DealerTrack Id"]) : false,
	}
}

// compartmentalize this function
function getAccountDetails(acc: DTReportItem) {
	return {
		dealertrackID: acc["DealerTrack Id"],
		dba: acc["DBA Name"],
		legal: acc["Legal Name"],
		enrollment: acc["Enrollment Phase"],
		street: acc.Street,
		city: acc.City,
		state: acc.State,
		zip: `${acc.Zip}`,
		phone: `${acc["Phone No"]}`,
		fax: `${acc["Fax No"] || ""}`
	}
}

function processSubmission(item: any, ref: DTReportItem[], config: partnerConfigInput) {
	let partnerID = item[config.internal_id];
	let acc = ref.find(r => r["Lender Dealer Id"] === partnerID) || null;

	if (!partnerID) return;

	let base = {
		partner: config.partner,
		partnerID: partnerID,
	}
	if (!acc) {
		return {
			...base,
			dealertrackID: 0,
			active: false,
			eligible: false,
			live: false,
			account: null,
			note: 'This dealer/ID does not appear on the DT report'
		}
	}
	let flags = getFlags(item, acc, config)

	if (acc) {
		return {
			...base,
			dealertrackID: acc["DealerTrack Id"],
			active: flags.meetsPartnerRequirements,
			eligible: flags.meetsEnrollmentRequirements,
			live: flags.alreadyInProduction,
			note: notesFromFlags(flags.meetsPartnerRequirements, flags.meetsEnrollmentRequirements, flags.alreadyInProduction, acc["Enrollment Phase"]),
			details: getAccountDetails(acc),
		}
	}
}





function submit_partner_request(partner: PartnerCode, options?: partnerConfigInput) {
	let config = options;
	let filePath = './src/data/';

	const reference = getJSONfromSpreadsheet(filePath + config.dt_report_file) as DTReportItem[]
	const submitted = getJSONfromSpreadsheet(filePath + config.submitted_file)

	let preProcessed = submitted.map(item => processSubmission(item, reference, config)).filter(Boolean);
	let postProcess = preProcessed.filter(item => (!item.live && item.eligible && item.active));


	// console.log(div, logging)

	return {
		all: preProcessed,
		pending: postProcess,
		source: {
			config,
			reference,
			submitted
		}
	}

}




