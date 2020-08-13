
import { Workflower, Workflower2 } from '@wf/core';
import { getJSONfromSpreadsheet } from '@wf/csv'; // Utility for easy file handling
import { partner_settings } from './partner_settings';
// This is our configurations file where aspects of the implementations are described

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
		partnerCode: partner, // "BOA"
		options: config, // see partner_settings.ts
		requested: getJSONfromSpreadsheet(config.submitted_file), // JSON of local file indicated
		reference: getJSONfromSpreadsheet(config.dt_report_file) // JSON of local file indicated
	}

	// Create a new instance of a Workflower
	// @ref core/workflower
	let wf = new Workflower(props);
	let wf2 = new Workflower2(props)
	// Show off some of the goods - find account with partner ID of 3422
	console.log(wf.query(3422))

	wf.streamData(console.log)

}

wf_examples("BOA", partner_settings)
