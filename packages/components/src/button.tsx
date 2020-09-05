/* eslint-disable no-alert */
import { meaningOfLife } from "@cassler/foo";
import React from "react";
/** @jsx jsx */
import { css, jsx } from '@emotion/core';


interface ButtonPropsI {
	label: string,
	onClick: Function
}
export const Button: React.FC<ButtonPropsI> = ({ onClick, label }) => {
	const styles = css`
		padding: 16px 24px;
		border: none;
		font-size: 18px;
		border-radius: 8px;
		background-color: #a11;
		color: #fcc;
	`
	return (
		<button
			css={styles}
			type="button"
			onClick={() => onClick ? onClick() : alert(`the meaning if life is ${meaningOfLife}`)}
		>
			{label ? label : 'darin is developed'}
		</button>
	)
};
