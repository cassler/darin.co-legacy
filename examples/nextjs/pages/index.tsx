import React, { useEffect, useState } from "react";
import { Layout } from "@cassler/components";
/** @jsx jsx */
import { jsx, css, Global } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'
import { theme } from '../lib/theme';

export default () => {

	return (
		<div>
			<ThemeProvider theme={theme}>
				<Layout
					theme={theme}
					size="small"
					header={<span>Header</span>}
					footer={<span>Footer</span>}
					sidebar={<span>Sidebar</span>}
				>
					<h5>Your current yeet is:</h5>
				</Layout>
			</ThemeProvider>
		</div>

	)
};
