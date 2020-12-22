/* eslint-disable no-alert */
import * as React from 'react';
import Link from 'next/link'
import styled from "@emotion/styled";

interface IHeaderProps {
  darkMode?: boolean,
  color?: string
}

const HeaderDiv = styled.div`
  text-align:center;
  nav {
    display: grid;
    grid-template-columns: 85px 85px 85px 85px;
    justify-content: center;
    a { padding: 10px }
  }
`;

const Header: React.FunctionComponent<IHeaderProps> = ({ darkMode, color }) => {

  return (
    <HeaderDiv>
      <h5>Notes from the Lab</h5>
      <nav>
        <div><Link href="/about">About</Link></div>
        <div><Link href="/">Base</Link></div>
        <div>{JSON.stringify(darkMode)}</div>
        <div>{JSON.stringify(color)}</div>
      </nav>
    </HeaderDiv>
  )
};

export default Header;
