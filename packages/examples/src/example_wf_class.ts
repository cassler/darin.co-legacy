
import { Workflower, partnerConfigInput } from '@wf/core';
import { getJSONfromSpreadsheet } from '@wf/csv/src';
import { partner_settings } from './partner_settings';

export function wf_examples(options) {
	// let conf = partnerConfigs.find(i => i.partner = "BOA");
	// const result = new Workflower("BOA")
	let partner = "BOA";

	let opts = options as partnerConfigInput[]
	let config = opts.find(i => i.partner === "BOA");
	console.log(config.dt_report_file)
	console.log(process.cwd())
	let reference = getJSONfromSpreadsheet(config.dt_report_file);
	// console.log(reference)
	let requests = getJSONfromSpreadsheet(config.submitted_file);
	let excluded = config.live_ids;

	// console.log(reference.length, requests.length, excluded.length);

	let wf = new Workflower("BOA");
	console.log(wf.refData)


}

wf_examples(partner_settings)
