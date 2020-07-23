export type PartnerCodes = "BOA" | "DRW"
import { EBSProvisionItem, DTReportItem } from '@wf/interfaces'

import {
	sample_dt_report_drw as dt_report,
	real_drw_submit as partner_submit,
	sample_ebs_entries_drw as ebs_entries,
} from "@wf/sample-data";

export interface partnerConfigInput {
	partner: string,
	crm: string,
	dealerContact: string,
	internal_id: string,
	leads: string,
	ebiz_dt_dealer_id_field: string,
	submitted_file: string,
	dt_report_file: string,
	live_ids: number[],
	valid_phases: string[],
	custom_validation: Function,
}

export const partnerConfigs: partnerConfigInput[] = [
	{
		// identify settings and fill certain fields
		partner: "BOA",
		// ebiz profile entry
		crm: "NoReply@bankofamerica.com",
		// ebiz profile entry
		dealerContact: "NoReply@bankofamerica.com",
		// ebiz profile entry
		internal_id: "dealer_magellan_",
		// name of ID used internally by partner
		leads: "NoReply@bankofamerica.com",
		// value used for eBiz profile "DT Dealer ID"
		ebiz_dt_dealer_id_field: "DealerTrack Id",
		// JSON of file submission from this partner
		submitted_file: "Full Inventory Setup Log Friday 7.17.2020.xlsx",
		// JSON of DT Business Report for partner
		dt_report_file: "report1594649681795.csv",
		// list of IDs live with service, any way you want
		live_ids: ebs_entries,
		// Enrollment Phases to Accept
		valid_phases: ["Password Issued", "Prospect", "Reactivate", "Access Agreement Received"],
		// extra tests to be performed like checking "Program Active Status"
		custom_validation: () => { },
	},
	{
		partner: "DRW",
		crm: "NoEmail@darwinautomotive.com",
		dealerContact: "NoEmail@darwinautomotive.com",
		leads: "NoEmail@darwinautomotive.com",
		internal_id: "Partner Dealer ID",
		ebiz_dt_dealer_id_field: "Lender Dealer Id",
		submitted_file: "Digital_Retail_Suite_Dealer_File-DRW(4).csv",
		dt_report_file: "93509abd-7783-4274-9d52-a068c52afe98.csv",
		live_ids: ebs_entries,
		valid_phases: ["Password Issued", "Prospect", "Reactivate", "Access Agreement Received"],
		custom_validation: () => { },
	},
]

export function getPartnerConfig(partner: PartnerCodes): partnerConfigInput {
	let config = partnerConfigs.find(i => i.partner == partner);
	return config
}
