import React from 'react';
// import { linkTo } from '@storybook/addon-links';
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";
import { actions } from '@storybook/addon-actions';
import { Headline } from '@wf/web-client'


export default {
	title: 'Headline',
	component: Headline,
};

// This will lead to { onClick: action('onClick'), ... }
const eventsFromNames = actions('onClick', 'onMouseOver');

// This will lead to { onClick: action('clicked'), ... }
const eventsFromObject = actions({ onClick: 'clicked', onMouseOver: 'hovered' });

export const ToStorybook = () => (
	<Headline {...eventsFromNames} label="This title" subtitle="that subtitle" more />
);

export const ToStorybook2 = () => (
	<Headline {...eventsFromObject} label="This is another title title" subtitle="appears in the text" />
);

export const ToStorybook3 = () => (
	<Headline label="When did this happen" />
);

// Knobs as dynamic variables.
export const asDynamicVariables = () => {
	const name = text("Name", "James");
	const age = number("Age", 35);
	const content = `I am ${name} and I'm ${age} years old.`;

	return <div>{content}</div>;
};

