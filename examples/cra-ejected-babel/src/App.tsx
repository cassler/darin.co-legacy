import React, { ReactElement } from "react";
/** @jsx jsx */
import { jsx, ThemeProvider } from "@emotion/react";
import { AirTheme } from "./styles/theme";
import { GlobalStyles } from "./styles/GlobalStyle";
import { Layout } from "./components/Layout";
import PersonFinder from "./components/PersonFinder";

export default function App(): React.ReactElement {
  return (
    <ThemeProvider theme={AirTheme}>
      <GlobalStyles />
      <Layout>
        <h1 className="page-title">The Person Finder</h1>
        <p className="page-intro">The description</p>
        <PersonFinder />
      </Layout>
    </ThemeProvider>
  );
}
