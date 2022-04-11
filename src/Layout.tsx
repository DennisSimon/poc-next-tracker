import React from "react";
import { Container, Box } from "@mui/material";
import { Header } from "@Components";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container maxWidth="xl">
      <Header />
      <Box sx={{ mt: { xs: 15, md: 18 } }}>{children}</Box>
    </Container>
  );
};
