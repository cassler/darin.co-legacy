import React from 'react';
import { List, Tag } from 'antd';
import 'antd/dist/antd.css';
import { ImplementationResult } from '@wf/core';

type Props = {
	result: ImplementationResult[]
}
const ListView: React.FC<Props> = ({ result }) => {
	return (
		<>
			<List itemLayout="horizontal" dataSource={result} renderItem={(item: ImplementationResult) => (
				<List.Item>
					<Tag>{item.pid} / {item.account?.dealertrackID}</Tag>
					<List.Item.Meta
						title={<a href="/">{item.account?.dbaName}</a>}
						description={item.account?.enrollment}
					/>
				</List.Item>)}
			/>
		</>
	)
}


export default ListView;
