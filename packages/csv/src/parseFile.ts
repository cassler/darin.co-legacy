import Papa from 'papaparse';
import * as fs from 'fs';
import * as XLSX from 'xlsx';

export function getJsonFromXLSX(file: string) {
	// check filetype
	const workbook = XLSX.readFile(file, { cellDates: true });
	const data: any = {}
	workbook.SheetNames.map(sheetName => {
		const sheet = workbook.Sheets[sheetName];
		const json = XLSX.utils.sheet_to_json(sheet);
		data[sheetName] = json;
	});
	return data;
}

export const firtSheetJson = (file: string) => {
	const spreadsheet = getJsonFromXLSX(file); // ?
	const sheets = Object.keys(spreadsheet); // ?
	const payload = spreadsheet[sheets[0]]; //
	return payload;
}

export function getJSONfromSpreadsheet(file: string) {
	// console.log(file.slice(-3))
	if (file.slice(-3) === 'csv') {
		// do CSV stuff
		// console.log('this is a csv')
		let data = fs.readFileSync(file, 'utf8');
		return Papa.parse(data, { header: true, dynamicTyping: true }).data
	}

	if (file.slice(-4) === 'xslx' || '.xls') {
		// do excel stuff
		console.log('This is an excel sheet. Please wait...')
		const workbook = XLSX.readFile(file, { cellDates: true })
		let all_data = workbook.SheetNames.map(sheetName => {
			let sheet = workbook.Sheets[sheetName]
			let json = XLSX.utils.sheet_to_json(sheet)
			return json
		})
		// console.log(data)
		// return data;
		return all_data[0]
	}
}


export const writeToCsv = (data: object[], name: string = 'GeneratedFile') => {
	const content = Papa.unparse(data);
	fs.writeFile(`./tmp/${name}.csv`, content, e => {
		e ? console.error(e) : null
	});
	console.log(`File created: ${name}.csv with ${data.length} entries`);
	return;
}
