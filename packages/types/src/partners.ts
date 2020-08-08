export declare type PartnerCode = "BOA" | "DRW" | "CNZ" | "GOO" | "DAS"

export declare interface PartnerCodes {
	code: PartnerCode
}

export type EnrollmentPhase =
	"Password Issued" |
	"Prospect" |
	"Reactivate" |
	"Access Agreement Received" |
	"Not Contacted" | undefined | null


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



export interface BOAInventorySetupRequest {
	"Program Active Status": string,
	"Corporate Services Addendum Status": string,
	"Dealer Magellan_": bigint,
}

export type RequestBOA = {
	"Date Entered": string,
	"Client Manager Addendum Status": string,
	// Required to be "Completed"
	"Corporate Services Addendum Status": string,
	"Dealer Onboarded with DT Status"?: string,
	"Action needed by B of A"?: string,
	"Client Manager Name": string,
	"Client Manager Email Address": string,
	"Client Manager Phone Number": string,
	"Dealership Name": string,
	// Must be exactly 10 digits
	"Dealer Magellan #": string,
	"Dealer City": string,
	"Dealer State": string,
	"Dealer Contact First Name": string,
	"Dealer Contact Last Name": string,
	"Dealer Contact Email": string,
	"Dealer Contact Telephone": string,
	"Dealer Inventory Provider": string,
	"Dealer Email Address for Leads": string,
	// Must be 'Active'
	"Program Active Status": string,
	"Date Magellan Received Correct Addendum"?: string,
	"Dealer Info sent to DT": string,
	"Dealer Live Date"?: string,
	"Natl Acct Relationship Name"?: string,
	"Region": string,
	"Item Type": string,
	"Path": string,
}

export type RequestDRW = {
	"Partner ID": PartnerCode,
	"Partner Dealer ID": number | string | bigint,
	"DT Dealer ID": number,
	"DNA ID"?: string,
	"Legal Name": string,
	"DBA Name": string,
	"Street": string,
	"City": string,
	"State": string,
	"PostalCode": number | string,
	"Phone": number | string,
	"Fax": number | string,
	"Status": "A" | "I",
	"CRM": string,
	"Dealership's Customer Contact Email": string,
	"Leads": string,
	"Ford LPS PA Code": string,
	"Urban Science Vendor Id": string,
	"Shift Digital Vendor Id": string,
	"Hide Videos": string,
	"Dealer Groups": string,
	"Profile ID": string,
}

/**
 * Sandbox Typings for Standardized "Request" Item
 */

export interface Request {
	partner: PartnerCode,
	partnerID: number | string | bigint,
	active: boolean,
	original?: RequestBOA | RequestDRW
}

export interface Address {
	street: string,
	city: string,
	state: string,
	zip: string | number
}
