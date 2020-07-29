import { PartnerCode } from '@wf/types';

export interface EBSProvisionInput {
	'Partner ID': PartnerCode,
	'Partner Dealer ID': number | string | bigint,
	'DT Dealer ID': number,
	'Legal Name': string,
	'DBA Name': string,
	'Street': string,
	'City': string,
	'State': string,
	'PostalCode': string,
	'Phone': string,
	'Fax'?: string,	// string
	'Status': 'A' | 'I',
	'CRM': string,	// crm address
}

export interface EBSProvisionItem {
	"Partner ID": PartnerCode,
	"Partner Dealer ID": number | string | bigint,
	"DT Dealer ID": number,
	"DNA ID"?: string,
	"Legal Name": string,
	"DBA Name": string,
	"Street": string,
	"City": string,
	"State": string,
	"PostalCode": string,
	"Phone": string,
	"Fax": string,
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

