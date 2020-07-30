import { SimpleAccount, isItemLive } from '@wf/core';
import { partnerConfigs, partnerConfigInput } from './partnerConfig';
import { DTReportItem, PartnerCode } from '@wf/types';
import { getJSONfromSpreadsheet, writeToCsv } from '@wf/csv';


const appConfig = {
	filePath: './src/data/'
}

export function toDTSimple(input: DTReportItem): SimpleAccount {
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

export interface ImplementionPreChecks {
	accountStatusOK: boolean,
	notImplemented: boolean,
	enrollmentStatusOK: boolean,
	partnerStatusOK: boolean,
}

export interface ImplementationResult {
	pid?: any,
	checks: ImplementionPreChecks,
	account?: SimpleAccount
	original?: any
}

export interface ImplementationPackage {
	title: string,
	message: string,
	items: any[]
}


class Workflower {

	config: partnerConfigInput
	partner: PartnerCode
	requestData: any[]
	refData: any[]
	refQuick: SimpleAccount[]
	excluded: any[]
	init: any[]

	constructor(partner: PartnerCode) {
		this.partner = partner;
		this.config = partnerConfigs.find(i => i.partner === this.partner);
		this.requestData = this.partnerData.requestData;
		this.refData = this.partnerData.refData as DTReportItem[];
		this.refQuick = this.simpleAccounts as SimpleAccount[];
		this.excluded = this.config.live_ids;
		this.init = this.matchResult;
	}

	// helper function to fill in the matchResult array
	private emptySimpleAccount(partnerID: any, meetRequirements: boolean = false): SimpleAccount {
		return {
			partnerID: partnerID,
			dealertrackID: 0,
			enrollment: 'N/A',
			dbaName: null,
			legalName: null,
			city: null,
			state: null,
			zip: null,
			phone: null,
			fax: null,
		}
	}

	// create a smaller version of references
	get simpleAccounts(): SimpleAccount[] {
		return this.refData.map(i => toDTSimple(i))
	}

	/**
	 * Returns account infromation from a partnerID using config
	 *
	 * @param partnerID
	 * @param fast
	 */

	findAccount(partnerID: any, fast: boolean = true) {
		if (fast) {
			return this.refQuick.find(i => i.partnerID === partnerID)
		}
		return this.partnerData.refData.find(i => i["Lender Dealer Id"] === partnerID)
	}

	/**
	 * Returns the test results object for a given partnerID
	 * @param partnerID
	 * @param showOriginal
	 */

	findResult(partnerID: any, showOriginal: boolean = false) {
		let result = this.matchResult.find(i => i.pid === partnerID);
		if (!showOriginal) return {
			pid: result.pid,
			checks: result.checks
		}
		return result;
	}


	set submittedFile(submitted_file: string) {
		let data = getJSONfromSpreadsheet(appConfig.filePath + submitted_file)
		if (!data) {
			throw new Error("No request data found from provided file name")
		}
		if (data.length < 1) {
			throw new Error("Insufficient data, no rows")
		}
		if (!data.filter(i => i[this.config.internal_id]).filter(Boolean)) {
			throw new Error("Unable to find interal ID in data set")
		}
		this.requestData = data;
	}

	set referenceFile(reference_file: string) {
		let data = getJSONfromSpreadsheet(appConfig.filePath + reference_file)
		if (!data) {
			throw new Error("No request data found from provided file name")
		}
		if (data.length < 1) {
			throw new Error("Insufficient data, no rows")
		}
		if (!data.filter(i => i[this.config.internal_id]).filter(Boolean)) {
			throw new Error("Unable to find interal ID in data set")
		}
		this.refData = data;
	}


	// compile JSON of data from files in config
	get partnerData(): { requestData: any[], refData: DTReportItem[] } {
		return {
			requestData: getJSONfromSpreadsheet(
				appConfig.filePath + this.config.submitted_file
			),
			refData: getJSONfromSpreadsheet(
				appConfig.filePath + this.config.dt_report_file
			) as DTReportItem[]
		}
	}



	// Return DT account info if found, or dummy data
	get matchResult(): ImplementationResult[] {
		return this.requestData.map(req => {
			let pid = req[this.config.internal_id];
			let account = this.findAccount(pid, true) as SimpleAccount;
			let accObject = account ? account : this.emptySimpleAccount(pid);
			return {
				pid,
				checks: {
					accountStatusOK: account ? true : false,
					notImplemented: (
						!this.config.live_ids.includes(pid) &&
						!this.config.live_ids.includes(accObject.dealertrackID)
					),
					enrollmentStatusOK: account ? this.config.valid_phases.includes(account.enrollment) : false,
					partnerStatusOK: this.config.custom_validation(req),
				},
				account: accObject,
				original: req,
			}
		})
	}


	get summary() {
		return {
			timestamp: Date.now(),
			partner: this.partner,
			inputFile: this.config.submitted_file,
			reportFile: this.config.dt_report_file,
			countLive: this.config.live_ids.length,
			countSubmitted: this.requestData.length,
			countMeetPartnerReqs: this.matchResult.filter(i => i.checks.partnerStatusOK).length,
			countValidEnroll: this.matchResult.filter(i => i.checks.enrollmentStatusOK).length,
			countNoMatch: this.matchResult.filter(i => !i.checks.accountStatusOK).length,
			countNotImplemented: this.matchResult.filter(i => !i.checks.notImplemented).length,
			countToImplement: this.matchResult.filter(i => Object.values(i.checks).every(val => val === true))
		}
	}

	get invalidEnrollment(): ImplementationPackage {
		return {
			title: "Bad DT Enrollment",
			message: "There is a problem with this enrollment",
			items: this.matchResult.filter(i => !i.checks.enrollmentStatusOK)
		}
	}
	get unmatchedRequests(): ImplementationPackage {
		return {
			title: "No Matched Account",
			message: "These items were requested but do not exist in DT",
			items: this.matchResult.filter(i => i.account.dealertrackID < 1)
		}
	}

	get itemsToImplement(): ImplementationPackage {
		return {
			title: 'Pending Implementation',
			message: 'These items are new and have passed pre-qualifications',
			items: this.matchResult.filter(i => Object.values(i.checks).every(v => v === true))
		}
	}

	/**
	 * @method itemsToCancel - return a manifest of items that should be cancelled
	 */
	get itemsToCancel(): ImplementationPackage {
		return {
			title: 'Pending Cancellations',
			message: 'These items are listed as inactive by partner by are live.',
			items: this.matchResult.filter(i => !i.checks.enrollmentStatusOK).filter(i => i.pid),
		}
	}



}





export function playgroundForWorkflower() {
	const boa = new Workflower("DRW");
	let payloads = [
		boa.invalidEnrollment,
		boa.unmatchedRequests,
		boa.itemsToCancel,
		boa.itemsToImplement,
	]

	payloads.map(un => {
		console.log({ title: un.title, msg: un.message, count: un.items.length })
	})

	console.log(boa.requestData.length)
	console.log(boa.itemsToImplement.items.length)

	console.log(boa.requestData.length)
	console.log(boa.itemsToImplement.items.length)

}
playgroundForWorkflower();

