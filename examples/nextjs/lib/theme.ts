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

/**
 * We want to apply the same template for each color variation
 * This reduces duplicate code.
 */
const colorOptions = ["indigo", "orange", "teal", "blue", "grape", "violet"];
const lightColors = colorOptions.map((color) => {
  let currentHue = colors[color];
  return css`
    [data-theme*="${color}"] {
      --primary-color: ${currentHue[5]};
			--primary-accent: ${Color(currentHue[3]).lighten(0.15).hex()};
      --secondary-color: ${currentHue[4]};
      --highlight: ${Color(currentHue[2]).lighten(0.1).fade(1).hex()};
    }
		[data-theme*="dark"][data-theme*="${color}"] {
    --primary-color: ${currentHue[3]};
    --secondary-color: ${currentHue[6]};
		--primary-accent: ${Color(currentHue[5]).darken(0.3).desaturate(0.7).hex()};
    --font-secondary-color: ${Color(currentHue[3])
      .desaturate(0.85)
      .darken(0.1)
      .hex()};
    --bg-color: ${Color(currentHue[9]).darken(0.7).hex()};
    --highlight: ${Color(currentHue[9]).darken(0.5).fade(0.8).hex()};
  }
  `;
});

export const GlobalStyle = css`
  html {
    --primary-color: rgba(21, 206, 95, 1);
    --primary-accent: rgba(21, 206, 95, 0.5);
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
  ${lightColors}
  [data-theme*="dark"] {
    --primary-color: rgba(74, 242, 161, 1);
    --primary-accent: rgba(21, 206, 95, 0.5);
    --secondary-color: #818cab;
    --font-color: #e1e1ff;
    --font-secondary-color: #b1b1cc;
    --bg-color: #161625;
    --heading-color: #818cab;
    --bg-color: l(#ccc, 90%);
    --highlight: ${Color(colors.blue[2]).fade(1).hex()};
  }
  html,
  body {
    background-color: var(--bg-color);
    font-family: var(--font-body);
    color: var(--font-color);
    max-width: 95%;
    margin: 0 auto;
    font-size: calc(1rem + 0.25vh);
    transition: 0.2s all;
    -webkit-font-smoothing: antialiased;
  }
  h1,
  h2,
  h3,
  h4,
  h5 {
    font-family: var(--font-alt);
    letter-spacing: -0.01666em;
  }
  p em {
    background-color: var(--highlight);
    font-weight: 500;
    padding: 0 2px;
    letter-spacing: -0.0166em;
  }
  a:link {
    color: var(--primary-color);
    font-weight: 500;
    text-decoration: none;
    border-bottom: 2px solid var(--primary-accent);
  }
  div.content {
    max-width: 40rem;
    margin-left: auto;
    margin-right: auto;
  }
`;
