import React from "react";
/** @jsx jsx */
import { jsx, useTheme } from "@emotion/react";
import { css } from "@emotion/css";
import Header from "./Header";

export const Layout: React.FC = ({ children }) => {
  const theme = useTheme();
  const styles = css({
    main: {
      maxWidth: theme.containerWidth,
      marginLeft: "auto",
      marginRight: "auto",
      padding: 20,
      h1: {
        fontFamily: theme.fonts.serif,
        fontSize: 40,
        fontWeight: "normal",
        lineHeight: "110%",
        fontFeatureSettings: `'case' on`,
        color: theme.color.headerColor,
      },
    },
    fontFamily: theme.fonts.sans,
  });
  return (
    <div className={styles}>
      <Header />
      <main>{children}</main>
    </div>
  );
};
