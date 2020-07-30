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
import { partnerConfigs } from './partnerConfig';
/**
 *
 * @param partner
 */


export interface SimpleAccount {
	dealertrackID: number,
	partnerID: number | string | bigint,
	enrollment: string,
	dbaName: string,
	legalName: string,
	street?: string,
	city?: string,
	state?: string,
	zip?: string,
	phone?: string | number,
	fax?: string | number,
}

export interface ImplementPayload extends SimpleAccount {
	active: boolean,
	partner: PartnerCode,
}


function toIAccount(input: DTReportItem | null, partner?: PartnerCode): SimpleAccount {
	return {
		dealertrackID: input["DealerTrack Id"],
		partnerID: input["Lender Dealer Id"],
		enrollment: input["Enrollment Phase"],
		dbaName: input["DBA Name"],
		legalName: input["Legal Name"],
		street: input.Street,
		city: input.City,
		state: input.State,
		zip: input.Zip as string,
		phone: input["Phone No"],
		fax: input["Fax No"]
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

function findMatchedItem(item: Request, reference: SimpleAccount[], property): ImplementPayload {
	let acc = reference.find(i => i[property] === item[property]);
	if (acc) {
		return {
			...item,
			...acc
		}
	}
	return {
		partner: item.partner,
		dbaName: "",
		legalName: "",
		street: "",
		city: "",
		state: "",
		zip: "",
		dealertrackID: 0,
		partnerID: item.partnerID,
		enrollment: "Not Matched",
		active: false,
	}



}



export function isMatchValid(match: ImplementPayload) {
	return match.dealertrackID > 0
}

export function isMatchInvalid(match: ImplementPayload) {
	return match.dealertrackID === 0
}

export function isItemLive(match: ImplementPayload, excluded: number[]): Boolean {
	return (excluded.includes(match.dealertrackID) || excluded.includes(match.partnerID as number))
}

export function resultFromMatches(items: ImplementPayload[], excluded: number[], partner: PartnerCode) {
	const obj = {
		total: items.length,
		all: items,
		valid: items.filter(isMatchValid),
		active: items.filter(item => item.active),
		inactive: items.filter(item => !item.active),
		noMatch: items.filter(isMatchInvalid),
		live: items.filter(i => isItemLive(i, excluded)),
		new: items.filter(i => !isItemLive(i, excluded)),
		implement: items.filter(i => isMatchValid(i) && !isItemLive(i, excluded)),
	}
	return {
		...obj,
		log: obj.new.map(i => checkEnrollmentStatus(i.dealertrackID, partner, i.partnerID, i.enrollment))
	}
}


function run_intake_process(partner: PartnerCode,) {
	const config = getPartnerConfig(partner);
	const { fd, ebs, ps, info } = config.generate;
	let filePath = './src/data/';

	/**
 	 * 1. Convert every item into a Request object and apply dealer preferences (ignore if conditions not met)
 	**/
	const reference = getJSONfromSpreadsheet(filePath + config.dt_report_file)
		.map(i => toIAccount(i as DTReportItem, partner));


	const submitted = getJSONfromSpreadsheet(filePath + config.submitted_file)
		.map(i => toIRequest(i, partner)).filter(Boolean);


	const matches = submitted.map(i => findMatchedItem(i, reference, 'partnerID'));

	/**
	 * 2. Count Request objects, count all DT accounts in reference, combine where possible
	 */

	const result = resultFromMatches(matches, config.live_ids, partner);



	if (fd) {
		let fileContent = asFinanceDriverPayload(result.implement, partner);
		writeToCsv(fileContent, `finance-driver-upload-${partner}`)
	}
	if (ebs) {
		// do eBiz stuff
		let fileContent = asEbizPayload(result.implement, partner);
		writeToCsv(fileContent, `ebiz-upload-${partner}`)
	}
	if (ps) {
		// do prodsub stuff
		let fileContent = asProdSubPayload(result.implement, partner);
		writeToCsv(fileContent, `prodsub-upload-${partner}`)
	}
	if (info) {
		// do logging stuff
		let fileContent = result.log;
		writeToCsv(fileContent, `${partner}-intake-result-logging`)
	}

	return `
		SUCCESS! Parsed ${result.total} items on "${config.submitted_file}" for ${partner}.
		- ${result.live.length} are already live.
		- ${result.active.length} are listed as active for the partner.
		- ${result.new.length} new items found.
		- ${result.inactive.length} are inactive according to partner.
		- ${result.implement.length} items included on provisioning files
		- ${result.log.length} entries on the logging file output.
	`
}

console.log(run_intake_process("BOA"))
// console.log(res);

