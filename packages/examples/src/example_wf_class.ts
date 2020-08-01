
import { Workflower, partnerConfigInput } from '@wf/core';
import { getJSONfromSpreadsheet } from '@wf/csv/src';
import { DTReportItem } from '@wf/types';
import { partner_settings } from './partner_settings';


export function wf_examples(partner, options) {
	// let conf = partnerConfigs.find(i => i.partner = "BOA");
	// const result = new Workflower("BOA")
	// let partner = "BOA";

	let opts = options as partnerConfigInput[]
	let config = opts.find(i => i.partner === partner);


	console.log()
	let reference = getJSONfromSpreadsheet(config.dt_report_file);
	let requests = getJSONfromSpreadsheet(config.submitted_file);
	let excluded = config.live_ids;



	// console.log(reference.length, requests.length, excluded.length);
	// let settings = partner_settings;
	// console.log(settings);

	let wf = new Workflower("BOA", config, requests, reference);

	console.log(wf.notedResults)
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

wf_examples("BOA", partner_settings)
