import React from 'react';
// import { linkTo } from '@storybook/addon-links';
import { Headline } from '@wf/web-client'


export default {
  title: 'Headline',
  component: Headline,
};


export const ToStorybook = () => (
  <Headline title="This title" subtitle="that subtitle" />
);

export const ToStorybook2 = () => (
  <Headline title="This is another title title" subtitle="appears in the text" />
);

export const ToStorybook3 = () => (
  <Headline title="When did this happen" />
);

