import React, { ReactElement } from "react";
/** @jsx jsx */
import { jsx, useTheme } from "@emotion/react";
import { css } from "@emotion/css";

interface Props {}

export default function Header(): React.ReactElement {
  const theme = useTheme();
  const styles = css({
    borderTop: `5px solid ${theme.color.accent}`,
    h1: {
      padding: "20px 0",
      margin: 0,
      lineHeight: 1,
      textAlign: "center",
      img: {
        height: 24,
        width: "auto",
      },
    },
  });
  return (
    <div className={styles}>
      <h1>
        <img src="./air-logo.svg" alt="Air" />
      </h1>
    </div>
  );
}
