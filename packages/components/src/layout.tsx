/* eslint-disable no-alert */
import React from "react";
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

export const Layout: React.FC = (props) => {

	const sty = css`
		padding: 0;
		margin: 0;
		width: 100%;
		border: 1px solid #222;
		min-height: 100vh;
		display: grid;
		grid-template-columns: 50px 100px 1fr 100px 50px;
		grid-template-rows: 70px 1fr 100px 70px;
		grid-template-areas: "head head head head head"
												 "leftRail leftGutter main rightGutter rightRail"
												 "leftRail leftGutter main rightGutter rightRail"
												 "leftRail footer footer footer rightRail";
		div:nth-child(2n) { background-color: #a9d9e9 }
		div:nth-child(3n-1) { background-color: #e9d9e9 }
		div:nth-child(4n-1) { background-color: #e0f9f9 }
		div:nth-child(6n-1) { background-color: #f0f3d2 }
	`;

	const headerStyle = css`

	`;

	return (
		<div css={sty}>
			<div style={{ gridArea: 'head' }}>1</div>
			<div>3</div>
			<div>4</div>
			<div>5</div>
			<div>6</div>
			<div>7</div>
			<div style={{ gridArea: "footer" }}>5123123</div>
			<div style={{ gridArea: "footer" }}>8</div>
			<div style={{ gridArea: "main" }}>
				{props.children}
			</div>

		</div>
	)
}

export default Layout;
