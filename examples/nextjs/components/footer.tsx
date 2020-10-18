import * as React from 'react';
import { Button } from "@cassler/components";
import { Tints } from '@cassler/hooks'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";


interface IFooterProps {
	color: string,
	darkMode: boolean,
	setColor: Function,
	setDarkMode: Function
}


const Footer: React.FunctionComponent<IFooterProps> = ({darkMode, color, setColor, setDarkMode}) => {

	function cycleAccent(current: string) {
    let cursor = Tints.indexOf(current) + 1;
    if (cursor === Tints.length) {
      setColor(Tints[0]);
    } else {
      setColor(Tints[cursor]);
    }
  }

	return (
		<div className="center">
			<Button size="small" onClick={() => cycleAccent(color)}>
				Cycle Color
			</Button>
			<Button
				size="small"
				primary
				onClick={() => setDarkMode(!darkMode)}
			>
				<FontAwesomeIcon icon={darkMode ? faMoon : faSun} />
				&nbsp; Use {darkMode ? "Light" : "Dark"} Mode
			</Button>
		</div>
	)
};

export default Footer;
