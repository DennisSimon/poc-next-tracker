import React from "react";
import { Card, CardContent } from "@Components";
import { Skeleton, Typography } from "@mui/material";

export type CardWithHeaderProps = {
  header: React.ReactNode | string;
  content?: React.ReactNode | string | null;
  loading?: boolean;
  error?: string | boolean;
  minWidth?: string | number;
};

export const CardWithHeader = ({
  header,
  content = null,
  loading,
  minWidth,
}: CardWithHeaderProps) => {
  let contentComponent: React.ReactNode = null;
  const headerComponent =
    typeof header === "string" ? (
      <Typography variant="body2" sx={{ color: "text.secondary", mb: 0.5 }}>
        {header}
      </Typography>
    ) : (
      header
    );
  if (loading) {
    contentComponent = <Skeleton variant="text" data-testid="skeleton" />;
  } else {
    contentComponent =
      typeof content === "string" ? (
        <Typography variant="h1">{content}</Typography>
      ) : (
        content
      );
  }

  return (
    <Card sx={minWidth ? { minWidth } : {}}>
      <CardContent>
        {headerComponent}
        {contentComponent}
      </CardContent>
    </Card>
  );
};
