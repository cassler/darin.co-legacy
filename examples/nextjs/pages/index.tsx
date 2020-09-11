import React, { useEffect, useState } from "react";
import { Layout, Button } from "@cassler/components";
/** @jsx jsx */
import { jsx, css, Global } from "@emotion/core";
import { useTheme } from "emotion-theming";
import { GlobalStyle } from "../lib/theme";
import paragraphs from "../lib/lorem";

export type AccentColor =
  | "blue"
  | "indigo"
  | "orange"
  | "violet"
  | "grape"
  | "teal";
export const AccentColors: AccentColor[] = [
  "blue",
  "indigo",
  "orange",
  "violet",
  "grape",
  "teal",
];

export default () => {
  const theme = useTheme();
  const [darkMode, toggleDark] = useState<boolean>(true);
  const [accent, setAccent] = useState<AccentColor>("blue");

  function cycleAccent(current: AccentColor) {
    let cursor = AccentColors.indexOf(current) + 1;
    if (cursor === AccentColors.length) {
      setAccent(AccentColors[0]);
    } else {
      setAccent(AccentColors[cursor]);
    }
  }
  useEffect(() => {
    let currentTheme = darkMode ? "dark" : "light";
    let currentAccent = `${currentTheme} ${accent}`;
    document.documentElement.setAttribute("data-theme", currentAccent);
  }, [toggleDark, darkMode, accent, setAccent]);

  useEffect(() => {
    document.documentElement.setAttribute("data-accent", accent);
  }, [setAccent, accent]);

  return (
    <div>
      <Global styles={GlobalStyle} />
      <Layout
        theme={theme}
        size="small"
        header={<span></span>}
        footer={<span>++</span>}
        sidebar={<span>Sidebar</span>}
      >
        <h1
          style={{
            fontFamily: "var(--font-alt)",
            fontWeight: 900,
            lineHeight: "1.0em",
          }}
        >
          Whenever the{" "}
          <span style={{ color: "var(--primary-color" }}>{accent}</span> <br />
          happens, be ready for it.
        </h1>
        <p>{paragraphs[0]}</p>

        <p
          style={{
            color: "var(--font-secondary-color)",
            fontSize: "0.9em",
            fontWeight: 400,
          }}
        >
          {paragraphs[1]}
        </p>

        <p>{paragraphs[2]}</p>
        <p>
          {paragraphs[1]} <em>There is no way to do this.</em>
        </p>
        <p>{paragraphs[3]}</p>
        <Button onClick={() => cycleAccent(accent)}>Cycle Color</Button>
        <Button onClick={() => toggleDark(!darkMode)}>
          Use {darkMode ? "Light" : "Dark"} Mode
        </Button>
      </Layout>
    </div>
  );
};
