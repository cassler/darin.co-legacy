// import App from 'next/app'
import { useState } from "react";
import type { AppProps /*, AppContext */ } from "next/app";
import "../styles/global.scss";
// import "@cassler/fonts/dist/main.css";

// import "../../../packages/gt-nacirema/src/gt-font.css";
// import "../../../packages/fonts/dist/main.css";
import "../../../packages/fonts/src/glosa.css";
import "../../../packages/fonts/src/calibre.css";
// import "@cassler/fonts/dist/main.css";

import { ThemeProvider } from "emotion-theming";
import { theme } from "../lib/theme";

function MyApp({ Component, pageProps }: AppProps) {
  const [currentTheme, setTheme] = useState(theme);
  return (
    <ThemeProvider theme={currentTheme}>
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