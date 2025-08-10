import React, { PropsWithChildren } from "react";
import {
  createTheme,
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          transition: "none !important",
          animation: "none !important",
        },
      },
    },
    MuiDialog: {
      defaultProps: {},
      styleOverrides: {
        root: {},
      },
    },
    MuiFormControl: {
      defaultProps: {
        fullWidth: true,
      },
      styleOverrides: {
        root: {
          marginBottom: "10px",
        },
      },
    },
    MuiFormLabel: {
      defaultProps: {
        className: "testProps",
      },
      styleOverrides: {
        root: {
          fontWeight: "bold",
          marginBottom: "6px",
          color: "black",
        },
      },
    },
  },
});

function MuiThemeProvider({ children }: PropsWithChildren<{}>) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default MuiThemeProvider;
