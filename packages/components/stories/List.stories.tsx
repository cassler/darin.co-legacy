import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { ThemeProvider, useTheme } from 'emotion-theming'
import List, { ListPropsI } from './List'
import Button, { IButtonProps } from '../Button/button'
import { colors } from '@cassler/typography'
export default {
	title: 'Example/List',
	component: List,
	argTypes: {
		backgroundColor: { control: 'color' },
		label: { control: 'text' }
	},
} as Meta;

const Template: Story<ListPropsI> = (args) => (
	<List {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
	header: <div>The header</div>,
	footer: <div><Button label="footer button" /></div>
};

export const Secondary = Template.bind({});
Secondary.args = {
	header: <div>The header</div>,
};

export const Large = Template.bind({});
Large.args = {
	header: <div>The header</div>,
};

export const Small = Template.bind({});
Small.args = {
	header: <div>The header</div>,
};
