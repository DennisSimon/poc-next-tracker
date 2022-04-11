import React from "react";
import { Box, Drawer, Grid, Snackbar, Typography } from "@mui/material";
import { Button } from "@Components";
import { ethers } from "ethers";
import { useState } from "react";

type NavigationProps = {
  mobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
};

type LinkConfig = {
  label: string;
};

type LinkCategoryConfig = {
  label: string;
  listItems: LinkConfig[];
};

function isLinkCategoryConfig(
  item: LinkConfig | LinkCategoryConfig
): item is LinkCategoryConfig {
  return (item as LinkCategoryConfig).listItems !== undefined;
}

const pages: Array<LinkConfig | LinkCategoryConfig> = [
  { label: "Apps" },
  { label: "Liquidity Source" },
  { label: "Ecosystem Map" },
  {
    label: "Market Components",
    listItems: [
      { label: "Pairs" },
      { label: "Traders" },
      { label: "Tokens" },
      { label: "Trades" },
    ],
  },
];

const separateLinkTypes: () => [LinkConfig[], LinkCategoryConfig[]] = () => {
  const out: [LinkConfig[], LinkCategoryConfig[]] = [[], []];

  for (const page of pages) {
    if (isLinkCategoryConfig(page)) {
      out[1].push(page);
    } else {
      out[0].push(page);
    }
  }
  return out;
};

export const Navigation = ({
  mobile = false,
  isOpen = false,
  onClose = () => {},
}: NavigationProps) => {
  const [normalLinks, linkCategories] = separateLinkTypes();
  const [connected, setConnected] = useState(false);

  const connectWallet: () => Promise<void> = async () => {
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();
    console.log(signer);
    setConnected(true);
  };

  return mobile ? (
    <Drawer anchor="top" open={isOpen} onClose={onClose}>
      <Box role="presentation" onClick={onClose} onKeyDown={onClose}>
        <Grid
          container
          sx={{
            backgroundColor: "background.mobileNavLinks",
            paddingTop: 20,
            paddingBottom: 3,
            px: 3,
          }}
          rowGap={4}
        >
          {normalLinks.map(({ label }) => (
            <Grid
              item
              xs={6}
              key={`mobile-menu-${label}`}
              component="button"
              sx={{
                fontSize: "20px",
                padding: 0,
                minWidth: 0,
                color: "white",
                backgroundColor: "transparent",
                border: "none",
                textAlign: "left",
              }}
            >
              {label}
            </Grid>
          ))}
        </Grid>
        {linkCategories.map(({ label, listItems }) => (
          <Grid
            container
            key={`nav-category-${label}`}
            sx={{
              backgroundColor: "background.mobileNavCategories",
              padding: 3,
            }}
            rowGap={4}
          >
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                {label}
              </Typography>
            </Grid>
            {listItems.map(({ label: linkLabel }) => (
              <Grid
                item
                xs={6}
                key={`mobile-menu-${label}-${linkLabel}`}
                component="button"
                sx={{
                  fontSize: "20px",
                  padding: 0,
                  minWidth: 0,
                  color: "white",
                  backgroundColor: "transparent",
                  border: "none",
                  textAlign: "left",
                }}
              >
                {linkLabel}
              </Grid>
            ))}
          </Grid>
        ))}
      </Box>
    </Drawer>
  ) : (
    <Box
      justifyContent="flex-end"
      display="flex"
      width="100%"
      flexDirection="row"
    >
      {pages.map(({ label }) => (
        <Button
          variant="text"
          key={`menu-button-${label}`}
          sx={{
            ":hover": { backgroundColor: "transparent", color: "white" },
            fontSize: "18px",
            padding: 0,
            minWidth: 0,
            ml: "min(36px, 100%)",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </Button>
      ))}
      <Button sx={{ ml: " 48px" }} onClick={connectWallet} disabled={connected}>
        {connected ? "Wallet Connected" : "Connect Wallet"}
      </Button>
      <Snackbar
        open={connected}
        autoHideDuration={4000}
        message="Wallet connected"
      />
    </Box>
  );
};
