import React from 'react';
import { PartnerCode, partnerConfigInput } from '@wf/types';
import { ImplementationResult, ImpPayload } from '@wf/core';
import { data as drwRequestData } from './data/drwRequest';
import { data as drwRefData } from './data/refData';
import { settings } from './data/settings';


export interface IParseResult {
	data: any[];
	errors: any;
	meta: any;
}

interface WFContextI {
	requested: IParseResult | undefined,
	reference: IParseResult | undefined,
	partner: PartnerCode,
	config: partnerConfigInput | undefined,
	result: ImplementationResult[] | null,
	log: ImpPayload | null,
	busy: boolean,
	currentTab: string,
	demo: boolean
	step: number,
}

interface WFContextVal extends WFContextI {
	setPartner: Function
	setConfig: Function
	setDemo: Function
	setClear: Function
	setResult: Function
	setReference: Function
	setRequested: Function
	setTab: Function
}

interface WFContextsI {
	[key: string]: WFContextI
}

export const initialContext: WFContextsI = {
	demo: {
		requested: drwRequestData,
		reference: drwRefData,
		partner: "DRW" as PartnerCode, // "BOA"
		config: settings.drw as partnerConfigInput, // see partner_settings.ts
		result: null,
		log: null,
		busy: false,
		currentTab: "1",
		demo: true,
		step: 0,
	},
	default: {
		requested: undefined,
		reference: undefined,
		partner: null,
		config: settings.boa,
		result: null,
		log: null,
		busy: false,
		currentTab: "1",
		demo: false,
		step: 0,
	}
}




export const WFContext = React.createContext(null);
WFContext.displayName = "WFContext"



export class WFProvider extends React.Component {
	setPartner: Function
	setConfig: Function
	setDemo: Function
	setClear: Function
	setResult: Function
	setReference: Function
	setRequested: Function
	setTab: Function
	setStep: Function
	constructor(props) {
		super(props)
		this.setPartner = (sel: PartnerCode) => {
			this.setState(state => ({
				...state,
				partner: sel,
				result: null,
				log: null,
				step: 1,
			}))
		};
		this.setConfig = (obj: partnerConfigInput) => {
			this.setState(state => ({
				...state,
				config: obj,
				result: null,
				log: null
			}))
		}
		this.setClear = () => {
			this.setState(state => ({
				...state,
				...initialContext.default,
				step: 0
			}))
		}
		this.setDemo = () => {
			this.setState(state => ({
				...state,
				...initialContext.demo,
				step: 0
			}))
		}
		this.setResult = (result, log) => {
			this.setState(state => ({
				...state,
				result: result,
				log: log,
				step: 4,
			}))
			// this.setTab("3")
		}
		this.setReference = (obj: IParseResult) => {
			this.setState(state => ({
				...state,
				reference: obj,
				result: null,
				log: null,
				step: 2,
			}))
		}
		this.setRequested = (obj: IParseResult) => {
			this.setState(state => ({
				...state,
				requested: obj,
				result: null,
				log: null,
				step: 3,
			}))
		}
		this.setTab = (key: string) => {
			this.setState(state => ({
				...state,
				currentTab: key
			}))
		};
		this.setStep = (i: number) => {
			this.setState(state => ({
				...state,
				step: i
			}))
		}
		this.state = {
			...initialContext.demo,
			setPartner: this.setPartner,
			setConfig: this.setConfig,
			setDemo: this.setDemo,
			setClear: this.setClear,
			setResult: this.setResult,
			setReference: this.setReference,
			setRequested: this.setRequested,
			setTab: this.setTab,
			setStep: this.setStep
		}
	}

	render() {

		return (
			<WFContext.Provider value={{ ctx: this.state }}>
				{this.props.children}
			</WFContext.Provider>
		)
	}
}


