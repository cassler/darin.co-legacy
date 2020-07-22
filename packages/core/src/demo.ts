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


/**
 *
 * @param partner
 */

export interface IRunIntakeOptions {
	partner: PartnerCodes,
	config: partnerConfigInput
}
function run_intake_process(partner: PartnerCodes) {
	let config = getPartnerConfig(partner);
	const data = processPartnerSubmissions({
		partner: partner,
		submitted: config.submitted_file,
		matched: config.dt_report_file,
		live: config.live_ids,
		generate: ["EBS", "PS", "FD"]
	});

	// @todo create file with loggin messages
	let infos = data.map(i => i.info)
	// all our DT matches
	let accounts = data.map(i => i.account)
	// only those that pass pre-requisites
	let eligible_accounts = accounts.filter(i => config.valid_phases.includes(i["Enrollment Phase"]))

	return ({
		info: data.map(i => i.info),
		prodsub: asProdSubPayload(eligible_accounts, partner),
		ebs: asEbizPayload(eligible_accounts, partner),
		fd: asFinanceDriverPayload(eligible_accounts, partner)
	})

}

const res = run_intake_process("DRW");
console.log(res.info);
