import React, { ReactElement } from "react";
/** @jsx jsx */
import { jsx, Global, useTheme } from "@emotion/react";
import { css } from "@emotion/css";

export function GlobalStyles(): React.ReactElement {
  const theme = useTheme();
  return (
    <Global
      styles={css`
        *,
        * + * {
          box-sizing: border-box;
          padding: 0;
        }
        body,
        html,
        #root {
          font-family: ${theme.fonts.sans};
          padding: 0;
          margin: 0;
          --accent: ${theme.color.accent};
          --air-brand: ${theme.color.airBrand};
          --dark: ${theme.color.darkColor};
          --base: ${theme.color.baseColor};
          --mid: ${theme.color.mid};
        }

        .page-intro {
          font-size: 16px;
          line-height: 24px;
          font-weight: 400;
          color: ${theme.color.darkColor};
          letter-spacing: -0.015em;
        }
      `}
    />
  );
}
