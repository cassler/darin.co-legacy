// import App from 'next/app'
import { useState, useEffect } from "react";
import type { AppProps /*, AppContext */ } from "next/app";
import { useColorMode, ColorProvider } from '@cassler/hooks';
import { Tint, Tints } from '@cassler/hooks'

import "../styles/global.scss";

import "@cassler/fonts/src/glosa.css";
import "@cassler/fonts/src/calibre.css";

import { ThemeProvider } from "emotion-theming";
import { theme } from "../lib/theme";

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp;
