import React, { useMemo } from 'react';
import { PartnerCode, partnerConfigInput } from '@wf/types';
import { ImplementationResult, ImpPayload } from '@wf/core';
import { data as drwRequestData } from './data/drwRequest';
import { data as drwRefData } from './data/refData';
import { settings } from './data/settings';
import { set, get } from 'idb-keyval';
import { message } from 'antd';


import TimeAgo from 'javascript-time-ago'

// Load locale-specific relative date/time formatting rules.
import en from 'javascript-time-ago/locale/en'

// Add locale-specific relative date/time formatting rules.
TimeAgo.addLocale(en)

// Create relative date/time formatter.
const timeAgo = new TimeAgo('en-US')

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
	reloaded: boolean
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

export const initialContext: { [key: string]: WFContextI } = {
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
		showPartnerSettings: false,
		reloaded: false,
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
		showPartnerSettings: false,
		reloaded: false,
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
	hardReset: Function
	saveContext: Function
	loadContext: Function
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
			let partner = obj.partner;
			let newConfig: partnerConfigInput | undefined = undefined;
			switch (partner) {
				case "BOA": newConfig = settings.boa; break
				case "DRW": newConfig = settings.drw; break
				case "HAZ": newConfig = settings.haz; break
				case "CNZ": newConfig = settings.cnz; break
				default: newConfig = undefined
			}

			this.setState(state => ({
				...state,
				requested: obj.requested,
				reference: obj.reference,
				partner: obj.partner,
				partner_name: obj.partner_name,
				config: newConfig,
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
				reloaded: true,
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
		this.hardReset = () => {
			set("saveState", undefined);
			set("saveTime", undefined);
			this.setClear()
		}
		this.saveContext = (obj) => {
			set("saveTime", new Date())
			set("saveState", JSON.stringify({
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
		this.loadContext = () => {
			// Go find our requests
			get<unknown>("saveTime").then(timestamp => {
				get<string>("saveState").then(value => {
					if (value) {
						// let diff = Date.now() - timestamp;
						message.info(`Restored state from ${timeAgo.format(timestamp)}`)
						this.loadState(JSON.parse(value))
					} else {
						message.info("No save state found.")
					}
				})
			})
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
			loadState: this.loadState,
			hardReset: this.hardReset,
			saveContext: this.saveContext,
			loadContext: this.loadContext
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


