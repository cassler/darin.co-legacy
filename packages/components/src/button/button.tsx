/* eslint-disable no-alert */
import { meaningOfLife } from "@cassler/foo";
import React from "react";
import "./button.css";


export interface IButtonProps {
	primary?: boolean,
	size?: 'small' | 'medium' | 'large';
	label: string;
	backgroundColor: string,
	onClick?: () => void
}
export const Button: React.FC<IButtonProps> = ({
	primary = false,
	size = 'medium',
	label = 'default button text',
	backgroundColor,
	onClick = () => { }
}) => {
	const styles = backgroundColor ? { backgroundColor } : {}
	return (
		<button
			className={`dButton dButton-${size} ${primary && 'primary'}`}
			style={styles}
			type="button"
			onClick={() => onclick && onClick()}
		>
			{label} {size} {primary ? 'primary' : 'nope'}
		</button>
	)
}
