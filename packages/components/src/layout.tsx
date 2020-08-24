/* eslint-disable no-alert */
import React from "react";
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { GithubOutlined, HeartOutlined } from '@ant-design/icons';

export const Layout: React.FC = (props) => {

	const sty = css`
		padding: 0;
		margin: -1px 0 0;
		width: 100%;
		min-height: 200vh;
		display: grid;
		grid-template-columns: 100px 1fr 100px;
		grid-template-rows: 70px 1fr 100px 70px;
		grid-template-areas: "head head head"
												 "sidebar main rightRail"
												 "sidebar main rightRail"
												 "sidebar footer rightRail";
		/* > div { border: 1px solid #dedede;} */
		> .affix-top { grid-area: head; top: 0; left: 0; right: 0; }
		> .affix-bottom { }
		> .header { grid-area: head; background: #fff; }
		> .footer { grid-area: footer}
		> .main {
			grid-area: main;
			/* background: #fff; */
		}
		/* > .sidebar { grid-area: sidebar; background: #f3f3f9 } */
		/* > .gutter { grid-area: rightRail; background: #222} */
	`;

	const affixTopStyle = css`
		position: fixed;
		background: rgba(200, 50, 52, 1.00);
		width: 100%;
		height: 70px;
	`

	const mainStyle = css`
		padding: 40px;
	`


	return (
		<>
			<div css={affixTopStyle}>
				<div className='header'></div>
			</div>
			<div css={sty}>

				<div className='footer'>5123123</div>
				<div className='sidebar'>8</div>
				<div className='main' css={mainStyle}>
					{props.children}
				</div>
				<div className="gutter">lol</div>

			</div>

		</>
	)
}

export default Layout;
