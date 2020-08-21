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

export interface WFContextI {
	requested: IParseResult | undefined,
	reference: IParseResult | undefined,
	partner: PartnerCode,
	partner_name: string,
	config: partnerConfigInput | undefined,
	result: ImplementationResult[] | null,
	log: ImpPayload | null,
	busy: boolean,
	currentTab: string,
	demo: boolean
	step: number,
	showPartnerSettings: boolean
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
	togglePartnerSettings: Function
	loadState: Function
}

interface WFContextsI {
	[key: string]: WFContextI
}

export const initialContext: WFContextsI = {
	demo: {
		requested: drwRequestData,
		reference: drwRefData,
		partner: "DRW" as PartnerCode, // "BOA"
		partner_name: "Darwin Automotive",
		config: settings.drw as partnerConfigInput, // see partner_settings.ts
		result: null,
		log: null,
		busy: false,
		currentTab: "1",
		demo: true,
		step: 3,
		showPartnerSettings: false
	},
	default: {
		requested: undefined,
		reference: undefined,
		partner: null,
		partner_name: null,
		config: settings.boa,
		result: null,
		log: null,
		busy: false,
		currentTab: "1",
		demo: false,
		step: 0,
		showPartnerSettings: false
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
	loadState: Function
	togglePartnerSettings: Function
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
		this.loadState = (obj: WFContextI) => {
			this.setState(state => ({
				...state,
				requested: obj.requested,
				reference: obj.reference,
				partner: obj.partner,
				partner_name: obj.partner_name,
				config: obj.config,
				result: obj.result,
				log: obj.log,
				busy: obj.busy,
				currentTab: obj.currentTab,
				demo: obj.demo,
				step: obj.step,
				showPartnerSettings: obj.showPartnerSettings
			}))
		}
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
				// step: 4,
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
		this.togglePartnerSettings = (newVis: boolean) => {
			this.setState(prevState => ({
				showPartnerSettings: newVis
			}))
		}

		this.state = {
			...initialContext.default,
			setPartner: this.setPartner,
			setConfig: this.setConfig,
			setDemo: this.setDemo,
			setClear: this.setClear,
			setResult: this.setResult,
			setReference: this.setReference,
			setRequested: this.setRequested,
			setTab: this.setTab,
			setStep: this.setStep,
			togglePartnerSettings: this.togglePartnerSettings,
			loadState: this.loadState
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


