import React from 'react';
import { linkTo } from '@storybook/addon-links';
// import { Welcome } from '@storybook/react/demo';

export const Welcome: React.FC = () => <div>Hello</div>

export default {
  title: 'Welcome',
  component: Welcome,
};


export const ToStorybook = () => (
  <Welcome><div>Hell from the Labs</div></Welcome>
);

ToStorybook.story = {
  name: 'to Storybook',
};
