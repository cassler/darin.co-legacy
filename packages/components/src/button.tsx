/* eslint-disable no-alert */
import { meaningOfLife } from "@nighttrax/foo";
import React from "react";
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

export const Button = () => {
	const styles = css`
		padding: 10px;
		border: none;
		border-radius: 8px;
		background-color: #393;
		color: #fff;
	`
	return (
		<button
			css={styles}
			type="button"
			onClick={() => alert(`the meaning if life is ${meaningOfLife}`)}
		>
			Click me!!!!!
		</button>
	)
};
