import React, { useState } from 'react';
// import { Card, Tag } from 'antd';
import 'antd/dist/antd.css';
import Papa from 'papaparse';
import { message } from 'antd'
import { InputGroup, FormGroup, Button, Label, FileInput } from '@blueprintjs/core'

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
	callback,
	helper,
	internal_id
}) => {
	const [filename, setFilename] = useState<string>(`Choose ${label} CSV`)

	const getJSON = (event: any) => {
		for (const file of event.target.files) {
			setFilename(file.name)
			Papa.parse(file, {
				header: true,
				dynamicTyping: true,
				complete: (res) => {
					let cols = res.meta.fields;
					let prefix: string = ""
					if (cols.includes("Enrollment Phase")) {
						prefix += "This looks like a DT Report"
					}
					if (internal_id && cols.includes(internal_id)) {
						prefix += "This looks like a partner file"
					}
					callback(res);
					message.success(prefix);
					message.success(`${file.name} set as ${label}`)
				}
			})
		}
	}
	return (
		<FormGroup
			helperText={helper}
		>
			<h4>{label} - {count && (
				<span className="bp3-text-muted">{count} items</span>
			)}
			</h4>
			<FileInput
				// large
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
	)
}


export default FileSelect;
