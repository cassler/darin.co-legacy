import React, { useEffect, useState } from "react";
import { MicroSweeper, Button, Layout } from "@cassler/components";
import { motion } from "framer-motion"

export default () => {
	const [comment, setComment] = useState<string>();
	const newKanye = () => {
		fetch('https://api.kanye.rest')
			.then((res) => res.json())
			.then(data => setComment(data.quote))
	}
	useEffect(() => {
		newKanye()
	}, [])

	const variants = {
		hidden: { opacity: 0.5, scale: 1.02 },
		visible: {
			opacity: 1,
			scale: 1
		},
	}

	const bgStages = [
		'radial-gradient(ellipse at top left, rgba(255, 105, 19, 1.00), rgba(255, 125, 29, 1.00), rgba(215, 75, 19, 1.00)',
		'radial-gradient(ellipse at top left, rgba(240, 93, 99, 1.00), rgba(230, 83, 89, 1.00), rgba(200, 78, 82, 1.00))',
	]

	return (
		<motion.div
			// initial="start"
			animate={{ background: bgStages }}
			transition={{ yoyo: Infinity, duration: 7 }}
		>
			<Layout>
				<MicroSweeper size={20} difficulty={0.8} />
				<h5>Your current yeet is:</h5>
				<motion.div
					initial="hidden"
					animate="visible"
					exit="hidden"
					transition={{ yoyo: Infinity, duration: 2 }}
					variants={variants} >
					<h1 style={{ fontSize: 48 }}>{comment}</h1>
				</motion.div>
				<Button onClick={newKanye} label="I am the greatest" />
			</Layout>
		</motion.div>
	)
};
