import React from "react";
import { Card as MuiCard, CardProps } from "@mui/material";
import { merge } from "lodash";

const defaultCardSx: SxProps = {
  backgroundColor: "background.card",
  borderRadius: 0,
} as const;

export const Card = ({ children, sx, ...rest }: CardProps) => {
  return (
    <MuiCard variant="outlined" sx={merge(defaultCardSx, sx)} {...rest}>
      {children}
    </MuiCard>
  );
};
