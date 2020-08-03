
import { Workflower, partnerConfigInput } from '@wf/core';
import { getJSONfromSpreadsheet } from '@wf/csv'; // Utility for easy file handling
import { PartnerCode } from '@wf/types';
// This is our configurations file where aspects of the implementations are described
const partner_settings = require('./partner_settings');

/**
 * Example usage of Workflower
 *
 * Read through the array of partners to find that matching entry
 * */
export function wf_examples(partner, options) {

	// Allow entire sdt of partner configs to be passed,
	// but narrow down that set to the one we want.
	let config = options.find(i => i.partner === partner);

	// To be passed into our new Workflower instance.
	let props = {
		partner, // "BOA"
		config, // see partner_settings.ts
		requested: getJSONfromSpreadsheet(config.submitted_file), // JSON of local file indicated
		reference: getJSONfromSpreadsheet(config.dt_report_file) // JSON of local file indicated
	}

	// Create a new instance of a Workflower
	// @ref core/workflower
	let wf = new Workflower(props);

	// Show off some of the goods - find account with partner ID of 3422
	console.log(wf.query(3422))

	// console.log(wf.explanation)
	console.log(wf.query(3406))

	// find some matches this way
	console.log(wf.query('Volvo'))

	// what are the settings?
	console.log(wf.config.reference_doc)

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

}

wf_examples("DRW", partner_settings)
