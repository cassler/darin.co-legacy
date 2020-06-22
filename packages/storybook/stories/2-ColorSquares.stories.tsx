import React from 'react';
// import { linkTo } from '@storybook/addon-links';
import { actions } from '@storybook/addon-actions';
import { ColorSquare } from '@wf/web-client'


export default {
	title: 'ColorSquare',
	component: ColorSquare,
};

const eventsFromObject = actions({ onClick: 'clicked', onMouseOver: 'hovered' });


export const Example1 = (args: object) => {
	console.log({ args });
	return (
		<ColorSquare
			{...eventsFromObject}
			label="My Button Title"
			color="#a3c182"
		/>
	)
};

Example1.args = {
	label: "Hello my title",
	color: "#d0a172"
}
