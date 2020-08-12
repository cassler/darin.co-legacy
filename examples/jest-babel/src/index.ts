import { meaningOfLife } from "@cassler/foo";

export const whatIsTheMeaningOfLife = () => meaningOfLife;

export const getOctet = (input: object | string | number) => {
	let str = JSON.stringify(input).slice(0, 8);
	return str;
}
