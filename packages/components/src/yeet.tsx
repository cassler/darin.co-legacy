import React, { useState, useEffect } from 'React';


export function Yeet() {
	const [comment, setComment] = useState<string>();
	const newKanye = () => {
		fetch('https://api.kanye.rest')
			.then((res) => res.json())
			.then(data => setComment(data.quote))
	}
	useEffect(() => {
		newKanye()
	}, [])

	return (
		<>{comment}</>
	)
}

export default Yeet;
