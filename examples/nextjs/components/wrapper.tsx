import React, { useEffect, useState } from "react";
import { Layout } from "@cassler/components";
/** @jsx jsx */
import { jsx, css, Global, useTheme } from "@emotion/react";
import { GlobalStyle } from "../lib/theme";
import Header from "../components/header";
import Footer from "../components/footer";
import { useColorMode } from "@cassler/hooks";

export const Wrapper: React.FunctionComponent = (props) => {
  const theme = useTheme();
  const [[color, setColor], [darkMode, setDarkMode]] = useColorMode();

  useEffect(() => {
    const currentTheme = darkMode ? "dark" : "light";
    const currentAccent = `${currentTheme} ${color}`;
    document.documentElement.setAttribute("data-theme", currentAccent);
  }, [darkMode, color]);

  return (
    <div>
      <Global styles={GlobalStyle} />
      <Layout
        theme={theme}
        size="small"
        header={<Header darkMode={darkMode} color={color} />}
        footer={
          <Footer
            darkMode={darkMode}
            color={color}
            setDarkMode={setDarkMode}
            setColor={setColor}
          />
        }
        sidebar={<span>Sidebar</span>}
      >
        {props.children}
      </Layout>
    </div>
  );
};

export default Wrapper;
