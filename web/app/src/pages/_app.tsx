import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { AppProps } from "next/app";
import React from "react";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#212121',
        },
        secondary: {
            main: '#008AA4',
        },
        type: 'dark',
    },
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
        </ThemeProvider>
    );
}
