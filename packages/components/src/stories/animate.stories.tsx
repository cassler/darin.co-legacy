import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Button, IButtonProps } from '../Button/button';

export default {
	title: 'Example/Animations',
	component: Button,
	argTypes: {
		delay: { control: 'number' },
		label: { control: 'text' }
	},
} as Meta;

const Template: Story<IButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	primary: true,
	label: 'Primary Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
	label: 'Secondary Button',
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
