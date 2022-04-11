import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { Typography } from "@mui/material";

import { Button } from "./Button";

export default {
  title: "Button Component",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const ContainedButton = Template.bind({});

ContainedButton.args = {
  variant: "contained",
  children: <Typography>Contained Button</Typography>,
};

export const OutlinedButton = Template.bind({});

OutlinedButton.args = {
  variant: "outlined",
  children: <Typography>Outlined Button</Typography>,
};

export const TextButton = Template.bind({});

TextButton.args = {
  variant: "text",
  children: <Typography>Text Button</Typography>,
};
