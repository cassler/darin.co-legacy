import React, { useState, useEffect, useMemo } from 'react';
import { MicroSweeper } from '@cassler/components';

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
			<div className="content">
				<h1><small>Lets play</small><br />MicroSweeper</h1>
				<MicroSweeper size={30} difficulty={0.8} />
			</div>
		</div>
	)
}

export default App;
