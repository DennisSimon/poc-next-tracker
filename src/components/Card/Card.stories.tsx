import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { Card } from "./Card";
import { CardContent } from "../CardContent/CardContent";
import { Typography } from "@mui/material";

export default {
  title: "Card Component",
  component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const VolumeCard = Template.bind({});

VolumeCard.args = {
  children: (
    <div>
      <CardContent>
        <CardContent>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Volume (30 D)
          </Typography>
          <Typography variant="h1">$461.45m</Typography>
        </CardContent>
      </CardContent>
    </div>
  ),
};
