export type PartnerCodes = "BOA" | "DRW"
import {
	sample_dt_report_drw as dt_report,
	real_drw_submit as partner_submit,
	sample_ebs_entries_drw as ebs_entries,
} from "@wf/sample-data";

export const partnerConfigs = [
	{
		partner: "BOA",
		crm: "NoReply@bankofamerica.com",
		dealerContact: "NoReply@bankofamerica.com",
		leads: "NoReply@bankofamerica.com",
		ebiz_dt_dealer_id_field: "DealerTrack Id",
		submitted_file: partner_submit,
		dt_report_file: dt_report,
		live_ids: ebs_entries

	},
	{
		partner: "DRW",
		crm: "NoEmail@darwinautomotive.com",
		dealerContact: "NoEmail@darwinautomotive.com",
		leads: "NoEmail@darwinautomotive.com",
		ebiz_dt_dealer_id_field: "Lender Dealer Id",
		submitted_file: partner_submit,
		dt_report_file: dt_report,
		live_ids: ebs_entries
	},
]

export function getPartnerConfig(partner: PartnerCodes) {
	let config = partnerConfigs.find(i => i.partner == partner);
	return config
}
