import React, { useState } from 'react';
// import { Card, Tag } from 'antd';
import 'antd/dist/antd.css';
import Papa from 'papaparse';
import { message, Select, Button } from 'antd'
import { FormGroup, FileInput } from '@blueprintjs/core'
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRightOutlined } from '@ant-design/icons';
import { IParseResult } from '../context';
const { Option } = Select;

type Props = {
	label: string,
	count?: number,
	slug: string,
	helper?: string,
	internal_id?: string,
	callback: Function,
}
const FileSelect: React.FC<Props> = ({
	label,
	count,
	slug,
	callback,
	helper,
	internal_id
}) => {
	const [filename, setFilename] = useState<string>(`Choose ${label} CSV`)
	const [data, setData] = useState<IParseResult | undefined>();
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
					if (slug === "exclude") {
						message.info("Nothing was done with this data.");
						setFields(res.meta.fields);
						setData(res)
					}
					if (slug === "ref") {
						if (cols.includes("Enrollment Phase")) {
							message.success("This looks like a DT Report! Setting ");
							setData(res)
							setReady(true)
						} else {
							message.error("This doesn't look right. Make sure you're providing a Dealertrack report.")
							setError(true)
						}
					}
					if (slug === "req") {
						if (internal_id && cols.includes(internal_id)) {
							message.success(`This looks like a partner file. Setting as request data.`)
							setData(res)
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
				{fields.length > 0 && (
					<div>
						<h4>Select column where IDs are listed</h4>
						<Select
							defaultValue='--'
							style={{ width: 240 }}
							onChange={handleChange}>
							{fields.map(f => <Option key={f} value={f}>{f}</Option>)}
						</Select>
					</div>
				)}
			</FormGroup>
			{ids.length > 0 && (
				<>
					<h5>Preview</h5>
					<code>{JSON.stringify(ids.slice(0, 10))}</code>
				</>
			)}
			<div style={{ minHeight: '75px' }}>
				{ready && (
					<motion.div
						key="2"
						transition={{ ease: "easeInOut", duration: 0.3 }}
						initial={{ x: 0, opacity: 0, scale: 1 }}
						animate={{ x: 0, opacity: 1, scale: 1 }}
						exit={{ x: 0, opacity: 0, scale: 1 }}
					>
						<Button
							style={{ position: "absolute", bottom: '0', right: '0' }}
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
					</motion.div>
				)}
			</div>

		</>
	)
}


export default FileSelect;
