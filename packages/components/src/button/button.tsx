/* eslint-disable no-alert */
import { typography } from '@cassler/typography';
import React, { useContext } from "react";
/** @jsx jsx */
import { jsx, css, Global, ClassNames } from '@emotion/core'
import { ThemeProvider, useTheme } from 'emotion-theming'
import { colors } from '@cassler/typography'

export interface IButtonProps {
	primary?: boolean,
	ghost?: boolean,
	disabled?: boolean,
	size?: 'small' | 'medium' | 'large'
	label: string
	className?: string
	backgroundColor?: string
	use3D?: boolean
	onClick?: () => void
}

const defaultProps: IButtonProps = {
	primary: false,
	size: 'medium',
	label: 'Submit',
	disabled: false,
	ghost: false,
	use3D: true,
	onClick: () => { }
}

type Theme = {
	colors: {
		[key: string]: string[] | string
	},
	swatch: {
		[key: string]: string
	}
}
export const themeo: Theme = {
	colors: { ...colors },
	swatch: {
		buttonBgColor: colors.gray[1],
		buttonColor: colors.gray[7],
		buttonBgPrimaryColor: colors.blue[7],
		buttonPrimaryColor: colors.blue[0],
		buttonBgGhostColor: 'transparent',
		buttonGhostColor: colors.gray[6]
	}
}

export const Button: React.FC<IButtonProps> = (props = defaultProps) => {
	const { primary, ghost, size, label, disabled, onClick, use3D } = props;
	const th: Theme = useTheme();

	const sty = {
		base: css`
			border-radius: 8px;
			font-weight: 500;
			border: 1px solid ${colors.gray[2]};
			padding: 15px 15px;
			background-color: ${colors.gray[0]};
			color: ${colors.gray[5]};
			&:hover {
				background-color: ${colors.gray[1]};
				cursor: pointer;
			}
		`,
		use3D: css`
			box-shadow: 2px 1px 12px ${colors.gray[2]};
			&:hover {
				background: transparent;
				box-shadow: 2px 1px 8px ${colors.gray[2]};
			}
			&:active {
				box-shadow: 1px 1px 4px ${colors.gray[2]};
			}
		`,
		primary: {
			backgroundColor: colors.gray[0],
			color: colors.gray[8]
		},
		ghost: {
			background: 'transparent',
			borderColor: 'transparent'
		},
		small: {
			padding: "8px 12px",
			fontWeight: 400
		},
		medium: {
			padding: "10px 20px",
		},
		large: {
			padding: "15px 30px"
		}
	}

	let sizeStyle: "small" | "medium" | "large" = size === "small" ? "small" : size === "large" ? "large" : "medium";

	return (
		<button
			disabled={disabled}
			css={[
				sty.base,
				use3D && sty.use3D,
				primary && sty.primary,
				ghost && sty.ghost,
				sty[sizeStyle]]
			}
			type="button"
			onClick={() => onClick && onClick()}>
			{label ? label : 'Submit'}
		</button>


	)
}

export default Button;
