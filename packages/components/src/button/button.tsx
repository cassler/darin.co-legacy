/* eslint-disable no-alert */
import { typography } from '@cassler/typography';
import React from "react";
import "./button.scss";

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


	const btnProps = {
		className: `dButton dButton-${size} ${primary && 'primary'}`,
		style: backgroundColor ? { backgroundColor } : {},
		type: "button",
		label,
		onClick: () => onClick && onClick()
	}
	return (
		<button {...btnProps as unknown}>
			{typography}
			{label} {size} {primary ? 'primary' : 'nope'}
		</button>
	)
}
