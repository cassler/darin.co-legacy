import React from 'react';
// import { linkTo } from '@storybook/addon-links';
import { withKnobs, text } from "@storybook/addon-knobs";
// import { actions } from '@storybook/addon-actions';
import { ColorSquare } from '@wf/web-client'


export default {
	title: 'ColorSquare',
	component: ColorSquare,
	decorator: [withKnobs]
};

const EProps = {
	label: text("Color Label", "Default Label"),
	color: text("HEX", "#a37299"),
}


export const Example1 = () => {
	return (
		<ColorSquare
			label={EProps.label}
			color={EProps.color}
		/>
	)
};
