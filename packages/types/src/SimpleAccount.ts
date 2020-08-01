import { DTReportItem } from '@wf/types';

export interface SimpleAccount {
	dealertrackID: number,
	partnerID: number | string | bigint,
	enrollment: string,
	dbaName: string,
	legalName: string,
	street?: string,
	city?: string,
	state?: string,
	zip?: string,
	phone?: string | number,
	fax?: string | number,
}

export function toDTSimple(input: DTReportItem): SimpleAccount {
	return {
		dealertrackID: input["DealerTrack Id"],
		partnerID: input["Lender Dealer Id"],
		enrollment: input["Enrollment Phase"],
		dbaName: input["DBA Name"],
		legalName: input["Legal Name"],
		street: input.Street,
		city: input.City,
		state: input.State,
		zip: input.Zip as string,
		phone: input["Phone No"],
		fax: input["Fax No"]
	}
}
