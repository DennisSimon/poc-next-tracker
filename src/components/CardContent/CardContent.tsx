import React from "react";
import { merge } from "lodash";
import { CardContent as MuiCardContent, CardContentProps } from "@mui/material";

const defaultSx = {
  py: "12px",
  px: 2,
  ":last-child": {
    paddingBottom: "12px",
  },
} as const;

export const CardContent = ({ children, sx, ...rest }: CardContentProps) => (
  <MuiCardContent sx={merge(defaultSx, sx || {})} {...rest}>
    {children}
  </MuiCardContent>
);
