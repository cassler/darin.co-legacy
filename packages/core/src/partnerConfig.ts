import { PartnerCode, RequestBOA, RequestDRW } from '@wf/types';
import { EBSProvisionItem, DTReportItem, BOAInventorySetupRequest } from '@wf/types'

import {
	sample_dt_report_drw as dt_report,
	real_drw_submit as partner_submit,
	sample_ebs_entries_drw as ebs_entries,
	sample_ebs_entries_boa as boa_entries,
} from "@wf/sample-data";

export const getPartnerConfig = (partner: PartnerCode) => {
	let config = partnerConfigs.find(i => i.partner == partner);
	return config
}

export interface partnerConfigInput {
	partner: PartnerCode,
	crm: string,
	dealerContact: string,
	internal_id: string,
	leads: string,
	ebiz_dt_dealer_id_field: string,
	submitted_file: string,
	dt_report_file: string,
	live_ids: any[],
	valid_phases: string[],
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

export const partnerConfigs: partnerConfigInput[] = [
	{
		// identify settings and fill certain fields
		partner: "BOA",
		// ebiz profile entry
		crm: "NoReply@bankofamerica.com",
		// ebiz profile entry
		dealerContact: "NoReply@bankofamerica.com",
		// ebiz profile entry
		internal_id: "Dealer Magellan #",
		// name of ID used internally by partner
		leads: "NoReply@bankofamerica.com",
		// value used for eBiz profile "DT Dealer ID"
		ebiz_dt_dealer_id_field: "DealerTrack Id",
		// JSON of file submission from this partner
		submitted_file: "shorter-as-csv-new.csv",
		// JSON of DT Business Report for partner
		dt_report_file: "115b4b53-2907-4d9b-b917-9134ff44eed3.csv",
		// list of IDs live with service, any way you want
		live_ids: boa_entries,
		ebiz_profile: 5860435,
		// Enrollment Phases to Accept
		valid_phases: ["Password Issued", "Prospect", "Reactivate", "Access Agreement Received"],
		generate: {
			fd: true,
			ebs: true,
			ps: true,
			info: true,
		},
		reference_doc: 'https://coxautoinc.sharepoint.com/:w:/r/sites/LendingandTier1DigitalRetailing/_layouts/15/Doc.aspx?sourcedoc=%7B1CE6D145-6232-4183-9658-F98696769E5A%7D&file=How%20to%20Complete%20a%20CarNow%20Lender%20Project.docx&action=default&mobileredirect=true',
		// extra tests to be performed like checking "Program Active Status"
		custom_validation: (item: RequestBOA) => {
			// console.log('validating', item)
			return (
				item["Program Active Status"] === "Active" &&
				// item["Corporate Services Addendum Status"].includes("Completed")
				item["Corporate Services Addendum Status"] === ("Completed")
			)
		},
	},
	{
		partner: "DRW",
		crm: "NoEmail@darwinautomotive.com",
		dealerContact: "NoEmail@darwinautomotive.com",
		leads: "NoEmail@darwinautomotive.com",
		internal_id: "Partner Dealer ID",
		ebiz_dt_dealer_id_field: "Lender Dealer Id",
		submitted_file: "Digital_Retail_Suite_Dealer_File-DRW(4).csv",
		dt_report_file: "c8bf95f1-b4d8-486d-ad1b-3c4f0e6b69a6.csv",
		live_ids: ebs_entries,
		ebiz_profile: 7531215,
		valid_phases: ["Password Issued", "Prospect", "Reactivate", "Access Agreement Received"],
		reference_doc: 'https://coxautoinc.sharepoint.com/:w:/r/sites/LendingandTier1DigitalRetailing/_layouts/15/Doc.aspx?sourcedoc=%7B1CE6D145-6232-4183-9658-F98696769E5A%7D&file=How%20to%20Complete%20a%20CarNow%20Lender%20Project.docx&action=default&mobileredirect=true',
		generate: {
			fd: true,
			ebs: true,
			ps: true,
			info: true,
		},
		custom_validation: (item: RequestDRW) => {
			return (
				item.Status === "A"
			)
		},
	},
	{
		partner: "CNZ",
		crm: "noreply@carnow.com",
		dealerContact: "noreply@carnow.com",
		leads: "corinne@carnow.com",
		internal_id: "Partner Dealer ID",
		ebiz_dt_dealer_id_field: "Lender Dealer Id",
		submitted_file: "ids_from_cases_placeholder.csv",
		dt_report_file: "dt_report_placeholder.csv",
		ebiz_profile: 6897540,
		live_ids: ebs_entries, // 6897540
		valid_phases: ["Password Issued", "Prospect", "Reactivate", "Access Agreement Received"],
		reference_doc: 'https://coxautoinc.sharepoint.com/:w:/r/sites/LendingandTier1DigitalRetailing/_layouts/15/Doc.aspx?sourcedoc=%7B1CE6D145-6232-4183-9658-F98696769E5A%7D&file=How%20to%20Complete%20a%20CarNow%20Lender%20Project.docx&action=default&mobileredirect=true',
		generate: {
			fd: true,
			ebs: true,
			ps: true,
			info: true,
		},
		custom_validation: () => { },
	},
	{
		partner: "GOO",
		crm: "provided_in_case",
		dealerContact: "provided_in_case",
		leads: "gvrenrollment@gubagoo.com",
		internal_id: "Partner Dealer ID",
		ebiz_dt_dealer_id_field: "Lender Dealer Id",
		submitted_file: "ids_from_cases_placeholder.csv",
		dt_report_file: "dt_report_placeholder.csv",
		ebiz_profile: 0,
		live_ids: ebs_entries, // 6897540
		valid_phases: ["Password Issued", "Prospect", "Reactivate", "Access Agreement Received"],
		reference_doc: 'https://coxautoinc.sharepoint.com/:w:/r/sites/LendingandTier1DigitalRetailing/_layouts/15/Doc.aspx?sourcedoc=%7B7B6A972E-72BD-433A-A24E-339B2483139D%7D&file=How%20to%20Complete%20a%20Gubagoo%20Lender%20Project.docx&action=default&mobileredirect=true',
		generate: {
			fd: true,
			ebs: false,
			ps: true,
			info: true,
		},
		custom_validation: () => { },
	},
	{
		partner: "DAS",
		crm: "noreply@das.com",
		dealerContact: "noreply@das.com",
		leads: "noreply@das.com",
		internal_id: "Partner Dealer ID",
		ebiz_dt_dealer_id_field: "Lender Dealer Id",
		submitted_file: "ids_from_cases_placeholder.csv",
		dt_report_file: "dt_report_placeholder.csv",
		ebiz_profile: 2390475,
		live_ids: ebs_entries, // 6897540
		valid_phases: ["Password Issued", "Prospect", "Reactivate", "Access Agreement Received"],
		reference_doc: 'https://coxautoinc.sharepoint.com/:w:/r/sites/LendingandTier1DigitalRetailing/_layouts/15/Doc.aspx?sourcedoc=%7BDFE66E3B-6406-4B9A-A95D-E1390AD70F25%7D&file=How%20to%20Complete%20a%20Digital%20Airstrike%20(%20DAS%20)%20Project.docx&action=default&mobileredirect=true',
		generate: {
			fd: true,
			ebs: true,
			ps: true,
			info: true,
		},
		custom_validation: () => { },
	},
]



