import React, { useEffect, useState } from "react";
// import { MicroSweeper, Button, Layout } from "@cassler/components";
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'
import { colors, theme } from '@cassler/color';

export default () => {

	return (
		<div>
			<ThemeProvider theme={theme}>
				<h2 css={theme => ({ color: theme.color.error })}>Heading TWOOO</h2>
				<h5>Your current yeet is:</h5>
				<h1>Darin.co</h1>
			</ThemeProvider>
		</div>

	)
};
