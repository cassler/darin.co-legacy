import { asEbizPayload, asProdSubPayload, asFinanceDriverPayload, toDTSimple, partnerConfigInput } from '@wf/core';
import { DTReportItem, SimpleAccount, PartnerCode } from '@wf/types';
import { getJSONfromSpreadsheet, writeToCsv } from '@wf/csv';


const appConfig = {
	filePath: ''
}



export interface ImplementionPreChecks {
	accountStatusOK: boolean,
	notImplemented: boolean,
	enrollmentStatusOK: boolean,
	partnerStatusOK: boolean,
}

export type ImplementationResult = {
	pid?: any,
	checks: ImplementionPreChecks,
	account?: SimpleAccount
	original?: any,
	notes?: string
}

export interface ImplementationPackage {
	title: string,
	message: string,
	items: any[]
}

/**
 * Returns implementation data for a given partner
 *
 * @remarks
 * WF is entirely self contained, though we really should be accepting
 * the entire config object as an argument.
 *
 * @todo option to pass config object at runtime
 * @todo extract file-processing logic
 *
 * @beta
 *
 */
type Props = {
	partner: PartnerCode,
	config: partnerConfigInput,
	requested: any[],
	reference: any[]
}
export class Workflower {

	config: partnerConfigInput
	partner: PartnerCode
	requestData: unknown[]
	refData: DTReportItem[]
	refQuick: SimpleAccount[]
	excluded: any[]
	init: any[]
	implement: ImplementationResult[]

