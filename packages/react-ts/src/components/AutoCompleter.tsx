import React, { useState, useContext, useEffect } from 'react';
import { WFContext } from '../context';
import { Button, Input, AutoComplete } from 'antd';

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
				<Input.Search size="large" placeholder="input here" />
			</AutoComplete>
			{selected.length > 0 && (
				<div>
					<h3>{JSON.stringify(selected)}</h3>
					<Button onClick={() => setSelection([])}>Reset Selection</Button>
					<Button onClick={() => onConfirm(selected)}>Continue with These IDs</Button>
					{ctx.requested.data.length}
				</div>
			)}

		</>
	);
};

export default AutoCompleter;
