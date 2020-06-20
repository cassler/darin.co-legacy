export interface IFDProvisioningData {
  'Partner ID': string // req
  'Partner Dealer ID': string | number | bigint // req
  'Created Date'?: string // req
  'FinanceDriver Status'?: string // req
  'Dealer Notification Email Address'?: string // needed
  'AdfEmailAddress'?: string // needed
}
