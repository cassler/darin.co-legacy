import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import Button, { IButtonProps } from '../Button/button'
import { colors } from '@cassler/typography'
import NeuCard, { NeuCardPropsI } from '../NeuCard/NeuCard';

export default {
	title: 'Example/NeuCard',
	component: NeuCard,
	argTypes: {
		backgroundColor: { control: 'color' },
		src: { control: 'text' }
	},
} as Meta;

const Template: Story<NeuCardPropsI> = (args) => (
	<div>
		<NeuCard {...args} />
	</div>
);

export const Primary = Template.bind({});
Primary.args = {
	src: 'https://wallpapers.hector.me/wavey/Rainbow.jpg',
	color: '#ccf'
};

export const Secondary = Template.bind({});
Secondary.args = {
	src: 'https://wallpapers.hector.me/wavey/Aqua.jpg',
	width: 250
};

export const Large = Template.bind({});
Large.args = {
	src: 'https://wallpapers.hector.me/wavey/Graphite.jpg',
	width: 540
};

export const Small = Template.bind({});
Small.args = {
	src: 'https://static01.nyt.com/images/2020/08/20/nyregion/20bannonTOPnew/20bannonTOPnew-superJumbo.jpg?quality=90&auto=webp',
	width: 240
};
