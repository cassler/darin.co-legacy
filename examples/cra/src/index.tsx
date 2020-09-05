import React from "react";
import ReactDOM from "react-dom";
import { meaningOfLife } from "@nighttrax/foo";
import { Button } from "@cassler/components";

ReactDOM.render(
	<React.StrictMode>
		<h3>{meaningOfLife}</h3>
		<Button label="My Button" onClick={() => console.log('hah')} />
	</React.StrictMode>,
	document.getElementById("root")
);
