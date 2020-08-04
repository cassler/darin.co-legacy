import React from 'react';
import { Button } from 'antd';


type Props = {
	label: string,
	data: any[] | undefined
}
const DownloadButton: React.FC<Props> = ({ label, data }) => {
	function handleClick(event: MouseEvent) {
		console.log('click', label);
		console.log(event)
		return;
	}

	return (
		<Button onClick={() => handleClick}>{label}</Button>
	)
}


export default DownloadButton;
