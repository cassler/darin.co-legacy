import { asEbizPayload, asProdSubPayload, asFinanceDriverPayload, toDTSimple, partnerConfigInput } from '@wf/core';
import { DTReportItem, SimpleAccount, PartnerCode, DTReportItemSimple, EBSProvisionItem } from '@wf/types';




export class Workflower2 {
	props: {
		partnerCode: PartnerCode,
		options: partnerConfigInput,
		requested: any[],
		reference: DTReportItem[]
	}
	result: void
	stream: object[]
	working: boolean

	constructor(props) {
		this.props = {
			partnerCode: props.options.partner,
			options: props.options,
			reference: props.reference,
			requested: props.requested
		};
		this.result = this.reconcile();
		this.stream = [];
		this.working = false
	}


	private findAccount(original: any, full: boolean = true) {
		let pid = original[this.props.options.internal_id]
		let acc = this.props.reference.find(i => i["Lender Dealer Id"] === pid)
		if (acc) {
			return full ?
				acc as DTReportItem :
				toDTSimple(acc) as SimpleAccount
		}
		return;

	}

	private runPartnerValidation(original: any) {
		return this.props.options.custom_validation(original)
	}
	private isValidEnrollment(object: DTReportItemSimple | DTReportItem | SimpleAccount) {
		if ("enrollment" in object) {
			console.log('This is a simple account')
			return this.props.options.valid_phases.includes(object.enrollment)
		}
		return this.props.options.valid_phases.includes(object["Enrollment Phase"])
	}

	reconcile() {
		let state = []
		this.working = true;
		for (const req of this.props.requested) {
			// Shorthand the PID, we'll need this a few times
			let pid = req[this.props.options.internal_id]
			// Run partner validations
			let isPartnerVali = this.runPartnerValidation(req)
			// Look for a matching account
			let acc = this.findAccount(req, false);

			if (!isPartnerVali) return;
			// Announce start of work
			console.log(pid, 'looking for matches ', 'working?', this.working);
			if (acc) {
				let obj = {
					found: true,
					isPartnerVali,
					dtFromAccount: getDT(acc),
					pidFromAccount: getPID(acc),
					pidFromRequest: getPID(req, this.props.options.internal_id),
					using: this.props.options.internal_id
				}
				state.push(obj)
				this.stream = state;
				// console.log('Stream size is: ', this.stream.length)
			} else {
				// Otherwise do this
				// console.log("FAILD! No account found in reference")
			}
			// console.log('--------')
		}
		this.working = false;
	}
}

/**
 * Helper object for grabbing dealertrack ID from several different
 * shapes of object
 *
 * @param object - arbitrate object containing a DT ID property
 */
function getDT(object: DTReportItem | SimpleAccount | object) {
	if ("DealerTrack Id" && "Equifax Signup Date" in object) {
		return object["DealerTrack Id"];
	}
	if ("dealertrackID" in object) {
		return object.dealertrackID
	}
	if ("DT Dealer ID" in object) {
		return object["DT Dealer ID"]
	}
	return;
}

function getPID(object: DTReportItem | DTReportItemSimple | EBSProvisionItem | SimpleAccount | object, check?: string | string[]) {
	if ("Lender Dealer Id" in object) {
		return object["Lender Dealer Id"]
	}
	if ("Partner Dealer ID" in object) {
		return object["Partner Dealer ID"]
	}
	if ("partnerID" in object) {
		return object.partnerID
	}
	if (typeof check === 'string') {
		if (check in object) return object[check]
	}
	if (check && check.length > 1) {
		for (const c of check) {
			if (c in object) return object[c]
		}
	}
}

