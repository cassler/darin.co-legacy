import React from 'react';
import { linkTo } from '@storybook/addon-links';
import { Headline } from '@wf/web-client'


export default {
  title: 'Headline',
  component: Headline,
};


export const ToStorybook = () => (
  <Headline title="This title" subtitle="that subtitle" />
);
