export type PartnerCode = "BOA" | "DRW" | "CNZ" | "GOO" | "DAS"

export interface PartnerCodes {
	code: PartnerCode
}

// BOA Inventory Setup Log


export interface BOAInventorySetupRequest {
	"Program Active Status": string,
	"Corporate Services Addendum Status": string,
	"Dealer Magellan_": bigint,
}

export interface RequestBOA {
	"Date Entered": string,
	"Client Manager Addendum Status": string,
	"Corporate Services Addendum Status": string,
	"Dealer Onboarded with DT Status"?: string,
	"Action needed by B of A"?: string,
	"Client Manager Name": string,
	"Client Manager Email Address": string,
	"Client Manager Phone Number": string,
	"Dealership Name": string,
	"Dealer Magellan #": bigint,
	"Dealer City": string,
	"Dealer State": string,
	"Dealer Contact First Name": string,
	"Dealer Contact Last Name": string,
	"Dealer Contact Email": string,
	"Dealer Contact Telephone": string,
	"Dealer Inventory Provider": string,
	"Dealer Email Address for Leads": string,
	"Program Active Status": string,
	"Date Magellan Received Correct Addendum"?: string,
	"Dealer Info sent to DT": string,
	"Dealer Live Date"?: string,
	"Natl Acct Relationship Name"?: string,
	"Region": string,
	"Item Type": string,
	"Path": string,
}

export interface RequestDRW {
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
