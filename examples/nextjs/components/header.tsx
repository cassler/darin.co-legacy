import * as React from 'react';
import Link from 'next/link'

interface IHeaderProps {
	darkMode?: boolean,
	color?: string
}

const Header: React.FunctionComponent<IHeaderProps> = ({darkMode, color}) => {
	return (
		<div className="center">
			<h5>Notes from the Lab</h5>
			<Link href="/about">About</Link>
			<Link href="/">Base</Link>
			{JSON.stringify(darkMode)}
			{JSON.stringify(color)}
		</div>
	)
};

export default Header;
