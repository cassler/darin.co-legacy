import React, { useEffect, useState } from "react";
import { Layout, Button } from "@cassler/components";
/** @jsx jsx */
import { jsx, css, Global } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'
import { theme } from '../lib/theme';

export default () => {

	const [currentTheme, setTheme] = useState(theme);

	return (
		<div>
			<ThemeProvider theme={currentTheme}>
				<Layout
					theme={theme}
					size="small"
					header={<span>Header</span>}
					footer={<span>Footer</span>}
					sidebar={<span>Sidebar</span>}
				>
					<Button>Buttons!</Button>
					<Button>Buttons!</Button>
					<Button ghost>Buttons!</Button>
					<Button primary>Buttons!</Button>
					<Button primary disabled>Buttons!</Button>
					<hr />
					<Button size="small">Buttons!</Button>
					<Button size="small" primary>Buttons!</Button>
					<h5>Your current yeet is:</h5>
				</Layout>
			</ThemeProvider>
		</div>

	)
};
