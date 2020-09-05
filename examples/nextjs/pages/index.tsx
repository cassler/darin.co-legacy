import React, { useEffect, useState } from "react";
import { MicroSweeper, Button, Layout } from "@cassler/components";
import { motion } from "framer-motion"

export default () => {
	// const [comment, setComment] = useState<string>();
	// const newKanye = () => {
	// 	fetch('https://api.kanye.rest')
	// 		.then((res) => res.json())
	// 		.then(data => setComment(data.quote))
	// }
	// useEffect(() => {
	// 	newKanye()
	// }, [])

	return (

		<div>
			<MicroSweeper size={20} difficulty={0.9} />
			<h5>Your current yeet is:</h5>
		</div>

	)
};
