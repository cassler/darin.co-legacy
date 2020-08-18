import { asEbizItem, asFinanceDriverItem, asProdSubItem } from './transformers';
import { asEbizPayload, asProdSubPayload, asFinanceDriverPayload, toDTSimple, checkEnrollmentStatus } from '@wf/core';
import { DTReportItem, SimpleAccount, PartnerCode, DTReportItemSimple, EBSProvisionItem, EnrollmentPhase, partnerConfigInput } from '@wf/types';
import { firtSheetJson } from '@wf/csv';


type MaybeAccount = DTReportItemSimple | DTReportItem | SimpleAccount;

export class Workflower3 {

	props: {
		partnerCode: PartnerCode,
		options: partnerConfigInput,
		requested: any[],
		reference: DTReportItem[]
	}
	opt: partnerConfigInput;

	constructor(props) {
		this.props = props;
		this.opt = this.props.options
	}

	// Iterate through the provided data
	parseDealertrackReport(data: DTReportItem[]) {
		return data.map(i => i["DealerTrack Id"])
	}

	// Iterate through requests by PID. Optionally use DT
	findAccount(id: number | string, useDT: boolean = false): DTReportItem {
		if (useDT) {
			return this.props.reference.find(i => i["DealerTrack Id"] === id)
		}
		return this.props.reference.find(i => i["Lender Dealer Id"] === id)
	}

	// Given a DT account, check that it fits requirements
	checkEnrollments(account: DTReportItem | undefined): boolean {
		if (!account) return false;
		return this.opt.valid_phases.includes(account["Enrollment Phase"] as EnrollmentPhase)
	}

	checkExclusions(account: number | string | undefined): boolean {
		if (!account) return false;
		return this.opt.live_ids.includes(account)
	}

	// Try to activate an ID
	public processRequest(original: number | string | object, make: boolean = false, debug: boolean = false) {
		const pid = typeof original === 'object' ? original[this.opt.internal_id] : original;
		const account = this.findAccount(pid);
		const dt = account ? account["DealerTrack Id"] : 0;
		const info = {
			dbaName: account ? account["DBA Name"] : null,
			enrollment: account ? account["Enrollment Phase"] : null,
			passPartnerPrequal: this.props.options.custom_validation(original),
			enrollmentAllowed: this.checkEnrollments(account),
			alreadyImplemented: this.checkExclusions(dt) || this.checkExclusions(pid),
		}

		const { options } = this.props;
		const { partner } = options

		return {
			pid,
			dt,
			info,
			inputData: debug ? {
				accountData: JSON.stringify(account),
				requestData: JSON.stringify(original)
			} : {},
			output: make && account && !info.alreadyImplemented ? {
				ebizUploadEntry: asEbizItem(toDTSimple(account), partner, options),
				financeDriver: asFinanceDriverItem(toDTSimple(account), partner, options),
				productSubscription: asProdSubItem(toDTSimple(account), partner, options)
			} : {}
		}
	}

	public processBatch(data: unknown[], make: boolean = false, debug: boolean = false) {
		if (!Object.keys(data[0]).includes(this.props.options.internal_id)) {
			return new Error('This doesnt look like a known request')
		}
		let [set, ebs, fd, ps] = [[], [], [], []];
		for (const req of data) {
			let item = this.processRequest(req[this.props.options.internal_id], true, true)
			set.push(item)
			ebs.push(item.output.ebizUploadEntry)
			fd.push(item.output.financeDriver)
			ps.push(item.output.productSubscription)
		}
		return {
			report: set,
			files: {
				ebiz: ebs,
				fd: fd,
				ps: ps
			}
		}
	}
}

export default Workflower3;
