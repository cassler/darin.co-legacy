import { whatIsTheMeaningOfLife, getOctet } from "../src";

describe("meaning of life", () => {
	it("should be 42", () => {
		expect(whatIsTheMeaningOfLife()).toEqual(42);
	});
	it("should be a number", () => {
		expect(typeof whatIsTheMeaningOfLife() === 'string')
	})
});

describe("Create Octets", () => {
	it("Should be 8 characters long", () => {
		expect(getOctet(whatIsTheMeaningOfLife()).length === 8)
	})

	it("Should reject objects", () => {
		expect(getOctet({ this: 1 }) === undefined)
	})
})
