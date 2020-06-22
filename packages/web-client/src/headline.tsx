import React from 'react';

export interface IHeadlineProps {
	label: string,
	subtitle: string,
	disabled: boolean,
	onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export function Headline(props: IHeadlineProps) {
	const { label, subtitle, onClick, disabled } = props;
	const handleClick = (event) => {
		onClick(event);
	}
	return (
		<div>
			<h3>{label}</h3>
			<button onClick={(event) => handleClick(event)}>
				{subtitle}
			</button>
			{!disabled && <div>More is enabled</div>}
		</div >
	)
}

Headline.defaultProps = {
	label: 'default label',
	subtitle: 'default subtitle',
	disabled: false,
	onClick: () => { }
}


export default Headline;
