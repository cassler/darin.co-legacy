import { boa_ebs_aug5, boa_sf_aug17, sample_ebs_entries_boa, sample_ebs_entries_drw } from './exclude_sample';
import { partnerConfigInput } from '@wf/types';

interface partnerSettingsList {
	[key: string]: partnerConfigInput,
}


export const settings: partnerSettingsList = {
	haz: {
		partner: "HAZ",
		partner_name: "FCA / Carzato",
		crm: "noreply@carzato.com ",
		dealerContact: "noreply@carzato.com",
		leads: "noreply@carzato.com",
		internal_id: "PID",
		ebiz_dt_dealer_id_field: "Partner Dealer Id",
		submitted_file: "/Users/darin/Code/@workflower/packages/examples/src/data/custom_pid_request.csv",
		dt_report_file: "/Users/darin/Code/@workflower/packages/examples/src/data/c8bf95f1-b4d8-486d-ad1b-3c4f0e6b69a6.csv",
		live_ids: sample_ebs_entries_drw,
		ebiz_profile: 7531215,
		valid_phases: ["Password Issued", "Reactivate", "Access Agreement Received"],
		reference_doc: '#',
		generate: {
			fd: false,
			ebs: true,
			ps: true,
			info: true,
		},
		custom_validation: (item: any) => {
			return true
		},
	},
	drw: {
		partner: "DRW",
		partner_name: "Darwin Automotive",
		crm: "NoEmail@darwinautomotive.com",
		dealerContact: "NoEmail@darwinautomotive.com",
		leads: "NoEmail@darwinautomotive.com",
		internal_id: "Partner Dealer ID",
		ebiz_dt_dealer_id_field: "Lender Dealer Id",
		submitted_file: "/Users/darin/Code/@workflower/packages/examples/src/data/Digital_Retail_Suite_Dealer_File-DRW(4).csv",
		dt_report_file: "/Users/darin/Code/@workflower/packages/examples/src/data/c8bf95f1-b4d8-486d-ad1b-3c4f0e6b69a6.csv",
		live_ids: sample_ebs_entries_drw,
		ebiz_profile: 7531215,
		valid_phases: ["Password Issued", "Prospect", "Reactivate", "Access Agreement Received"],
		reference_doc: 'https://coxautoinc.sharepoint.com/:w:/r/sites/LendingandTier1DigitalRetailing/_layouts/15/Doc.aspx?sourcedoc=%7B9BE357C4-0649-4363-82E8-AA5BA03308FF%7D&file=How%20to%20Complete%20a%20Darwin%20Lender%20Project.docx&action=default&mobileredirect=true',
		generate: {
			fd: true,
			ebs: true,
			ps: true,
			info: true,
		},
		custom_validation: (item: any) => {
			return item && item.hasOwnProperty('Status') && item.Status === "A";
		},
	},
	boa: {
		// identify settings and fill certain fields
		partner: "BOA",
		partner_name: "Bank of America",
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
		submitted_file: "/Users/darin/Code/@workflower/packages/examples/src/data/shorter-as-csv-new.csv",
		// JSON of DT Business Report for partner
		dt_report_file: "/Users/darin/Code/@workflower/packages/examples/src/data/115b4b53-2907-4d9b-b917-9134ff44eed3.csv",
		// list of IDs live with service, any way you want
		live_ids: boa_sf_aug17,
		ebiz_profile: 5860435,
		// Enrollment Phases to Accept
		valid_phases: ["Password Issued", "Prospect", "Reactivate", "Access Agreement Received"],
		generate: {
			fd: true,
			ebs: true,
			ps: true,
			info: true,
		},
		reference_doc: 'https://coxautoinc.sharepoint.com/:w:/r/sites/LendingandTier1DigitalRetailing/_layouts/15/Doc.aspx?sourcedoc=%7B5B2EA0D8-9785-440F-92CA-EA5818FDB0A6%7D&file=How%20to%20Complete%20a%20Bank%20of%20America%20Lender%20Project.docx&action=default&mobileredirect=true',
		// extra tests to be performed like checking "Program Active Status"
		custom_validation: (item: any) => {
			// console.log('validating', item)
			if (item["Corporate Services Addendum Status"] === null) {
				return false;
			}
			if (item["Program Active Status"] !== "Active") {
				return false
			}
			if (item["Corporate Services Addendum Status"] === "Completed" || "Completed - RT1") {
				return true;
			}
			return false;
		},
	}
}
