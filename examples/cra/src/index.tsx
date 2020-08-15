import React from "react";
import ReactDOM from "react-dom";
import { meaningOfLife } from "@cassler/foo";
import { Button } from "@cassler/components";
import "./index.css"
import { motion } from "framer-motion"
ReactDOM.render(
	<React.StrictMode>
		<div className='banner'>darin.co</div>
		<div className="content">
			<motion.div
				initial={{ scale: 0.9, y: 100, opacity: 0 }}
				animate={{ scale: 1, y: 0, opacity: 1 }}
				transition={{ ease: "easeOut", duration: 1.5 }}
			>
				<p>If you have an existing application you'll need to install a few packages to make everything work well together. We are using <em>the babel-jest package</em> and the react babel preset to transform our code inside of the test environment. Also see using babel.</p>
			</motion.div>
			<motion.div
				initial={{ scale: 0.9, y: 100, opacity: 0 }}
				animate={{ scale: 1, y: 0, opacity: 1 }}
				transition={{ ease: "easeOut", duration: 1.5, delay: .5 }}
			>
				<p className="muted">
					Now let's use <strong>React's test renderer</strong> and Jest's snapshot feature to interact with the component and capture the rendered output and create a snapshot file:
		</p>
			</motion.div>
			<motion.div
				initial={{ scale: 0.9, y: 100, opacity: 0 }}
				animate={{ scale: 1, y: 0, opacity: 1 }}
				transition={{ ease: "easeOut", duration: 1.5, delay: 1 }}
			>
				<p className="sub">
					Now let's use React's test renderer and Jest's snapshot feature to interact with the component and capture the rendered output and create a snapshot file:
		</p>
			</motion.div>
			<motion.div
				initial={{ scale: 1, y: 10, opacity: 0 }}
				animate={{ scale: 1, y: 0, opacity: 1 }}
				transition={{ ease: "easeOut", duration: 0.5, delay: 4.5 }}
			>
				<Button label="Get some" size="large" onClick={() => { }} primary={false} backgroundColor="#111" />
			</motion.div>
			<p className="body">
				Now let's use React's test renderer and Jest's snapshot feature to interact with the component and capture the rendered output and create a snapshot file:
		</p>
		</div>
	</React.StrictMode>,
	document.getElementById("root")
);
