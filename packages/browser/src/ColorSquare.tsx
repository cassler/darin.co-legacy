import React from 'react';

export interface IColorSquareProps {
	label: string,
	color: string,
	onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export function ColorSquare(props: IColorSquareProps) {
	const { label, color, onClick } = props;
	const handleClick = (event) => {
		onClick(event);
	}
	return (
		<div style={{ backgroundColor: color }}>
			<h3>{label}</h3>
			<button onClick={handleClick}>Select</button>
		</div >
	)
}

ColorSquare.defaultProps = {
	label: 'Simple Gray',
	color: '#c9c9c3',
	onClick: () => { }
}


export default ColorSquare;
