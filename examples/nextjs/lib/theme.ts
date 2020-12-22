import { colors } from "@cassler/color";
import Color from "color";

/** @jsx jsx */
import { css, jsx } from "@emotion/react";

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
			--primary-accent: ${Color(currentHue[2]).hex()};
			--hint-color: ${Color(currentHue[2]).hex()};
      --secondary-color: ${currentHue[4]};
			--heading-color: ${Color(currentHue[9]).hex()};
			--heading-color-alt: ${Color(currentHue[9]).darken(0.9).hex()};
			--font-color: ${Color(currentHue[9]).desaturate(0.5).darken(0.5).hex()};
    	--font-secondary-color: ${Color(currentHue[9])
      .desaturate(0.5)
      .darken(0.5)
      .hex()};
      --highlight: ${Color(currentHue[2]).lighten(0.1).fade(1).hex()};
    }
		[data-theme*="dark"][data-theme*="${color}"] {
    --primary-color: ${currentHue[3]};
		--primary-accent: ${Color(currentHue[9]).hex()};
    --secondary-color: ${currentHue[6]};
		--heading-color: ${Color(currentHue[1]).hex()};
		--heading-color-alt: ${Color(currentHue[1]).lighten(0.2).hex()};
		--font-color: ${Color(currentHue[0]).desaturate(0.5).darken(0.1).hex()};
    --font-secondary-color: ${Color(currentHue[0]).hex()};
    --bg-color: ${Color(currentHue[9]).darken(0.7).hex()};
		--contrast-color: ${Color(currentHue[9]).darken(0.8).hex()};
		--hint-color: ${Color(currentHue[8]).darken(0.5).hex()};
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
    --contrast-color: #f9f9f9;
    --hint-color: rgba(21, 206, 95, 0.5);
    --ui-color: rgba(21, 206, 95, 1);
    --font-body: "MNL", system-ui, -apple-system, "Calibre";
    --font-alt: "MNL";
    --font-accent: "MNL";
    --highlight: rgba(21, 206, 95, 0.1);
    --grid-unit: 1rem;
    --content-width: 95%;
    --line-width: 38rem;
  }
  [data-theme*="dark"] {
    --primary-color: rgba(74, 242, 161, 1);
    --primary-accent: rgba(21, 206, 95, 0.5);
    --secondary-color: #818cab;
    --font-color: #e1e1ff;
    --font-secondary-color: #b1b1cc;
    --bg-color: #161625;
    --contrast-color: #161624;
    // --heading-color: #818cab;
    --ui-color: rgba(21, 206, 95, 1);
    //  --font-body: "Calibre";
    //  --font-alt: "Glosa Display";
    //  --font-accent: "GT America Expanded Black Italic";
    --highlight: rgba(21, 206, 95, 0.1);
  }
  ${lightColors}
`;
