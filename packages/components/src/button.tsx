/* eslint-disable no-alert */
import { meaningOfLife } from "@cassler/foo";
import React from "react";
import "./button.css";

export const Button = () => (
	<button
		type="button"
		onClick={() => alert(`the meaning if life is ${meaningOfLife}`)}
	>
		Go
	</button>
);
