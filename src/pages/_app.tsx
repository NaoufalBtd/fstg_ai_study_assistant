import {
  CssBaseline,
  CssVarsProvider,
  extendTheme,
  ThemeProvider,
} from "@mui/joy";
import "animate.css";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import React from "react";
import { Toaster } from "react-hot-toast";

const theme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        focusVisible: "#f3fc8a",
        primary: {
          softBg: "#f3fc8a",
          softColor: "#000",
        },
      },
    },
  },
});
const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session | null | undefined }>) => (
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <SessionProvider session={session}>
        <CssBaseline />
        <CssVarsProvider theme={theme} defaultMode="dark">
          <Component {...pageProps} />
          <Toaster />
        </CssVarsProvider>
      </SessionProvider>
    </ThemeProvider>
  </React.StrictMode>
);

export default MyApp;
