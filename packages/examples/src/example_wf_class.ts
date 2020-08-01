
import { Workflower, partnerConfigInput } from '@wf/core';
import { getJSONfromSpreadsheet } from '@wf/csv/src';
import { DTReportItem } from '@wf/types';
import { partner_settings } from './partner_settings';

type DTReport = {
	data: DTReportItem[]
}
export function wf_examples(partner, options) {
	// let conf = partnerConfigs.find(i => i.partner = "BOA");
	// const result = new Workflower("BOA")
	// let partner = "BOA";

	let opts = options as partnerConfigInput[]
	let config = opts.find(i => i.partner === partner);


	console.log(process.cwd())
	let reference = getJSONfromSpreadsheet(config.dt_report_file);
	let requests = getJSONfromSpreadsheet(config.submitted_file);
	let excluded = config.live_ids;



	console.log(reference.length, requests.length, excluded.length);
	// let settings = partner_settings;
	// console.log(settings);

	let wf = new Workflower("BOA", config, requests, reference);
	// console.log(wf.findAccount(4042214418))
	console.log(wf.howMany, wf.provisioning.eBizUpload.length)
	console.log(wf.explanation)
}

wf_examples("BOA", partner_settings)
