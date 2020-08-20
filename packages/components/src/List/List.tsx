import React from 'react';
import { ReactElement } from 'react';
import './List.scss';

export interface ListPropsI {
	header?: string | ReactElement,
	footer?: string | ReactElement,
}

export const List: React.FC<ListPropsI> = ({ children, header, footer }) => {
	return (
		<div className="dList">
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
