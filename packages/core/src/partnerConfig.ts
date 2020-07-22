export type PartnerCodes = "BOA" | "DRW"

export const partnerConfigs = [
	{
		partner: "BOA",
		crm: "NoReply@bankofamerica.com",
		dealerContact: "NoReply@bankofamerica.com",
		leads: "NoReply@bankofamerica.com"
	},
	{
		partner: "DRW",
		crm: "NoEmail@darwinautomotive.com",
		dealerContact: "NoEmail@darwinautomotive.com",
		leads: "NoEmail@darwinautomotive.com"
	},
]

export function getPartnerConfig(partner: PartnerCodes) {
	let config = partnerConfigs.find(i => i.partner == partner);
	return config
}
