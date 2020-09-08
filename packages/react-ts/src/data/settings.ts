import { boa_sf_aug17, sample_ebs_entries_drw } from './exclude_sample';
import { partnerConfigInput } from '@wf/types';

interface partnerSettingsList {
	[key: string]: partnerConfigInput,
}


export const settings: partnerSettingsList = {
	cnz: {
		partner: "CNZ",
		partner_name: "CarNow",
		crm: "noreply@carnow.com ",
		dealerContact: "noreply@carnow.com",
		leads: "corinne@carnow.com",
		internal_id: "PID",
		ebiz_dt_dealer_id_field: "partnerID",
		submitted_file: "/Users/darin/Code/@workflower/packages/examples/src/data/custom_pid_request.csv",
		dt_report_file: "/Users/darin/Code/@workflower/packages/examples/src/data/c8bf95f1-b4d8-486d-ad1b-3c4f0e6b69a6.csv",
		live_ids: sample_ebs_entries_drw,
		ebiz_profile: 6897540,
		valid_phases: ["Password Issued", "Reactivate", "Access Agreement Received"],
		reference_doc: 'https://coxautoinc.sharepoint.com/:w:/r/sites/LendingandTier1DigitalRetailing/_layouts/15/Doc.aspx?sourcedoc=%7B1CE6D145-6232-4183-9658-F98696769E5A%7D&file=How%20to%20Complete%20a%20CarNow%20Lender%20Project.docx&action=default&mobileredirect=true',
		generate: {
			fd: true,
			ebs: true,
			ps: true,
			info: true,
		},
		custom_validation: (item: any) => {
			return true
		},
		report_validation: (items: object[]): boolean => {
			return items.length < 1000 && items[0]['Lender Dealer Id'].toString().length === 6
		},
		prodSubTemplate: {
			subject: 'Activate Digital Service for CarNow Inc 0001148792',
			content: [
				'CarNow Inc(CNZ)',
				'Please activate Digital data service for CarNow Inc  0001148792',
				'',
				' - Billing Date: Activation Date',
				'',
				' - New Method:',
				'DRSFDCBD $0 monthly – automatically bill out of SAP',
				'CBDDSSET as a OTC of $75 per store',
				'',
				'Bill to/ Sold to and Payer is: CarNow Inc  0001148792',
				'',
				'CarNow Inc',
				'2 Clement road',
				'Hanover, NH 03755',
				'United States',
				'',
				'Ship to Dealer(s) attached',
			]
		}
	},
	haz: {
		partner: "HAZ",
		partner_name: "FCA / Carzato",
		crm: "noreply@carzato.com ",
		dealerContact: "noreply@carzato.com",
		leads: "noreply@carzato.com",
		internal_id: "PID",
		ebiz_dt_dealer_id_field: "partnerID",
		submitted_file: "/Users/darin/Code/@workflower/packages/examples/src/data/custom_pid_request.csv",
		dt_report_file: "/Users/darin/Code/@workflower/packages/examples/src/data/c8bf95f1-b4d8-486d-ad1b-3c4f0e6b69a6.csv",
		live_ids: sample_ebs_entries_drw,
		ebiz_profile: 7838514,
		valid_phases: ["Password Issued", "Reactivate", "Access Agreement Received"],
		reference_doc: 'https://coxautoinc.sharepoint.com/:w:/r/sites/LendingandTier1DigitalRetailing/_layouts/15/Doc.aspx?sourcedoc=%7BDDAB5CCB-8392-4B8C-9ADF-F156603A4D22%7D&file=Instructions%20for%20Completing%20FCA%20(Carzato).docx&action=default&mobileredirect=true',
		generate: {
			fd: false,
			ebs: true,
			ps: true,
			info: true,
		},
		report_validation: (item: any) => {
			return true
		},
		custom_validation: (item: any) => {
			return true
		},
	},
	das: {
		partner: "DAS",
		partner_name: "Digital Air Strike",
		crm: "NoReply@DAS.com",
		dealerContact: "NoReply@DAS.com",
		leads: "NoReply@DAS.com",
		internal_id: "Partner Dealer ID",
		ebiz_dt_dealer_id_field: "partnerID",
		submitted_file: "/",
		dt_report_file: "/",
		live_ids: sample_ebs_entries_drw,
		ebiz_profile: 2390475,
		valid_phases: ["Password Issued", "Reactivate", "Access Agreement Received"],
		reference_doc: 'https://coxautoinc.sharepoint.com/:w:/r/sites/LendingandTier1DigitalRetailing/_layouts/15/Doc.aspx?sourcedoc=%7BDFE66E3B-6406-4B9A-A95D-E1390AD70F25%7D&file=How%20to%20Complete%20a%20Digital%20Airstrike%20(%20DAS%20)%20Project.docx&action=default&mobileredirect=true&cid=db749db7-30c6-4234-b30f-a4c166ebbc3e',
		generate: {
			fd: true,
			ebs: true,
			ps: true,
			info: true,
		},
		report_validation: (items: object[]): boolean => {
			return items.length < 1000 && items[0]['Lender Dealer Id'].toString().length === 6
		},
		custom_validation: (item: any) => {
			// return item && item.hasOwnProperty('Status') && item.Status === "A";
			return true
		},
		prodSubTemplate: {
			subject: 'Activate Digital Data service for Digital Air Strike SAP : 1097799',
			content: [
				'DIGITAL AIRSTRIKE (DAS)',
				'',
				'Please activate Digital data service for Digital Airstrike  1097799',
				'',
				'Billing Date: Activation / Install date',
				'AMOUNT: $0 monthly, they are billed manually for now',
				'',
				'New Method:',
				'DRSPDCBD at $0',
				'CBDDSSET as a OTC of $50 per store',
				'',
				'INSTALL FEE AND SAP CODE and AMOUNT OTC',
				'Bill to / Sold to and Payer is: Digital Airstrike  4024962',
				'',
				'Ship to Dealer(s): attached',
			]
		}
	},
	drw: {
		partner: "DRW",
		partner_name: "Darwin Automotive",
		crm: "NoEmail@darwinautomotive.com",
		dealerContact: "NoEmail@darwinautomotive.com",
		leads: "NoEmail@darwinautomotive.com",
		internal_id: "Partner Dealer ID",
		ebiz_dt_dealer_id_field: "partnerID",
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
		report_validation: (items: object[]): boolean => {
			let count = items.length;
			return items.length < 1000 && items[Math.floor(count / 2)]['Lender Dealer Id'].toString().length === 4
		},
		custom_validation: (item: any) => {
			// return item && item.hasOwnProperty('Status') && item.Status === "A";
			return true
		},
		prodSubTemplate: {
			subject: 'Activate Digital Data service for Darwin Automotive 1155065',
			content: [
				'Darwin Automotive(DRW)',
				'',
				'Please activate Digital Data service for Darwin Automotive 1155065',
				'',
				'Billing Date: is day it is activated/ installed',
				'',
				'AMOUNT: $0 monthly, they are billed manually for now',
				'',
				'New Method:',
				'',
				'DRSFDCBD  at $0',
				'DRSFDI as a OTC of $0',
				'',
				'Bill to/ Sold to and Payer is:',
				'',
				'Darwin Automotive',
				'517 US Route 1 South Suite 2210',
				'Iselin, NJ 08830',
				'',
				'Ship to Dealer(s): attached',
			]
		}
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
		ebiz_dt_dealer_id_field: "dealertrackID",
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
		prodSubTemplate: {
			subject: 'Activate Digital Service for Bank of America SAP : 1034975',
			content: [
				'Bank of America (BOA)',
				'Please activate Digital data service for Bank of America SAP : 1034975',
				'Billing Date: activation date',
				'',
				'AMOUNT: $0 monthly, they are billed manually for now',
				'New Method: ',
				'CBDSUITE',
				'CBDSUITESET OTC of $ 100 per stores',
				'',
				'Bill to / sold to and Payer is: Bank of America: SAP : 1034975',
				'',
				'Bank of America',
				'9000 Southside Blvd FL',
				'9-200-05-04',
				'Jacksonville, Florida 32256',
				'United States'
			]
		},
		report_validation: (items: object[]): boolean => {
			return items.length > 5000 && items[0]['Lender Dealer Id'].toString().length === 10
		},
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
