import { IFDProvisioningData } from './IFDProvisioningData'

/**
 * @name FinanceDriverProvisionFile
 * @description Format used to generate CSV files for uploading into
 * Finance Driver for provisioning of account-level settings.
 * @keywords ["csv","finance-driver","provisioning"]
 */

export interface IFDProvisioningFile extends IFDProvisioningData {
  'Partner ID': string // req
  'Partner Dealer ID': string | number | bigint // req
  'Created Date'?: string // req
  'Modified Date'?: string
  'FinanceDriver Status'?: string // req
  'PaymentDriver Status'?: string
  'FinanceDriver Bureau'?: string
  'FinanceDriver Credit Score'?: string
  'FinanceDriver Years at Job'?: string
  'FinanceDriver Annual Income'?: string
  'FinanceDriver Total Bankruptcies'?: string
  'FinanceDriver Total Sats Tradelines'?: string
  'Buy Rate Markup'?: string
  'Dealer Notification Email Address'?: string // needed
  'AdfEmailAddress'?: string // needed
  'PDNewQuotePreference'?: string
  'PDNewRetailReserveType'?: string
  'PDNewRetailReserve'?: string
  'PDNewLeaseReserveType'?: string
  'PDNewLeaseReserve'?: string
  'PDUsedQuotePreference'?: string
  'PDUsedRetailReserveType'?: string
  'PDUsedRetailReserve'?: string
  'PDCertifiedQuotePreference'?: string
  'PDCertifiedRetailReserveType'?: string
  'PDCertifiedRetailReserve'?: string
  'PDUseExistingLenders'?: string
  'PDCaptiveLendersForMakes'?: string
  'PDLendersAdd'?: string // equals Y
  'PDLendersRemove'?: string
  'PDIncludeDealerContribution'?: string
  'PDDealerContributionMakesAdd'?: string
  'PDDealerContributionMakesRemove'?: string
  'PDDealerContributionCategory'?: string
  'DealerFee1Type'?: string
  'DealerFee1Name'?: string
  'DealerFee1AmountLease'?: string
  'DealerFee1AmountFinance'?: string
  'DueAtSigning1'?: string
  'DealerFee2Type'?: string
  'DealerFee2Name'?: string
  'DealerFee2AmountLease'?: string
  'DealerFee2AmountFinance'?: string
  'DueAtSigning2'?: string
  'DealerFee3Type'?: string
  'DealerFee3Name'?: string
  'DealerFee3AmountLease'?: string
  'DealerFee3AmountFinance'?: string
  'DueAtSigning3'?: string
  'Partner Defined Field 1'?: string
  'Partner Defined Field 2'?: string
  'Partner Defined Field 3'?: string
  'Partner Defined Field 4'?: string
  'Partner Defined Field 5'?: string
  'Partner Defined Field 6'?: string
  'Partner Defined Field 7'?: string
  'Status'?: string
}
