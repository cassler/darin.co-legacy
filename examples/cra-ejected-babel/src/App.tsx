import React, { ReactElement } from "react";
/** @jsx jsx */
import { jsx, ThemeProvider } from "@emotion/react";
import { AirTheme } from "./styles/theme";
import { GlobalStyles } from "./styles/GlobalStyle";
import { Layout } from "./components/Layout";
import { User } from "./types/User";
import data from "../data/users-mock.json";

export default function App(): React.ReactElement {
  const users: User[] = data.slice(0, 10);
  return (
    <ThemeProvider theme={AirTheme}>
      <GlobalStyles />
      <Layout>
        <h1>The Person Finder</h1>
        <p className="page-intro">The description</p>
        <input type="text" placeholder="Type a name..." />
        <div id="results-list">
          {users.map((user) => (
            <h3>{user.name}</h3>
          ))}
        </div>
      </Layout>
    </ThemeProvider>
  );
}
