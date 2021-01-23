import React, { ReactElement } from "react";
/** @jsx jsx */
import { jsx, ThemeProvider } from "@emotion/react";
import { AirTheme } from "./styles/theme";
import { GlobalStyles } from "./styles/GlobalStyle";
import { Layout } from "./components/Layout";
import PersonFinder from "./components/PersonFinder";
import { siteName, summary } from "../data/settings.json";

export default function App(): React.ReactElement {
  return (
    <ThemeProvider theme={AirTheme}>
      <GlobalStyles />
      <Layout>
        <h1 className="page-title">{siteName}</h1>
        <p className="page-intro">{summary}</p>
        <PersonFinder />
      </Layout>
    </ThemeProvider>
  );
}
