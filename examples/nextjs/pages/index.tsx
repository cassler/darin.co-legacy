import React, { useEffect, useState } from "react";
import { Layout, Button } from "@cassler/components";
/** @jsx jsx */
import { jsx, css, Global } from "@emotion/core";
import { useTheme } from "emotion-theming";
import { GlobalStyle } from "../lib/theme";
import paragraphs from "../lib/lorem";
import { coinFlip, pickFromHat } from "@cassler/snippets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  faCoffee,
  faCrow,
  faAtlas,
  faMoon,
  faFrog,
  faDove,
  faSun,
} from "@fortawesome/free-solid-svg-icons";

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

const emblems = [faCrow, faMoon, faSun, faFrog, faDove, faCoffee, faAtlas];

export default () => {
  const theme = useTheme();
  const [darkMode, toggleDark] = useState<boolean>(coinFlip());
  const [accent, setAccent] = useState<AccentColor>(pickFromHat(AccentColors));
  const [footer, toggleFooter] = useState<boolean>(true);

  const currentIcon = pickFromHat(emblems);
  const secondIcon = pickFromHat(emblems.filter((i) => i !== currentIcon));

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
  }, [darkMode, accent]);

  return (
    <div>
      <Global styles={GlobalStyle} />
      <Layout
        theme={theme}
        size="small"
        header={
          <div className="center">
            <h5>Notes from the Lab</h5>
          </div>
        }
        footer={
          footer && (
            <div className="center">
              <Button size="small" onClick={() => cycleAccent(accent)}>
                Cycle Color
              </Button>
              <Button
                size="small"
                primary
                onClick={() => toggleDark(!darkMode)}
              >
                <FontAwesomeIcon icon={darkMode ? faMoon : faSun} />
                &nbsp; Use {darkMode ? "Light" : "Dark"} Mode
              </Button>
            </div>
          )
        }
        sidebar={<span>Sidebar</span>}
      >
        <div className="content">
          <h1>
            <FontAwesomeIcon
              icon={currentIcon}
              style={{ color: "var(--primary-color)" }}
            />
            &nbsp;
            <FontAwesomeIcon
              icon={secondIcon}
              style={{ color: "var(--primary-accent)" }}
            />
          </h1>
          <h4>darin.co</h4>
          <PageTitle>
            Making neato internet <br />
            <span style={{ color: "var(--primary-color" }}>
              <em>magic</em>{" "}
            </span>
            since 1999.
          </PageTitle>
          <SubTitle>{paragraphs[0]}</SubTitle>
          <p>{paragraphs[1]}</p>
          <h2>Design for Access</h2>
          <Image
            width="140px"
            right
            url="https://images.unsplash.com/photo-1599921051697-c8d23fb8e65a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
          />
          <p>{paragraphs[2]}</p>
          <p>{paragraphs[3]}</p>
          <p>{paragraphs[4]}</p>
          <h2>Built for Humans</h2>
          <p>{paragraphs[5]}</p>
          <p>{paragraphs[6]}</p>
          <p>{paragraphs[7]}</p>
          <p>{paragraphs[8]}</p>
          <h2>
            Handcrafted in <Strike>Vermont</Strike> Texas
          </h2>
          <p>{paragraphs[9]}</p>
          <Card>
            <p>{paragraphs[3]}</p>
          </Card>
        </div>
      </Layout>
    </div>
  );
};

const Strike = (props) => {
  const styles = {
    textDecoration: "line-through",
  };
  return <span style={styles}>{props.children}</span>;
};

const Image = (props) => {
  const styles = css`
    border-radius: 14px;
    background-clip: padding-box;
    max-width: ${props.width};
    ${props.right &&
    css`
      float: right;
      margin-left: 1rem;
      margin-bottom: 0.5rem;
    `}
    img {
      border-radius: 14px;
      max-width: 100%;
      height: auto;
    }
  `;
  return (
    <div css={styles}>
      <img src={props.url} />
    </div>
  );
};

const Card = (props) => {
  const styles = {
    backgroundColor: "var(--contrast-color)",
    border: "1px solid var(--hint-color)",
    padding: "0.25rem 1.5rem",
    fontSize: "0.9em",
    borderRadius: "5px",
  };
  return <div style={styles}>{props.children}</div>;
};

const PageTitle = (props) => {
  return <h1>{props.children}</h1>;
};
const SubTitle = (props) => {
  const styles = {
    fontSize: "1.333em",
    color: "var(--font-secondary-color)",
  };
  return <span style={styles}>{props.children}</span>;
};

const Caption = (props) => {
  const styles = {
    color: "var(--font-secondary-color)",
    fontSize: "0.9em",
    fontWeight: 400,
  };
  return <p style={styles}>{props.children}</p>;
};
