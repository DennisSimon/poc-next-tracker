import { alpha, createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface TypeBackground {
    default: string;
    table: string;
    card: string;
    button: string;
    buttonHover: string;
    mobileNavLinks: string;
    mobileNavCategories: string;
  }

  interface TypeText {
    link: string;
  }
}

export const theme = createTheme({
  palette: {
    background: {
      default: "#00191C",
      table: "#0A2225",
      card: alpha("#FFFFFF", 0.03),
      button: alpha("#FFFFFF", 0.09),
      buttonHover: alpha("#FFFFFF", 0.18),
      mobileNavLinks: "#003831",
      mobileNavCategories: "#022924",
    },
    text: {
      primary: "#FFFFFF",
      secondary: alpha("#FFFFFF", 0.5),
      link: "#00AE99",
    },
  },
  typography: {
    h1: {
      fontSize: "28px",
      fontWeight: 400,
    },
    h2: {
      fontSize: "25px",
      fontWeight: 400,
    },
    h3: {
      fontSize: "20px",
      fontWeight: 400,
    },
    h4: {
      fontSize: "18px",
      fontWeight: 400,
    },
    body1: {
      fontSize: "16px",
      fontWeight: 400,
    },
    body2: {
      fontSize: "14px",
      fontWeight: 400,
    },
  },
});
