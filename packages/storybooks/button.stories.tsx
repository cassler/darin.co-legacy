/* eslint-disable react/jsx-props-no-spreading */
import React from "react";

import { Button } from "@cassler/components";

import {
  RightCircleOutlined,
  RetweetOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

export default {
  component: Button,
  title: "Button",
  subtitle: "The best button out there",
};

// 👇 We create a “template” of how args map to rendering
const Template = (args) => {
  return <Button {...args}>Button</Button>;
}

export const Primary2 = Template.bind({});

export const IconAfter = Template.bind({});

Primary2.args = {
  primary: true
};


export const FillOptions = () => (
  <div style={{ display: "flex", gap: 5, margin: 5 }}>
    <Button size="small">Small (sm)</Button>
  </div>
);
export const GhostOptions = () => (
  <div style={{ display: "flex", gap: 5, margin: 5 }}>
    <Button ghost>Ghost</Button>
    <Button primary>Primary</Button>
  </div>
);
