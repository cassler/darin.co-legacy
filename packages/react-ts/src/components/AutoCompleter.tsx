import React, { useState, useContext, useEffect } from 'react';
import { WFContext } from '../context';
import { Button, Input, AutoComplete, List, Typography, Popover, Tag, Divider } from 'antd';
import { ArrowRightOutlined, QuestionOutlined } from '@ant-design/icons'
import { motion, AnimatePresence } from 'framer-motion';
const { Text } = Typography;

export const AutoCompleter: React.FC = () => {
	const { ctx } = useContext(WFContext);

	const ids = ctx.reference.data.map((i, index) => ({
		value: i['Lender Dealer Id'],
		key: index,
		string: i['DealerTrack Id'] + ' ' + i['DBA Name'],
		label: (<div style={{ display: 'flex', justifyContent: 'space-between' }}>
			<Text strong>{i['DBA Name']}</Text>
			<div>
				<small>
					<Text type='secondary'>DT {i['DealerTrack Id']}</Text>
					<Divider type="vertical" />
					<Text type='secondary'>Partner {i['Lender Dealer Id']}</Text>
				</small>
			</div>
		</div>)
	}));
	const [value, setValue] = useState('');
	const [options, setOptions] = useState(ids ? ids : []);
	const [selected, setSelection] = useState([]);

	const onSelect = data => {
		console.log('onSelect', data);
		let option = options.filter(i => i.value === data)
		setSelection([...selected, ...option])
		setValue('')
	};

	const onChange = data => {
		console.log(data)
		setValue(data);
	};

	const onConfirm = data => {
		let newData = data.map(i => ({
			[ctx.config.internal_id]: i.value
		}))
		ctx.setRequested({
			data: newData,
			errors: {},
			meta: {}
		});
	}

	const renderLabel = (dt: number, pid: number, dba: string) => ({
		value: pid,
		label: (<div style={{ display: 'flex', justifyContent: 'space-between' }}>
			<Tag>{dt}</Tag> <Tag>{pid}</Tag>
			<Text strong>{dba}</Text>
		</div>)
	})

	return (
		<>
			<AutoComplete
				value={value}
				options={options}
				style={{
					width: 500,
				}}
				filterOption={(inputValue, option) =>
					`${option.value}`.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1 ||
					`${option.label}`.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1 ||
					`${option.string}`.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
				}
				onSelect={onSelect}
				onChange={onChange}
			>
				<Input.Search size="large" placeholder="Select dealers" />
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
						<Popover content={(
							<List
								header={(<h3>These dealers will be included</h3>)}
								style={{ maxWidth: '440px', marginLeft: 'auto', marginRight: 'auto' }}
								dataSource={selected}
								renderItem={item => (
									<List.Item>
										<Text mark>[ADD]</Text> {item.label}
									</List.Item>
								)}
							/>
						)}>
							<div><br />
								<Tag>{selected.length} dealers selected <QuestionOutlined /></Tag></div>
						</Popover>
						<div style={{ position: "absolute", bottom: '0', right: '0' }}>
							<Button
								onClick={() => setSelection([])}>
								Reset Selection
							</Button>&nbsp;
							<Button
								disabled={selected.length < 1}
								type="primary"
								onClick={() => onConfirm(selected)}>
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
