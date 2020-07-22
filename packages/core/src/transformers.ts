import { DTReportItem, DTReportItemSimple, EBSProvisionItem } from '@wf/interfaces';
import { PartnerCodes, getPartnerConfig } from '@wf/core'
import moment from 'moment'
import { partnerConfigs } from './partnerConfig';
/**
 * Used as an ORM layer for transforming various payloads into other formats
 */

/**
 * @param data Profile data from Dealertrack account
 * @param partnerCode - typeof, string representation of PartnerCodes enum type
 * @return Dealer info pre-formatted for Production Subscription
 */
export const asProdSubItem = (data: DTReportItem, partnerCode: PartnerCodes) => {
	return {
		'Partner ID': partnerCode,
		'Partner Dealer ID': data["Lender Dealer Id"],
		'DT Dealer ID': data["DealerTrack Id"],
		LegalName: data["Legal Name"],
		"DBA Name": data["DBA Name"],
		Street: data.Street,
		City: data.City,
		State: data.State,
		PostalCode: data.Zip,
		Phone: data["Phone No"],
		Fax: data["Fax No"] ? data["Fax No"] : '',
		Status: 'A',
		'DRS enrolled': `${moment().format('MM-DD-YYYY')}`
	}
}


export const asEbizItem = (data: DTReportItem, partnerCode: PartnerCodes) => {
	let config = getPartnerConfig(partnerCode);
	return {
		'Partner ID': partnerCode,
		'Partner Dealer ID': data["Lender Dealer Id"],
		'DT Dealer ID': data["DealerTrack Id"],
		'DNA ID': '',
		LegalName: data["Legal Name"],
		'DBA Name': data["DBA Name"],
		Street: data.Street,
		City: data.City,
		State: data.State,
		PostalCode: data.Zip,
		Phone: data["Phone No"],
		Fax: data["Fax No"] || '',
		Status: 'A',
		CRM: config.crm,
		"Dealership's Customer Contact Email": config.dealerContact,
		Leads: config.leads,
		"Ford LPS PA Code": '',
		'Urban Science Vendor Id': '',
		'Shift Digital Vendor Id': '',
		'Hide Videos': '',
		'Dealer Group': '',
		'Profile ID': '',
	}
}

export const asEbizPayload = (items: DTReportItem[], partnerCode: PartnerCodes) => {
	return items.map(i => asEbizItem(i, partnerCode))
}

export const asProdSubPayload = (items: DTReportItem[], partnerCode: PartnerCodes) => {
	return items.map(i => asProdSubItem(i, partnerCode))
}
