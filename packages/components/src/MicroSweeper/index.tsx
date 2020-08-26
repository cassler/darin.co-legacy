import React, { useState, useEffect, useContext } from 'react';
import { message } from 'antd';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Button } from '@cassler/components'


export interface MicroSweeperProps {
	size: number
}

export interface MicronPropsI {
	row: number,
	col: number,
	bomb: boolean,
	clicked: boolean,
	visible: boolean,
	index: number,
	proximity?: number
}

type StateType = {
	items: MicronPropsI[]
}
type ActionType =
	| { type: 'click' }
	| { type: 'success' }
	| { type: 'failure' }

const MStateContext = React.createContext({})
const MDispatchContext = React.createContext({})

const countReducer = (state: StateType, action: ActionType) => {
	switch (action.type) {
		case 'click': {
			return state
		}
		case 'success': {
			return state
		}
		default: {
			throw new Error(`Unhandled action type: ${action.type}`)
		}
	}
}

export const MicroSweeper: React.FC<MicroSweeperProps> = ({ size = 12, children }) => {

	const empty = Array.from(Array(size * size).keys());
	const getMicron = (index: number): MicronPropsI => {
		const row = (Math.floor(index / size));
		return {
			index,
			bomb: Math.random() >= 0.85,
			row: (Math.floor(index / size)) + 1,
			col: index - (row * size) + 1,
			clicked: false,
			visible: false
		}
	}
	const defaultBoard: MicronPropsI[] = empty.map(index => getMicron(index));


	const [microns, setMicrons] = useState<MicronPropsI[]>([]);
	const [current, setCurrent] = useState<MicronPropsI>();
	const [next, setNext] = useState<MicronPropsI[]>([]);

	useEffect(() => {
		setMicrons(defaultBoard)
	}, [])

	function getNeighbors(item: MicronPropsI): MicronPropsI[] {
		const { index, col } = item;
		const raw = [
			// Abovvr
			index > size && microns[index - size],
			col > 1 && microns[index - size - 1],
			col < size && microns[index - size + 1],
			// To the sides
			col > 1 && microns[index - 1],
			col < size && microns[index + 1],
			// Below
			index < (size * size - size) && microns[index + size],
			col < size && microns[index + size + 1],
			col > 1 && microns[index + size - 1],
		].filter(Boolean) as MicronPropsI[]

		return raw;

	}

	function countBombs(neighbors: MicronPropsI[]) {
		return neighbors.filter(i => i.bomb === true).length
	}


	function checkMicron(item: MicronPropsI): {
		next: MicronPropsI[],
	} | void {
		const { index } = item;
		if (item.visible) return;
		let neighbors = getNeighbors(item)
		let bombCount = countBombs(neighbors)

		setMicrons([
			...microns.slice(0, index),
			{ ...item, proximity: bombCount, visible: true },
			...microns.slice(index + 1, 999),
		])


		if (bombCount === 0) {
			let newNext = [...next, ...neighbors].filter((value, index, self) => {
				return self.indexOf(value) === index && value.index !== index && value.visible === false;
			})
			console.log(index)
			console.log('filtered', newNext.filter(i => i.index !== index))
			setNext([...next.filter(i => i.index !== index), ...neighbors.filter(i => !i.visible)])
		} else {
			setNext([...next.filter(i => i.index !== index)])
		}

		setCurrent({ ...item, proximity: bombCount, visible: true })
	}

	function handleClick(item: MicronPropsI, cascade: boolean = false) {
		if (!item) return;
		let { index } = item;
		// 1 - If this is a bomb. Set game over.
		if (item.bomb) {
			console.log('BOMB! you DIED');
			return;
		}
		checkMicron(item);
	}

	useEffect(() => {
		console.log({ next })
		if (next.length) {
			handleClick(next[0])
			// console.log({ next })
		}
	}, [microns, next, checkMicron, handleClick])


	const sty = css`
		display: grid;
		grid-template-columns: repeat(${size}, 1fr);
	`;

	return (
		<div>
			<h3>Microsweeper - {empty.length}</h3>
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
	const [prox, setProx] = useState(0)

	const handleClick = () => {
		setClicked(true);
		onClick()
	}
	return (
		<div style={bomb ? { border: '1px solid red' } : { color: 'blue' }}>
			{proximity || visible ? (
				<b>{proximity}</b>
			) : (
					<button onClick={() => handleClick()}>{row} {col}</button>
				)}
		</div>
	)
}
