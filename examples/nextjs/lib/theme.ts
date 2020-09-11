import { colors } from "@cassler/color";
import Color from "color";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";

export const theme = {
  color: {
    bg: colors.gray[0],
    text: colors.violet[5],
    secondary: colors.gray[6],
    muted: colors.gray[4],
    error: colors.red[5],
  },
  link: {
    primary: colors.indigo[7],
    visited: colors.grape[6],
    hover: colors.indigo[5],
  },
};

export const GlobalStyle = css`
  html {
    --primary-color: rgba(21, 206, 95, 1);
    --secondary-color: #536390;
    --font-color: #424242;
    --font-secondary-color: #727272;
    --bg-color: #eee;
    --heading-color: #292922;
    --ui-color: rgba(21, 206, 95, 1);
    --font-body: "Calibre";
    --font-alt: "Glosa Display";
    --font-accent: "GT America Expanded Black Italic";
    --highlight: rgba(21, 206, 95, 0.1);
  }

  [data-theme*="blue"] {
    --primary-color: #302ae6;
    --secondary-color: #536390;
    --highlight: ${Color(colors.blue[2]).lighten(0.1).fade(1).hex()};
  }
  [data-theme*="indigo"] {
    --primary-color: ${colors.indigo[5]};
    --secondary-color: ${colors.indigo[4]};
    --highlight: ${Color(colors.indigo[2]).lighten(0.1).fade(1).hex()};
  }
  [data-theme*="orange"] {
    --primary-color: ${colors.orange[5]};
    --secondary-color: ${colors.orange[4]};
    --highlight: ${Color(colors.orange[2]).lighten(0.1).fade(1).hex()};
  }
  [data-theme*="violet"] {
    --primary-color: ${colors.violet[5]};
    --secondary-color: ${colors.violet[4]};
    --highlight: ${Color(colors.violet[2]).lighten(0.1).fade(1).hex()};
  }
  [data-theme*="grape"] {
    --primary-color: ${colors.grape[5]};
    --secondary-color: ${colors.grape[4]};
    --highlight: ${Color(colors.grape[2]).lighten(0.1).fade(1).hex()};
  }
  [data-theme*="teal"] {
    --primary-color: ${colors.teal[5]};
    --secondary-color: ${colors.teal[4]};
    --highlight: ${Color(colors.teal[2]).lighten(0.1).fade(1).hex()};
  }
  [data-theme*="dark"] {
    --primary-color: rgba(74, 242, 161, 1);
    --secondary-color: #818cab;
    --font-color: #e1e1ff;
    --font-secondary-color: #b1b1cc;
    --bg-color: #161625;
    --heading-color: #818cab;
    --bg-color: l(#ccc, 90%);
    --highlight: ${Color(colors.blue[2]).fade(1).hex()};
  }
  [data-theme*="dark"][data-theme*="blue"] {
    --primary-color: ${colors.blue[3]};
    --secondary-color: ${colors.blue[6]};
    --font-secondary-color: ${Color(colors.blue[3])
      .desaturate(0.85)
      .darken(0.1)
      .hex()};
    --bg-color: ${Color(colors.blue[9]).darken(0.7).hex()};
    --highlight: ${Color(colors.blue[9]).darken(0.5).fade(0.8).hex()};
  }
  [data-theme*="dark"][data-theme*="indigo"] {
    --primary-color: ${colors.indigo[3]};
    --secondary-color: ${colors.indigo[5]};
    --font-secondary-color: ${Color(colors.indigo[3])
      .desaturate(0.85)
      .darken(0.1)
      .hex()};
    --bg-color: ${Color(colors.indigo[9]).darken(0.7).hex()};
    --highlight: ${Color(colors.indigo[9]).darken(0.5).fade(0.8).hex()};
  }
  [data-theme*="dark"][data-theme*="orange"] {
    --primary-color: ${colors.orange[3]};
    --secondary-color: ${colors.orange[5]};
    --font-secondary-color: ${Color(colors.orange[3])
      .desaturate(0.85)
      .darken(0.1)
      .hex()};
    --bg-color: ${Color(colors.orange[9]).darken(0.7).hex()};
    --highlight: ${Color(colors.orange[9]).darken(0.5).fade(0.8).hex()};
  }
  [data-theme*="dark"][data-theme*="violet"] {
    --primary-color: ${colors.violet[3]};
    --secondary-color: ${colors.violet[6]};
    --font-secondary-color: ${Color(colors.violet[3])
      .desaturate(0.85)
      .darken(0.1)
      .hex()};
    --bg-color: ${Color(colors.violet[9]).darken(0.7).hex()};
    --highlight: ${Color(colors.violet[9]).darken(0.5).fade(0.8).hex()};
  }
  [data-theme*="dark"][data-theme*="grape"] {
    --primary-color: ${colors.grape[3]};
    --secondary-color: ${colors.grape[5]};
    --font-secondary-color: ${Color(colors.grape[3])
      .desaturate(0.85)
      .darken(0.1)
      .hex()};
    --bg-color: ${Color(colors.grape[9]).darken(0.7).hex()};
    --highlight: ${Color(colors.grape[9]).darken(0.5).fade(0.8).hex()};
  }
  [data-theme*="dark"][data-theme*="teal"] {
    --primary-color: ${colors.teal[3]};
    --secondary-color: ${colors.teal[5]};
    --font-secondary-color: ${Color(colors.teal[3])
      .desaturate(0.85)
      .darken(0.1)
      .hex()};
    --bg-color: ${Color(colors.teal[9]).darken(0.7).hex()};
    --highlight: ${Color(colors.teal[9]).darken(0.5).fade(0.8).hex()};
  }
  html,
  body {
    background-color: var(--bg-color);
    font-family: var(--font-body);
    color: var(--font-color);
    max-width: 90%;
    margin: 0 auto;
    font-size: calc(1rem + 0.25vh);
    transition: 0.2s all;
  }

  p em {
    background-color: var(--highlight);
    font-weight: 500;
    padding: 0 2px;
    letter-spacing: -0.0166em;
  }
`;
