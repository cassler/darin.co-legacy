import * as React from 'react';

interface IHeaderProps {
	darkMode?: boolean,
	color?: string
}

const Header: React.FunctionComponent<IHeaderProps> = ({darkMode, color}) => {
	return (
		<div className="center">
			<h5>Notes from the Lab</h5>
			{JSON.stringify(darkMode)}
			{JSON.stringify(color)}
		</div>
	)
};

export default Header;
