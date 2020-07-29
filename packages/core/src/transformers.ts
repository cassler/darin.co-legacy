import { DTReportItem, PartnerCode, ProdSubItem } from '@wf/types';
import { getPartnerConfig } from '@wf/core'
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
export const asProdSubItem = (data: DTReportItem, partnerCode: PartnerCode): ProdSubItem => {
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


export const asEbizItem = (data: DTReportItem, partnerCode: PartnerCode) => {
	let config = getPartnerConfig(partnerCode);
	return {
		'Partner ID': partnerCode,
		'Partner Dealer ID': data["Lender Dealer Id"],
		'DT Dealer ID': data[config.ebiz_dt_dealer_id_field],
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

export const asFinanceDriverItem = (data: DTReportItem, partnerCode: PartnerCode) => {
	let config = getPartnerConfig(partnerCode);
	return {
		'Partner ID': partnerCode,
		'Partner Dealer ID': data["Lender Dealer Id"], // req
		'Created Date': moment().format('L'), // req
		'Modified Date': moment().format('L'),
		'FinanceDriver Status': 'A',
		'PaymentDriver Status': '',
		'FinanceDriver Bureau': '',
		'FinanceDriver Credit Score': '',
		'FinanceDriver Years at Job': '',
		'FinanceDriver Annual Income': '',
		'FinanceDriver Total Bankruptcies': '',
		'FinanceDriver Total Sats Tradelines': '',
		'Buy Rate Markup': '',
		'Dealer Notification Email Address': config.dealerContact,
		'AdfEmailAddress': config.crm,
		'PDNewQuotePreference': '',
		'PDNewRetailReserveType': '',
		'PDNewRetailReserve': '',
		'PDNewLeaseReserveType': '',
		'PDNewLeaseReserve': '',
		'PDUsedQuotePreference': '',
		'PDUsedRetailReserveType': '',
		'PDUsedRetailReserve': '',
		'PDCertifiedQuotePreference': '',
		'PDCertifiedRetailReserveType': '',
		'PDCertifiedRetailReserve': '',
		'PDUseExistingLenders': '',
		'PDCaptiveLendersForMakes': '',
		'PDLendersAdd': 'Y',
		'PDLendersRemove': '',
		'PDIncludeDealerContribution': '',
		'PDDealerContributionMakesAdd': '',
		'PDDealerContributionMakesRemove': '',
		'PDDealerContributionCategory': '',
		'DealerFee1Type': '',
		'DealerFee1Name': '',
		'DealerFee1AmountLease': '',
		'DealerFee1AmountFinance': '',
		'DueAtSigning1': '',
		'DealerFee2Type': '',
		'DealerFee2Name': '',
		'DealerFee2AmountLease': '',
		'DealerFee2AmountFinance': '',
		'DueAtSigning2': '',
		'DealerFee3Type': '',
		'DealerFee3Name': '',
		'DealerFee3AmountLease': '',
		'DealerFee3AmountFinance': '',
		'DueAtSigning3': '',
		'Partner Defined Field 1': '',
		'Partner Defined Field 2': '',
		'Partner Defined Field 3': '',
		'Partner Defined Field 4': '',
		'Partner Defined Field 5': '',
		'Partner Defined Field 6': '',
		'Partner Defined Field 7': '',
		'Status': '',
	}
}

export const asEbizPayload = (items: DTReportItem[], partnerCode: PartnerCode) => {
	return items.map(i => asEbizItem(i, partnerCode))
}

export const asProdSubPayload = (items: DTReportItem[], partnerCode: PartnerCode) => {
	return items.map(i => asProdSubItem(i, partnerCode))
}

export const asFinanceDriverPayload = (items: DTReportItem[], partnerCode: PartnerCode) => {
	return items.map(i => asFinanceDriverItem(i, partnerCode))
}
