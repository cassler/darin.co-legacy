/* eslint-disable no-alert */
import { colors } from "@cassler/color";
import React, { ReactElement, ReactNode, ButtonHTMLAttributes } from "react";
/** @jsx jsx */
import { css, jsx } from '@emotion/core';


type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	size?: 'small' | 'large',
	primary?: boolean,
	ghost?: boolean
}

export const Button: React.FC<Props> = ({ onClick, children, size, primary, ghost, className }) => {
	const defaultStyle = css`
		padding: 6px 12px;
		border: 2px solid ${colors.gray[3]};
		font-size: 13px;
		font-weight: 600;
		letter-spacing: -0.033em;
		border-radius: 6px;
		background-color: ${colors.gray[2]};
		color: ${colors.gray[8]};
		&:hover { cursor: pointer} ;
	`
	const primaryStyle = css`
		background-color: ${colors.indigo[6]};
		border-color: ${colors.indigo[8]};
		color: ${colors.gray[0]};
		&:hover { background-color: ${colors.indigo[8]}}
	`
	const ghostStyle = css`
		background-color: transparent;
		/* border: 1px solid ${colors.gray[4]}; */
	`
	const smallStyle = css`
		padding: 4px 8px;
		font-size: 12px;
	`;
	const largeStyle = css`
		padding: 12px 18px;
	`
	const styles = [
		defaultStyle,
		size === 'small' && smallStyle,
		size === 'large' && largeStyle,
		primary && primaryStyle,
		ghost && ghostStyle
	]
	return (
		<button className={className} type="button" css={styles} onClick={() => onClick ? onClick : null}>
			{children}
		</button>
	)
};
