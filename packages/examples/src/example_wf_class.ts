
import { Workflower, partnerConfigInput } from '@wf/core';
import { getJSONfromSpreadsheet } from '@wf/csv/src'; // Utility for easy file handling
import { PartnerCode } from '@wf/types/src';
/**
 * @name Example_1
 *
 *
 */
// This is our configurations file where aspects of the implementations are described
const partner_settings = require('./partner_settings');


export function wf_examples(partner, options) {


	// Read through the array of partners to find that matching entry
	let config = options.find(i => i.partner === partner);
	// let opts = options as partnerConfigInput[]

	let props = {
		partner,
		config,
		requested: getJSONfromSpreadsheet(config.submitted_file),
		reference: getJSONfromSpreadsheet(config.dt_report_file)
	}

	// Create a new instance of a Workflower
	// @ref core/workflower
	let wf = new Workflower(props);

	// Show off some of the goods.
	console.log(wf.query(3422))

	// Provide some top-level insights
	console.dir({
		partner: partner,
		dt_file: wf.config.dt_report_file,
		requests_file: wf.config.submitted_file,
		ebiz_profile: wf.config.ebiz_profile,
		live_count: wf.config.live_ids.length,
		new_items: wf.howMany,
		generated_files: {
			ebiz_upload: wf.provisioning.eBizUpload.length,
			finance_driver_config: wf.provisioning.financeDriverUpload.length,
			product_subscription: wf.provisioning.prodSubAttachment.length,
		}
	})

	// console.log(wf.explanation)
	console.log(wf.query(3406))

	// find some matches this way
	console.log(wf.query('Volvo'))

}

wf_examples("DRW", partner_settings)