	constructor(props: Props) {
		this.partner = props.partner;
		this.config = props.config;
		this.requestData = props.requested;
		this.refData = props.reference;
		this.refQuick = this.simpleAccounts(this.refData);
		this.excluded = this.config.live_ids;
		this.init = this.matchResult();
		this.implement = this.itemsToImplement.items;
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
	simpleAccounts(data: DTReportItem[]): SimpleAccount[] {
		let out = [];
		for (const d of data) {
			out.push(toDTSimple(d))
		}
		return out;
		// return data.map(i => toDTSimple(i))
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
		return this.refData.find(i => i["Lender Dealer Id"] === partnerID)
	}

	/**
	 * Returns the test results object for a given partnerID
	 * @param partnerID
	 * @param showOriginal
	 */

	findResult(partnerID: any, showOriginal: boolean = false) {
		let result = this.matchResult().find(i => i.pid === partnerID);
		if (!showOriginal) return {
			pid: result.pid,
			checks: result.checks
		}
		return result;
	}


	query(terms: string | number) {
		if (typeof terms === 'string') {
			let search = this.matchResult().filter(item => item.account.dbaName?.includes(terms))
			return search;
		}
		if (typeof terms === 'number') {
			let search = this.matchResult().filter(item => item.pid === terms || item.account.dealertrackID === terms)
			return search;
		}
	}


	/**
	 * Find if a given account ID is part of the exclusion set
	 *
	 * @param pid unique ID to be checked for exclusion
	 * @param account - optional - explicitly define an account object
	 * @yield boolean
	 */
	isExcluded(pid: any, account?: SimpleAccount) {
		const matched: SimpleAccount = account ? account : this.findAccount(pid, true) as SimpleAccount;
		return (
			this.config.live_ids.includes(pid) ||
			this.config.live_ids.includes(matched?.partnerID) ||
			this.config.live_ids.includes(matched?.dealertrackID)
		)
	}

	/**
	 * Augument each item from request with account information
	 * where available, as well as compute multiple property flags
	 * to be used by the application.
	 *
	 *
	 */
	matchResult(): ImplementationResult[] {
		let result = [];
		for (const req of this.requestData) {
			let pid = req[this.config.internal_id];
			let account = this.findAccount(pid, true) as SimpleAccount;
			let accObject = account ? account : this.emptySimpleAccount(pid);
			result.push({
				pid,
				checks: {
					accountStatusOK: account ? true : false,
					notImplemented: !this.isExcluded(pid, accObject),
					enrollmentStatusOK: account ? this.config.valid_phases.includes(account.enrollment) : false,
					partnerStatusOK: this.config.custom_validation(req),
				},
				account: accObject,
				original: req,
			})
		}
		return result;
	}

	// same as matchResult, but with reduced data and added notations
	get notedResults() {
		return this.matchResult().map(item => ({
			partnerID: item.pid,
			...item.checks,
			notes: this.getResultComment(item),
			account: item.account
		}))
	}

	getResultComment(item: ImplementationResult) {
		if (!item.account || item.account.dealertrackID === 0) {
			return 'No Dealertrack account found'
		}
		if (item.account && !this.config.valid_phases.includes(item.account.enrollment)) {
			return `Invalid enrollment for the account (${item.account.enrollment})`
		}
		if (!this.config.custom_validation(item.original)) {
			return `Dealer does not meet partner requirements from config.`
		}
		if (this.config.live_ids.includes(item.pid)) {
			return `Dealer is already live, skipped.`
		}
		return `ADDED ${item.pid} - New and OK for implementation`
	}

	eBizUpload(accounts: any[]) {
		return asEbizPayload(accounts, this.partner, this.config)
	}

	financeDriverUpload(accounts: any[]) {
		return asFinanceDriverPayload(accounts, this.partner, this.config);
	}

	prodSubRequest(accounts: any[]) {
		return asProdSubPayload(accounts, this.partner, this.config);
	}

	get summary() {
		return {
			timestamp: Date.now(),
			partner: this.partner,
			inputFile: this.config.submitted_file,
			reportFile: this.config.dt_report_file,
			countLive: this.config.live_ids.length,
			countSubmitted: this.requestData.length,
		}
	}

	get explanation() {
		let detail = this.summary;
		let str: string;
		str = `\n\n------------------\n` +
			`We are comparing information about ${this.matchResult().length} items\n` +
			`from ${this.partner} found in "${this.config.submitted_file} with\n` +
			`the Dealertrack report called "${this.config.dt_report_file}.\n` +
			`-------------\n` +
			`These items can be configured in partnerSetting.json\n` +
			`-------------\n` +
			`- ${detail.countLive} items are already live.\n` +
			`- add results to eBiz Profile: ${this.config.ebiz_profile}\n` +
			`- Config sample: ${this.config.crm} | ${this.config.leads} \n` +
			`- Using rules described on SharePoint...\n\n\n -More Info at:\n` +
			this.config.reference_doc

		return str;

	}


	/**
	 * @method invalidEnrollment
	 * @method unmatchedRequests
	 * @method itemsToImplement
	 * @method itemsToCancel - return a manifest of items that should be cancelled
	 */

	get invalidEnrollment(): ImplementationPackage {
		return {
			title: "Bad DT Enrollment",
			message: "There is a problem with this enrollment",
			items: this.matchResult().filter(i => !i.checks.enrollmentStatusOK)
		}
	}
	get unmatchedRequests(): ImplementationPackage {
		return {
			title: "No Matched Account",
			message: "These items were requested but do not exist in DT",
			items: this.matchResult().filter(i => i.account.dealertrackID < 1)
		}
	}

	get itemsToImplement(): ImplementationPackage {
		return {
			title: 'Pending Implementation',
			message: 'These items are new and have passed pre-qualifications',
			items: this.matchResult().filter(i => Object.values(i.checks).every(v => v === true))
		}
	}

	get itemsToCancel(): ImplementationPackage {
		return {
			title: 'Pending Cancellations',
			message: 'These items are listed as inactive by partner by are live.',
			items: this.matchResult().filter(i => !i.checks.enrollmentStatusOK).filter(i => i.pid),
		}
	}

	get provisioning() {
		let accounts = this.implement.map(i => i.account);
		return {
			eBizUpload: this.eBizUpload(accounts),
			financeDriverUpload: this.financeDriverUpload(accounts),
			prodSubAttachment: this.prodSubRequest(accounts)
		}
	}

	get howMany() {
		return this.implement.length;
	}

}


