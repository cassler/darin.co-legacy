import { PartnerCode, RequestBOA, RequestDRW } from '@wf/types';

export type EnrollmentPhase =
	"Password Issued" |
	"Prospect" |
	"Reactivate" |
	"Access Agreement Received" |
	"Not Contacted"

export type partnerConfigInput = {
	partner: PartnerCode,
	crm: string,
	dealerContact: string,
	internal_id: string,
	leads: string,
	ebiz_dt_dealer_id_field: string,
	submitted_file: string,
	dt_report_file: string,
	live_ids: any[],
	valid_phases: EnrollmentPhase[],
	ebiz_profile: number,
	reference_doc?: string,
	custom_validation: Function,
	generate: {
		fd: boolean,
		ebs: boolean,
		ps: boolean,
		info: boolean,
	}
}
