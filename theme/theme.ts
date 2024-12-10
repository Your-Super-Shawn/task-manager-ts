import { createTheme } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#f48fb1",
    },
    secondary: {
      main: "#90caf9",
    },
    background: {
      default: "#171717",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0b0b0",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
});

export default darkTheme;
