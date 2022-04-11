import { Slide, useScrollTrigger } from "@mui/material";
import React from "react";

type HideOnScrollProps = {
  children: React.ReactElement;
};

export const HideOnScroll = ({ children }: HideOnScrollProps) => {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};
