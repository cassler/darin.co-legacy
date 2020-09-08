import React, { useState } from 'react';
// import { Card, Tag } from 'antd';
import 'antd/dist/antd.css';
import Papa from 'papaparse';
import { message, Popover, Select, Button } from 'antd'
import { FormGroup, FileInput } from '@blueprintjs/core'
import { motion } from "framer-motion"
import { ArrowRightOutlined } from '@ant-design/icons';
import { IParseResultNamed } from '../../context';
import { CSVTableModal } from '../Preview/CSVTable';
const { Option } = Select;

type Props = {
	label: string,
	count?: number,
	slug: string,
	helper?: string,
	checkFile?: Function,
	internal_id?: string,
	callback: Function,
}
const FileSelect: React.FC<Props> = ({
	label,
	count,
	slug,
	callback,
	helper,
	checkFile,
	internal_id
}) => {
	const [filename, setFilename] = useState<string>(`Choose ${label} CSV`)
	const [data, setData] = useState<IParseResultNamed | undefined>();
	const [ready, setReady] = useState(false);
	const [hasError, setError] = useState(false);
	const [fields, setFields] = useState([])
	const [ids, setIds] = useState([])

	const handleChange = (value) => {
		console.log('change', value);
		const ids = data.data.map(i => i[value])
		setIds(ids)
		setReady(true)
	}
	const getJSON = (event: any) => {
		setError(false)
		for (const file of event.target.files) {
			setFilename(file.name)
			Papa.parse(file, {
				header: true,
				dynamicTyping: true,
				complete: (res) => {
					let cols = res.meta.fields;
					if (slug === "prev" || slug === "next") {
						callback(res, slug, file.name)
					}
					if (slug === "exclude") {
						debugger
						message.info("Nothing was done with this data.");
						setFields(res.meta.fields);
						setData({ ...res, fileName: file.name })
					}
					if (slug === "ref") {
						if (cols.includes("Enrollment Phase")) {
							message.success("This looks like a DT Report! Continue to use as reference data.");
							let isValid = checkFile(res.data as object[]);
							if (!isValid) {
								message.warning("This may not be the correct report. Please check.")
							}
							setData({ ...res, fileName: file.name })
							setReady(true)
						} else {
							message.error("This doesn't look right. Make sure you're providing a Dealertrack report.")
							setError(true)
						}
					}
					if (slug === "req") {
						if (internal_id && cols.includes(internal_id)) {
							message.success(`This looks like a partner file. Setting as request data.`)
							setData({ ...res, fileName: file.name })
							setReady(true)
						} else {
							message.error(`This doesn't look right. Make sure the file includes a column for ${internal_id} `)
							setError(true)
						}
					}
				}
			})
		}
	}
	return (
		<>
			<FormGroup helperText={helper} className={hasError ? 'validation-error' : 'default'}>
				{(!data || slug !== 'exclude') && (

					<FileInput
						large
						fill
						style={{ maxWidth: '540px' }}
						id={label}
						disabled={false}
						inputProps={{
							accept: "csv",
							onChange: (e) => getJSON(e),
						}}
						text={filename}
						onInputChange={(event) => console.log(event.target)}
					/>
				)}
				{fields.length > 0 ? (
					<div>
						<h4>Select column where IDs are listed</h4>
						<Select
							defaultValue='--'
							style={{ width: 240 }}
							onChange={handleChange}>
							{fields.map(f => <Option key={f} value={f}>{f}</Option>)}
						</Select>
					</div>
				) : slug === 'exclude' && (
					<div>
						<Popover content={(
							<p>Proceed using all data. Results will not be aware of existing assets or configurations.</p>
						)}>
							<Button style={{ position: "absolute", bottom: '0', right: '0' }} onClick={() => callback([])}>
								Skip exclusions
							<ArrowRightOutlined />
							</Button>
						</Popover>
					</div>
				)}
			</FormGroup>
			{ids.length > 0 && (
				<>
					<h5>Preview</h5>
					<code>{JSON.stringify(ids.slice(0, 10))}</code>
				</>
			)}
			{ready && (
				<div style={{ minHeight: '75px' }}>
					<motion.div
						key="2"
						transition={{ ease: "easeInOut", duration: 0.3 }}
						initial={{ x: 0, opacity: 0, scale: 1 }}
						animate={{ x: 0, opacity: 1, scale: 1 }}
						exit={{ x: 0, opacity: 0, scale: 1 }}
					>
						<div style={{ position: "absolute", bottom: '0', right: '0' }}>


							<CSVTableModal filename={data.fileName} payload={data} />&nbsp;
							<Button

								disabled={!ready}
								type="primary"
								onClick={() => {
									slug === 'exclude' ?
										callback(ids) :
										callback(data)
								}}>
								Continue
							<ArrowRightOutlined />
							</Button>
						</div>
					</motion.div>
				</div>
			)}

		</>
	)
}


export default FileSelect;
