import React from "react";
import ReactDOM from "react-dom";
import { meaningOfLife } from "@cassler/foo";
import { Button } from "@cassler/components";
import "./index.css"

ReactDOM.render(
	<React.StrictMode>
		<div className='banner'>darin.co</div>
		<div className="content">
			<p>If you have an existing application you'll need to install a few packages to make everything work well together. We are using <em>the babel-jest package</em> and the react babel preset to transform our code inside of the test environment. Also see using babel.</p>
			<p className="muted">
				Now let's use <strong>React's test renderer</strong> and Jest's snapshot feature to interact with the component and capture the rendered output and create a snapshot file:
		</p>
			<p className="sub">
				Now let's use React's test renderer and Jest's snapshot feature to interact with the component and capture the rendered output and create a snapshot file:
		</p>
			<Button />
		</div>
	</React.StrictMode>,
	document.getElementById("root")
);
