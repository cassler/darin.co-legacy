import React, { useState, useEffect, useMemo } from 'react';
import { Button, LabLogo, List } from "@cassler/components";
import { motion } from "framer-motion"
import faker from 'faker';

function App() {

	/** How to Dark Mode */
	const [darkMode, toggleDarkMode] = useState(true);
	const [data, setData] = useState<any[]>([])
	// Grab any saved theme from localStorage
	useEffect(() => {
		let savedTheme = localStorage.getItem('cassler-app-theme');
		if (savedTheme === 'dark') toggleDarkMode(true);
		toggleDarkMode(false);
	}, [])
	useEffect(() => {
		let currentTheme = darkMode ? 'dark' : 'light'
		document.body.className = currentTheme;
	}, [darkMode, data])



	return (
		<div className="app-container">
			<a href='' onClick={() => toggleDarkMode(!darkMode)}><LabLogo title="darin" /></a>
			<div className="content">
				<List header="header of the list" footer={(
					<>
						<Button label="Save Post" size="small" primary />&nbsp;
						<Button label="Edit" size="small" />&nbsp;
						<Button label="Next" size="small" ghost disabled />
					</>
				)}>
					<p>Dolores perferendis qui illo impedit. Exercitationem laborum ad similique est molestiae iure rem culpa. Sunt quibusdam voluptatibus illum aliquid aut esse voluptatibus. Ut est sapiente id qui.</p>
				</List>
				<br />
				<List header="header of the list" footer={(
					<>
						<Button label="New Post" size="small" disabled ghost />&nbsp;
						<Button label="Edit" size="small" disabled ghost />&nbsp;
						<Button label="Next" size="small" ghost disabled />
					</>
				)}>
					<p>Dolores perferendis qui illo impedit. Exercitationem laborum ad similique est molestiae iure rem culpa. Sunt quibusdam voluptatibus illum aliquid aut esse voluptatibus. Ut est sapiente id qui.</p>
				</List>
				<motion.div
					initial={{ scale: 1, y: 25, opacity: 0 }}
					animate={{ scale: 1, y: 0, opacity: 1 }}
					transition={{ ease: "easeOut", duration: 1, delay: .25 }}
				>
					<p className="muted">
						Now let's use <strong>React's test renderer</strong> and Jest's snapshot feature to interact with the component and capture the rendered output and create a snapshot file:
					</p>
					<p className="sub">
						Now let's use React's test renderer and Jest's snapshot feature to interact with the component and capture the rendered output and create a snapshot file:
					</p>
				</motion.div>

				<motion.div
					initial={{ scale: 1, y: 25, opacity: 0 }}
					animate={{ scale: 1, y: 0, opacity: 1 }}
					transition={{ ease: "easeOut", duration: 1, delay: 0.5 }}
				>
					<Button label="Source" primary />&nbsp;
					<Button label="Find out more" />&nbsp;
					<Button label="Let's talk" ghost={true} onClick={() => toggleDarkMode(!darkMode)} />
				</motion.div>
				<p className="body">
					Now let's use React's test renderer and Jest's snapshot feature to interact with the component and capture the rendered output and create a snapshot file:
		</p>
			</div>
		</div>
	)
}

export default App;
