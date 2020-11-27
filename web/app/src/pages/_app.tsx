import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { AppProps } from "next/app";
import React from "react";

const theme = createMuiTheme();

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
        </ThemeProvider>
    );
}
