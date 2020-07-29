import { PartnerCode } from '@wf/types';

export interface ProdSubItem {
	'Partner ID': PartnerCode,
	'Partner Dealer ID': string | bigint | number,
	'DT Dealer ID': number,
	LegalName: string,
	"DBA Name": string,
	Street: string,
	City: string,
	State: string,
	PostalCode: number | string,
	Phone: number | string,
	Fax: number | string,
	Status: string,
	'DRS enrolled': string
}
