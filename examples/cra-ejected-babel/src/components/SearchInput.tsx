/** @jsx jsx */
import { jsx, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import * as React from "react";

interface ISearchInputProps {
  updateQuery: (str: string) => void;
}

const SearchInput: React.FunctionComponent<ISearchInputProps> = ({
  updateQuery,
}) => {
  const theme = useTheme();

  const SearchDiv = styled.div`
    input[type="text"] {
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
      color: ${theme.color.placeholderColor}; // Figma #393939 not #333333
    }
  `;

  return (
    <SearchDiv>
      <input
        type="text"
        id="search-input"
        onChange={(evt) => {
          updateQuery(evt.target.value);
        }}
        placeholder="Type a name..."
      />
    </SearchDiv>
  );
};

export default SearchInput;
