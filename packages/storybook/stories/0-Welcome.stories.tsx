import React from 'react';
// import { linkTo } from '@storybook/addon-links';
import { actions } from '@storybook/addon-actions';
import { Headline } from '@wf/web-client'


export default {
	title: 'Headline',
	component: Headline,
};

const eventsFromObject = actions({ onClick: 'clicked', onMouseOver: 'hovered' });


export const Example1 = (args: object) => {
	console.log({ args });
	return (
		<Headline
			{...eventsFromObject}
			label="My Button Title"
			subtitle="The Subtitle"
		/>
	)
};

Example1.args = {
	title: "Hello my title",
	subtitle: "This is the subtitle"
}
