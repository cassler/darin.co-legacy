import React from 'react';
import { ReactElement } from 'react';
/** @jsx jsx */
import { jsx, css, Global, ClassNames } from '@emotion/core'

export interface ListPropsI {
	header?: string | ReactElement,
	footer?: string | ReactElement,
}

const styles = css`
.dList {
	background-color: rgba(220,220,220,0.1);
	border: 1px solid rgba(180,180,180,0.2);
	border-radius: 14px;
	background-clip: content-box;
	overflow: hidden;
	color: #556;
	p {
		font-weight: 400;
		font-size: 14px;
		line-height: 20px;
	}
	li {
		list-style: none;
		padding: 5px 0;
		margin: 0;
		& + li {
			border-top: 1px solid rgba(180,180,180,0.2);
		}
	}
	.list-header, .list-body, .list-footer {
		padding: 16px 32px;
	}
	.list-header {
		h3 {
			font-size: 14px;
			line-height: 20px;
			font-weight: 600;
			padding: 0;
			margin: 0;
			color: #999;
		}
	}
	.list-footer {
		background-color: rgba(220,220,220,0.15);
	}
	.dark & {
		background-color: #252525;
		border-color: rgba(00,00,00,0.3);
		box-shadow: inset 1px 1px 5px rgba(#050506,0.2);
		color: #ccc;
		li + li { border-top-color: rgba(80,80,80,0.3) }
		.list-footer {
			background-color: rgba(#121212,0.15);
		}
	}
}

`

export const List: React.FC<ListPropsI> = ({ children, header, footer }) => {
	return (
		<div css={styles}>
			{header && (
				<div className="list-header">
					<h3>{header}</h3>
				</div>
			)}
			<div className="list-body">
				{children}
			</div>
			{footer && <div className="list-footer">{footer}</div>}
		</div>
	)
}

export default List
