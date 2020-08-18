import React, { useState, useContext, useEffect } from 'react';
import { WFContext } from '../context';
import { Button, Input, AutoComplete } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons'
import { motion, AnimatePresence } from 'framer-motion';

const mockVal = (str, repeat = 1) => ({
	value: str.repeat(repeat),
});

const renderItem = (id, name) => ({
	value: id,
	label: (
		<span>
			<b>{id}</b> - {name}
		</span>
	)
})

export const AutoCompleter: React.FC = () => {
	const { ctx } = useContext(WFContext);

	const ids = ctx.reference.data.map(i => ({
		value: i['Lender Dealer Id'],
		label: i['Lender Dealer Id'] + ' - ' + i['DBA Name']
	}));
	const [value, setValue] = useState('');
	const [options, setOptions] = useState(ids ? ids : []);
	const [selected, setSelection] = useState([]);


	const onSearch = searchText => {
		setOptions(
			!searchText ? ids : options.filter(i => {
				return searchText === `${i.value}`.slice(0, searchText.length) ||
					`${i.label}`.includes(searchText)
			})
		);
	};

	const onSelect = data => {
		console.log('onSelect', data);
		setSelection([...selected, data])
		setValue('')
	};

	const onChange = data => {
		setValue(data);
	};

	const onConfirm = data => {
		let newData = data.map(i => ({
			[ctx.config.internal_id]: i
		}))
		ctx.setRequested({
			data: newData,
			errors: {},
			meta: {}
		});
	}

	return (
		<>
			<AutoComplete
				value={value}
				options={options}
				style={{
					width: 400,
				}}
				onSelect={onSelect}
				onSearch={onSearch}
				onChange={onChange}
			>
				<Input.Search size="large" placeholder="Select dealers" />
				{/*
				<Input onClick={() => setSelection([])}>Reset Selection</Input> */}
			</AutoComplete>

			<AnimatePresence exitBeforeEnter>
				{selected.length > 0 && (

					<motion.div
						key="2"
						transition={{ ease: "easeInOut", duration: 0.3 }}
						initial={{ x: 0, opacity: 0, scale: 1 }}
						animate={{ x: 0, opacity: 1, scale: 1 }}
						exit={{ x: 0, opacity: 0, scale: 1 }}
					>
						<h3>Request IDs: {selected.map(i => `${i} `)}</h3>
						<div
							style={{ position: "absolute", bottom: '0', right: '0' }}
						>
							<Button onClick={() => setSelection([])}>Reset Selection</Button>&nbsp;
							<Button
								disabled={selected.length < 1} type="primary" onClick={() => onConfirm(selected)}>
								Continue
							<ArrowRightOutlined />
							</Button>
						</div>
					</motion.div>


				)}
			</AnimatePresence>
		</>
	);
};

export default AutoCompleter;
