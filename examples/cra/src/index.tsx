import React from "react";
import ReactDOM from "react-dom";
import { meaningOfLife } from "@nighttrax/foo";
import { Button, MicroSweeper } from "@cassler/components";

ReactDOM.render(
	<React.StrictMode>
		<h3>{meaningOfLife}</h3>
		<MicroSweeper size={8} difficulty={0.9} />
		<Button label="My Button" onClick={() => console.log('hah')} />
	</React.StrictMode>,
	document.getElementById("root")
);
