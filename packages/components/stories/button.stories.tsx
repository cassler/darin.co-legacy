import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { ThemeProvider, useTheme } from 'emotion-theming'
import { Button, IButtonProps, themeo } from './button';
import { colors } from '@cassler/typography'
export default {
	title: 'Example/Button',
	component: Button,
	argTypes: {
		backgroundColor: { control: 'color' },
		label: { control: 'text' }
	},
} as Meta;

const Template: Story<IButtonProps> = (args) => (
	<ThemeProvider theme={themeo}>
		<Button {...args} />
	</ThemeProvider>
);

export const Primary = Template.bind({});
Primary.args = {
	primary: true,
	label: 'Primary Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
	label: 'Secondary Button',
	ghost: true,
	use3D: true
};

export const Large = Template.bind({});
Large.args = {
	size: 'large',
	label: 'A large button',
};

export const Small = Template.bind({});
Small.args = {
	size: 'small',
	label: 'My small button',
};
