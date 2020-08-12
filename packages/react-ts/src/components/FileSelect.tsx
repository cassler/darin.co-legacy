import React, { useState } from 'react';
// import { Card, Tag } from 'antd';
import 'antd/dist/antd.css';
import Papa from 'papaparse';
import { message, Button } from 'antd'
import { FormGroup, FileInput } from '@blueprintjs/core'
import { motion, AnimatePresence } from "framer-motion"

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
	const [data, setData] = useState({});
	const [ready, setReady] = useState(false);
	const [hasError, setError] = useState(false);

	const getJSON = (event: any) => {
		setError(false)
		for (const file of event.target.files) {
			setFilename(file.name)
			Papa.parse(file, {
				header: true,
				dynamicTyping: true,
				complete: (res) => {
					let cols = res.meta.fields;
					let prefix: string = ""
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
				<FileInput
					large
					fill
					id={label}
					disabled={false}
					inputProps={{
						accept: "csv",
						onChange: (e) => getJSON(e),
					}}
					text={filename}
					onInputChange={(event) => console.log(event.target)}
				/>
			</FormGroup>
			<AnimatePresence>
				{ready ? (

					<motion.div
						key="2"
						transition={{ ease: "easeInOut", duration: 0.3 }}
						initial={{ x: 0, opacity: 0, scale: 1 }}
						animate={{ x: 0, opacity: 1, scale: 1 }}
						exit={{ x: 0, opacity: 0, scale: 1 }}
					>
						<Button disabled={!ready} type="primary" onClick={() => callback(data)}>Continue</Button>
					</motion.div>
				) : (
						<motion.div
							key="1"
							transition={{ ease: "easeInOut", duration: 0.3 }}
							initial={{ x: 0, opacity: 0, scale: 1 }}
							animate={{ x: 0, opacity: 0, scale: 1 }}
							exit={{ x: 0, opacity: 0, scale: 1 }}
						>
							<Button type="link">&nbps;</Button>
						</motion.div>
					)}

			</AnimatePresence>
		</>
	)
}


export default FileSelect;
