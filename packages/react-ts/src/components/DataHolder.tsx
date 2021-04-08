import React, { useRef, useState } from 'react';
import { DataContext } from "./ReportBuilder";
import { Tag, Table, PageHeader, Badge, Input, Button, Space } from 'antd'
import { ReportingPivot } from '../types/requestItem';
import { ColumnsType } from 'antd/es/table';
import Highlighter from 'react-highlight-words';
import { CloudDownloadOutlined, SearchOutlined } from '@ant-design/icons';
import { CSVLink } from 'react-csv';

type Entry = {
	change: string
	add: string
}

export const DataHolder: React.FC = () => {
  const { requests, accounts, projects, inventory } = React.useContext(DataContext)

  const newItems:any[] = [...requests].slice(0, 500).map(r => {
    const magellan = r['Dealer Magellan #'];
    const acc = accounts.find(i => i['Lender Dealer Id'] === magellan)
    const pr = projects.find(i => i['Project: Dealertrack ID'] === acc?.['DealerTrack Id'])
    const inv = inventory.find(i => i.dealer_code === acc?.['DealerTrack Id'])
    const onboardStatus = reportOnboardingStatus({ request: r, account: acc, project: pr, inventory: inv });
    return {
      onboarded: onboardStatus,
      magellan: r['Dealer Magellan #'],
      dt: acc?.['DealerTrack Id'] || null,
      pr: pr?.['Project: Project ID'] || null,
      lend: inv?.dealerid,
      added: r['Date Entered'],
      addendum: r['Corporate Services Addendum Status'],
      program: r['Program Active Status'],
      region: r.Region,
      // onboarded: r['Dealer Onboarded with DT Status'],
      new: inv?.new || 0,
      used: inv?.used || 0,
      enrollment: (acc?.['Enrollment Phase'] || '').slice(0 , 20),
      stage: pr?.['Project: Stage'] || null,
    }
  });

  function isLive(item: any) {
    if (item.program !== 'Active') {
      return false;
    }
    return item.stage === 'Completed' && (item?.new > 0 || item?.used > 0)
  }

  function reportOnboardingStatus(entry: ReportingPivot):string {
    if (entry.request['Program Active Status'] !== 'Active') return 'Inactive'
    if (!entry.account) return 'Not Enrolled'
    if (entry.account['Enrollment Phase'] === 'Not Contacted') return 'Not Enrolled'
    let hasInventory = (parseInt(entry?.inventory?.new) > 0 || parseInt(entry?.inventory?.used) > 0)
    if (hasInventory) {
      if (entry.project?.['Project: Stage'] === 'Completed') return 'Live'
      return 'Live - No Project'
    }
    return 'DRS Review'
  }

  const inputEl = useRef(null);

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={inputEl}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => inputEl.current.select(), 100);
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const [searchText, setSearchText] = useState<string>('')
  const [searchedColumn, setSearchColumn] = useState<string>('')

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

  const makeTableCols = (fields: string[], first?: number, filter?: string[]) => {
		const sample = newItems[0]
		const columns = [
			{
				title: '',
				key: 'change',
				dataIndex: 'change',
				width: 10,
				filters: [
					{ text: 'Live', value: 'Live' },
          { text: 'Not Enrolled', value: 'Not Enrolled' },
          { text: 'Inactive', value: 'Inactive' },
          { text: 'Live - No Project', value: 'Live - No Project' },
          { text: 'DRS Review', value: 'DRS Review' },
				],
        onFilter: (value, record) => record.onboarded === value,
        render: (value, record) => (
          <Badge status={record.onboarded === 'Live' ? 'success' : 'default'} />
        )
      },
			...fields.map(col => ({
				title: col.toUpperCase(),
				dataIndex: col,
        key: col.toLowerCase(),
        ...getColumnSearchProps(col.toLowerCase()),
				width: Math.max(`${sample[col]}`.length * 5 + 0, 50),
				ellipsis: true,
				change: '',
				sorter: (a, b) => a[col] - b[col],
				sortDirections: ['ascend', 'descend'],
				defaultSortOrder: ['ascend'],
				render: (text, record) => (
					<div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
            {col !== 'onboarded' ? (
              <>{text}</>
            ) : text === 'Live' ? (
              <Tag color="green">Live <b>{parseInt(record.new) + parseInt(record.used)}</b></Tag>
            ) : (
              <Tag>{text}</Tag>
            )}
					</div>
				),
			})).filter(i => filter ? filter.includes(i.title) : i)

		]
		return first ? columns.slice(0, first) : columns
  }

  const columns = makeTableCols([...Object.keys(newItems[0])]);


  return (
    <div>
      <h2>Looking good - {requests.length} entries!</h2>
      <Table
        size="small"

        dataSource={newItems}
        columns={columns as ColumnsType<Entry>}
        scroll={{ x: 1300, y: 900 }}
        title={() => (
          <PageHeader
            title={`Weekly Reporting - ${requests.length}`}
            subTitle={(
              <CSVLink
                  data={newItems}
                  filename={`weekly-report-boa-${new Date().toISOString()}.csv`}
                >
                {/* <Popover content={tip ? tip : label}> */}
                  <Button>
                    <CloudDownloadOutlined />
                    Download Report
                  </Button>
                {/* </Popover> */}
              </CSVLink>
            )}
            extra={(
              <Space>
                <li>Requests <Badge overflowCount={20000} count={requests.length} /></li>
                <li>inventory <Badge overflowCount={20000} count={inventory.length} /></li>
                <li>accounts <Badge overflowCount={20000} count={accounts.length} /></li>
                <li>projects <Badge overflowCount={20000} count={projects.length} /></li>

              </Space>
            )}
					/>
				)}
			/>
    </div>
  )
}

export default DataHolder;
