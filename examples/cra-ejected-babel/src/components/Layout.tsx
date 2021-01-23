import React from "react";
/** @jsx jsx */
import { jsx, useTheme } from "@emotion/react";
import { css } from "@emotion/css";
import Header from "./Header";
import styled from "@emotion/styled";

export const Layout: React.FC = ({ children }) => {
  const theme = useTheme();
  const MainDiv = styled.main`
    max-width: ${theme.containerWidth};
    margin-right: auto;
    margin-left: auto;
    padding: 20;
    font-family: ${theme.fonts.sans};

    .page-title {
      font-family: ${theme.fonts.serif};
      font-size: 40;
      font-weight: normal;
      line-height: 110%;
      font-feature-settings: "case" on;
      color: ${theme.color.headerColor};
    }
  `;

  const styles = css({
    main: {
      maxWidth: theme.containerWidth,
      marginLeft: "auto",
      marginRight: "auto",
      padding: 20,
    },
    fontFamily: theme.fonts.sans,
  });
  return (
    <div className={styles}>
      <Header />
      <MainDiv>{children}</MainDiv>
    </div>
  );
};
