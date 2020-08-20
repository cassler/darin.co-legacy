import React from 'react';
import './LabLogo.scss';

interface LabLogoPropsI {
	title: string,
	size?: number,
	monochrome?: boolean
}

export const LabLogo: React.FC<LabLogoPropsI> = ({ title, size, monochrome }) => {
	return (
		<div className="lab-logo">
			<h1>{title} {monochrome && 'b&w'}</h1>
		</div>
	)
}

export default LabLogo
