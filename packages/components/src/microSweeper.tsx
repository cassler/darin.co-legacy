import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Button } from '@cassler/components'


export interface MicroSweeperProps {
	size: number,
	difficulty: number
}

export interface MicronPropsI {
	row: number,
	col: number,
	bomb: boolean,
	clicked: boolean,
	visible: boolean,
	index: number,
	proximity: number | null
}


export const MicroSweeper: React.FC<MicroSweeperProps> = ({ size = 12, difficulty = 0.85 }) => {
	const [microns, setMicrons] = useState<MicronPropsI[]>([]);
	const [score, setScore] = useState(0)
	const empty = Array.from(Array(size * size).keys());

	useEffect(() => {
		let initialBoard = empty.map(index => getMicron(index));
		let defaultBoard = initialBoard.map(i => ({
			...i,
			proximity: countBombs(getNeighbors(i, initialBoard))
		}))
		setMicrons(defaultBoard)
	}, [])

	const getMicron = (index: number): MicronPropsI => {
		const row = (Math.floor(index / size));
		return {
			index,
			bomb: Math.random() >= difficulty,
			row: (Math.floor(index / size)) + 1,
			col: index - (row * size) + 1,
			clicked: false,
			visible: false,
			proximity: null
		}
	}

	function getNeighbors(item: MicronPropsI, source: MicronPropsI[]): MicronPropsI[] {
		const { index, col } = item;
		const raw = [
			// Abovvr
			index > size && source[index - size],
			col > 1 && source[index - size - 1],
			col < size && source[index - size + 1],
			// To the sides
			col > 1 && source[index - 1],
			col < size && source[index + 1],
			// Below
			index < (size * size - size) && source[index + size],
			col < size && source[index + size + 1],
			col > 1 && source[index + size - 1],
		].filter(Boolean) as MicronPropsI[]

		return raw;

	}

	function countBombs(neighbors: MicronPropsI[]) {
		return neighbors.filter(i => i.bomb === true).length
	}

	async function updateMicron(item: MicronPropsI) {
		const { index } = item;
		await setMicrons([
			...microns.slice(0, index),
			item,
			...microns.slice(index + 1, 999),
		])
	}

	function checkMicron(item: MicronPropsI): {
		next: MicronPropsI[],
	} | void {
		if (item.clicked) return;
		updateMicron({
			...item,
			visible: true,
			clicked: true
		});
		setScore(score + 1)

		if (item.proximity === 0) {
			let neighbors = getNeighbors(item, microns);
			let newBoard = [...microns];
			neighbors.map(n => {
				// If it has no bombs next to it, keep going
				n.proximity === 0 && neighbors.push(...getNeighbors(n, microns))
			})
			let newItems = [...neighbors.map(i => ({ ...i, visible: true }))]
			for (const n of newItems) {
				newBoard = [
					...newBoard.slice(0, n.index),
					n,
					...newBoard.slice(n.index + 1, 9999)
				]
			}
			if (
				newBoard.filter(i => i.visible == true).length !==
				microns.filter(i => i.visible).length
			) {
				setMicrons(newBoard);
				setScore(newBoard.filter(i => i.visible).length)
			}
		}
	}

	function handleClick(item: MicronPropsI, cascade: boolean = false) {
		if (!item) return;
		if (item.bomb) {
			console.log('BOMB! you DIED');
			return;
		}
		checkMicron(item);
	}

	useEffect(() => {
		let toClick = microns.filter(i => i.proximity === 0 && i.visible && !i.clicked);
		toClick.length && toClick.map(a => {
			checkMicron(a)
		})

	}, [checkMicron])


	const sty = css`
		display: grid;
		grid-template-columns: repeat(${size}, 1fr);
		gap: 0;
	`;

	return (
		<div>
			<h3>Microsweeper - {empty.length} / Score {score} ({microns.filter(i => i.bomb).length} bombs)</h3>
			<div css={sty}>
				{microns.map(i => <Micron {...i} onClick={() => handleClick(i)} />)}
			</div>
		</div>
	)
}

export default MicroSweeper;


/** Individual Squares on the Board */
export const Micron: React.FC<MicronPropsI & { onClick: Function }> = ({ onClick, bomb, row, col, proximity, visible }) => {
	const [isClicked, setClicked] = useState(false);

	const handleClick = () => {
		setClicked(true);
		onClick()
	}

	const boxSty = css`
		min-width: 40px;
		margin: 0;
		padding: 0;
		align-content: center;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
	`

	const btnSty = css`
		width: 100%;
		box-sizing: border-box;
		height: 60px;
		background: #fff;
		margin: -2px 0 0;
		outline: none;
		border: 1px solid #ddd;
		font-size: 24px;
	`

	const btnDisabled = css`
		background: transparent;
		border: 1px solid transparent;
	`;

	const variants = {
		hidden: { opacity: 0, background: 'transparent', transition: { duration: 0.35 } },
		visible: { opacity: 1, background: 'transparent', transition: { duration: 0.35 } },
		blank: { opacity: 1, background: '#fff', transition: { duration: 0.35 } },
	}



	return (
		<div css={boxSty}>

			{visible ? (
				<motion.button
					initial="hidden"
					animate="visible"
					variants={variants}
					disabled
					css={[btnSty, btnDisabled]}>
					{proximity}
				</motion.button>
			) : (
					<motion.button
						initial="hidden"
						animate="blank"
						variants={variants}
						css={btnSty}
						onClick={() => handleClick()}>
					</motion.button>
				)}

		</div>
	)
}
