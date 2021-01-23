import { css } from "@emotion/css";
import { useTheme } from "@emotion/react";
import React, { ReactElement, useState } from "react";
import ResultList from "./ResultList";

export default function PersonFinder(): ReactElement {
  const [query, setQuery] = useState<string>("");

  const theme = useTheme();
  const inputStyle = css({
    backgroundColor: theme.color.light,
    borderRadius: 4,
    outline: "none",
    border: "none",
    height: 40,
    width: "100%",
    padding: "0 16px",
    fontSize: 14,
    letterSpacing: "-0.015em",
  });

  return (
    <div>
      <input
        className={inputStyle}
        type="text"
        onChange={(evt) => setQuery(evt.target.value)}
        defaultValue={query}
        placeholder="Type a name..."
      />
      <ResultList query={query} />
    </div>
  );
}
