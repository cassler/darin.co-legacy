import { boa_ebs_aug5, boa_sf_aug5, sample_ebs_entries_boa, sample_ebs_entries_drw } from './exclude_sample';

export const settings = {
	drw: {
		partner: "DRW",
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
		reference_doc: 'https://coxautoinc.sharepoint.com/:w:/r/sites/LendingandTier1DigitalRetailing/_layouts/15/Doc.aspx?sourcedoc=%7B1CE6D145-6232-4183-9658-F98696769E5A%7D&file=How%20to%20Complete%20a%20CarNow%20Lender%20Project.docx&action=default&mobileredirect=true',
		generate: {
			fd: true,
			ebs: true,
			ps: true,
			info: true,
		},
		custom_validation: (item: any) => {
			return item.hasOwnProperty('Status') && item.Status === "A"
		},
	},
	boa: {
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
		submitted_file: "/Users/darin/Code/@workflower/packages/examples/src/data/shorter-as-csv-new.csv",
		// JSON of DT Business Report for partner
		dt_report_file: "/Users/darin/Code/@workflower/packages/examples/src/data/115b4b53-2907-4d9b-b917-9134ff44eed3.csv",
		// list of IDs live with service, any way you want
		live_ids: boa_ebs_aug5,
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
		custom_validation: (item: any) => {
			// console.log('validating', item)
			if (item["Corporate Services Addendum Status"] === null) {
				return false;
			}
			if (item["Program Active Status"] !== "Active") {
				return false
			}
			if (item["Corporate Services Addendum Status"] === "Completed") {
				return true;
			}
			return false;
		},
	}
}
