import React, { Component, useState } from 'react';

export interface IHeadlineProps {
	label: string,
	subtitle: string,
	more: boolean,
	onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export function Headline(props: IHeadlineProps) {
	const { label, subtitle, onClick, more } = props;
	return (
		<div>
			<h3>{label}</h3>
			<button onClick={onClick}>{subtitle}</button>
			{more && (
				<div>More is enabled</div>
			)}
		</div>
	)
}

Headline.defaultProps = {
	label: 'default label',
	subtitle: 'default subtitle',
	more: false,
	onClick: () => { }
}


export default Headline;
