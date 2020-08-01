import { getJSONfromSpreadsheet } from '@wf/csv';
import { DTReportItem, PartnerCode } from '@wf/types';
import { partnerConfigInput, partnerConfigs } from './partnerConfig';


/**
 * Helper utils
 * @param partner
 */



export const getPartnerData = (config: partnerConfigInput, path: string = './src/data/') => {
	return {
		reference: getJSONfromSpreadsheet(path + config.dt_report_file) as DTReportItem[],
		submitted: getJSONfromSpreadsheet(path + config.submitted_file) as any[]
	}
}


interface IActivationRequest {
	partner: PartnerCode,
	config: partnerConfigInput,
	reference: DTReportItem[],
	item: any,
}
export function singleActivationRequest({ partner, config, reference, item }: IActivationRequest) {
	console.log('Submitted:', JSON.stringify(item).slice(0, 100))

	// shorthand for internal ID
	let partnerID = item[config.internal_id];
	// 1. does entry pass custom rules found in partner settings
	let meetsPartnerCriteria = config.custom_validation(item);
	// 2. does this have a dealertrack account
	let dealertrackAccount = reference.find(i => i["Lender Dealer Id"] === partnerID);
	let hasDealertrackAccount = dealertrackAccount ? true : false;
	// 3. does it have valid enrollment on that?
	let hasValidEnrollment = dealertrackAccount && config.valid_phases.includes(dealertrackAccount["Enrollment Phase"]);



	console.log('meets partnerCriteria', meetsPartnerCriteria)
	console.log('hasDT account?', hasDealertrackAccount)
	console.log('has Valid enrollment?', hasValidEnrollment)
}












