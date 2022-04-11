import React, { useState } from "react";
import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import { Navigation, Hamburger, HideOnScroll } from "@Components";

export const Header = () => {
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState<boolean>(false);

  return (
    <HideOnScroll>
      <AppBar
        sx={{
          backgroundColor: isNavDrawerOpen
            ? "transparent"
            : "background.default",
          paddingTop: {
            md: "36px",
            xs: "19px",
          },
          px: {
            md: 5,
            xs: 2.5,
          },
          pb: 3,
          zIndex: 1201,
        }}
        elevation={0}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img
              src="/0xlogo.svg"
              style={{ zIndex: 1201, position: "relative" }}
              alt=""
            />
            <Typography
              fontSize={24}
              color="text.secondary"
              ml="1ch"
              sx={{ zIndex: 1201, position: "relative" }}
            >
              {" "}
              / Info
            </Typography>
            <Box sx={{ display: { xs: "none", md: "flex" }, flexGrow: 1 }}>
              <Navigation />
            </Box>
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                flexDirection: "row-reverse",
              }}
            >
              <Hamburger
                isOpen={isNavDrawerOpen}
                onClick={() => setIsNavDrawerOpen(!isNavDrawerOpen)}
              />
              <Navigation
                mobile
                isOpen={isNavDrawerOpen}
                onClose={() => setIsNavDrawerOpen(false)}
              />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
};
