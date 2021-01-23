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
        input[type="text"] {
          background-color: ${theme.color.light};
          background-color: ${theme.color.light};
          border-radius: 4px;
          outline: none;
          border: none;
          height: 40px;
          width: 100%;
          padding: 0 16px;
          font-size: 14px;
          letter-spacing: -0.015em;
        }
        input::placeholder {
          color: #393939;
        }
      `}
    />
  );
}
