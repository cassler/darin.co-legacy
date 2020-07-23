
import { DTReportItem, DTReportItemSimple, EBSProvisionItem } from '@wf/interfaces';
/**
 * Input fields needed to generate a FinanceDriver entry
 */
export interface FDProvisionInput {
	'Partner ID': string // req
	'Partner Dealer ID': string | number | bigint // req
	'Created Date'?: string // req
	'FinanceDriver Status'?: string // req
	'Dealer Notification Email Address'?: string // needed
	'AdfEmailAddress'?: string // needed
}


/**
 * Iterate over entries in a Dealertrack report and provide feedback on various enrollment issues
 */
export interface ICheckEnrollmentStatusMessage {
	status: 'pass' | 'fail' | 'warning',
	dt?: number,
	partnerId?: number | bigint | string,
	title: string,
	message?: string,
	include: boolean
}
