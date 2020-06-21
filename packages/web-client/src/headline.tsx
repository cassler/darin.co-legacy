import React from 'react';

type IItemLabel = {
	title: string,
	subtitle?: string,
	onClick?: Function,
	index?: number,
}

export const Headline: React.FC<IItemLabel> =
	({ title, subtitle, onClick }) => {
		return (
			<div>
				<h3>{title}</h3>
				<button onChange={() => onClick}>{subtitle ? subtitle : 'default'} 🚀</button>
			</div>
		)
	}
