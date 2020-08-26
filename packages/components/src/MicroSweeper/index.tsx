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

	useEffect(() => {
		setMicrons(defaultBoard)
	}, [])

	function handleClick(item: MicronPropsI) {
		let { index } = item;
		let obj = microns[index];
		let proximity = [
			// Abovvr
			microns[index - size],
			item.col > 1 && microns[index - size - 1],
			item.col < size && microns[index - size + 1],
			// To the sides
			item.col > 1 && microns[index - 1],
			item.col < size && microns[index + 1],
			// Below
			microns[index + size],
			item.col < size && microns[index + size + 1],
			item.col > 1 && microns[index + size - 1],

		]
		console.log('clicked on', obj, 'expected', item);
		console.log(proximity.filter(Boolean))
		console.log(proximity.filter(Boolean).filter(i => i.bomb === true))
	}

	const sty = css`
		display: grid;
		grid-template-columns: repeat(${size}, 1fr);
	`

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
export const Micron: React.FC<MicronPropsI & { onClick: Function }> = ({ onClick, bomb, row, col, index }) => {
	const [clicked, setClicked] = useState(false);
	const [prox, setProx] = useState(0)


	return (
		<div style={bomb ? { border: '1px solid red' } : { color: 'blue' }}>
			<button onClick={() => onClick()}>{row} {col}</button>
		</div>
	)
}
