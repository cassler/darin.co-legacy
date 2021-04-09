import React, { ReactNode, useRef, useState, useEffect } from 'react';
import { DataContext } from "./ReportBuilder";
import { Tag, Table, PageHeader, Badge, Input, Button, Space, Skeleton, Card, BadgeProps, Row } from 'antd'
import { ColumnsType } from 'antd/es/table';
import Highlighter from 'react-highlight-words';
import { CloudDownloadOutlined, SearchOutlined, ExpandAltOutlined, HistoryOutlined } from '@ant-design/icons';
import { CSVLink } from 'react-csv';
import applyReportingBucket from './useReportingBucket';
import { ReportingPivot, RequestItem } from "../types/requestItem"
import {useFullscreen, useToggle, useWindowSize} from 'react-use';

type Entry = {
	change: string
	add: string
}

interface Props {
  dropper?: ReactNode
}

export function useOmnibus() {
  const { requests, accounts, projects, inventory } = React.useContext(DataContext)
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isReady, setReady] = useState<boolean>(false);
  const [omnibus, setOmnibus] = useState<ReportingPivot[]>([])
  const [tableData, setTableData] = useState<any[]>([])
  const [fields, setFields] = useState([])
  function makeTableRow(entry: ReportingPivot) {
    const onboardStatus = applyReportingBucket(entry);
    return {
      onboarded: onboardStatus,
      magellan: entry.request['Dealer Magellan #'],
      dt: entry.account?.['DealerTrack Id'] || '-',
      pr: entry.project?.['Project ID'] || '-',
      lend: entry.inventory?.dealerid || '-',
      dba: entry.request['Dealership Name'],
      added: entry.request['Date Entered'],
      program: entry.request['Program Active Status'],
      // onboarded: r['Dealer Onboarded with DT Status'],
      new: entry.inventory?.new || 0,
      used: entry.inventory?.used || 0,
      enrollment: (entry.account?.['Enrollment Phase'] || '').slice(0 , 20),
      stage: entry.project?.['Stage'] || '-',
      cm: entry.request['Client Manager Name'],
      region: entry.request.Region,
      addendum: entry.request['Corporate Services Addendum Status'],
    }
  }

  useEffect(() => {
    const res = requests.map(r => {
      const magellan = r['Dealer Magellan #'];
      const acc = accounts.find(i => i['Lender Dealer Id'] === magellan)
      const pr = projects.find(i => i['Dealertrack ID'] === acc?.['DealerTrack Id'] || i['Dealertrack ID'] === acc?.['DealerTrack Id'])
      const inv = inventory.find(i => i.dealer_code === acc?.['DealerTrack Id'])
      return {
        request: r,
        account: acc,
        project: pr,
        inventory: inv
      } as ReportingPivot
    })
    setOmnibus(res)
    setReady(true)
    setLoading(false)
  }, [requests, accounts, projects, inventory])

  useEffect(() => {
    const res = omnibus.map(entry => makeTableRow(entry))
    // if (tableData.length > 0) {
    //   const col = Object.keys(tableData[0])
    //   setFields(col)
    // }
    setTableData(res)
  }, [omnibus])

  useEffect(() => {

  })

  return {isLoading, isReady, omnibus, tableData, fields }
}

export const DataHolder: React.FC<Props> = ({dropper}) => {
  const { requests, accounts, projects, inventory } = React.useContext(DataContext)
  const { omnibus, tableData, isLoading } = useOmnibus();
  const newItems = tableData


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
            <HistoryOutlined />
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

  function makeBadgeFromStatus(ob: string) {
    switch(ob) {
      case 'Live': return 'success'; break;
      case 'In Progress': return 'processing'; break;
      case 'Not Enrolled': return 'warning'; break;
      case 'Project Stalled': return 'warning'; break;
      case 'Ready to Complete': return 'success'; break;
      default: return 'default'
    }
  }
  const makeTableCols = (fields: string[], first?: number, filter?: string[]) => {
		const sample = newItems[0]
		const columns = [
			{
				title: '',
				key: 'change',
				dataIndex: 'change',
				width: 10,
				filters: [
          { text: 'Inactive', value: 'Inactive' },
          { text: 'Not Enrolled', value: 'Not Enrolled' },
          { text: 'On Hold', value: 'Project Stalled'},
          { text: 'Queue', value: 'In Queue' },
					{ text: 'In Progress', value: 'In Progress' },
          { text: 'Ready to Complete', value: 'Ready to Complete' },
          { text: 'Live', value: 'Live' },
          { text: 'DRS Review', value: 'DRS Review' },
				],
        onFilter: (value, record) => record.onboarded === value,
        render: (value, record) => (
          <Badge status={makeBadgeFromStatus(record.onboarded)} />
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
        sorter: (a, b) => {
          return ('' + a[col]).localeCompare(b[col], undefined, { numeric: true, sensitivity: 'base'})
        },
				sortDirections: ['ascend', 'descend'],
				defaultSortOrder: ['ascend'],
				render: (text, record) => (
					<div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
            {col !== 'onboarded' ? (
              <>{text}</>
            ) : text === 'Live' ? (
              <Tag color="green">Live <b>{parseInt(record.new) + parseInt(record.used)}</b></Tag>
            ) : (
              <Tag color={makeBadgeFromStatus(text)}><b>{text}</b></Tag>
            )}
					</div>
				),
			})).filter(i => filter ? filter.includes(i.title) : i)

		]
		return first ? columns.slice(0, first) : columns
  }

  const columns = tableData.length ? makeTableCols(Object.keys(tableData[0])) : makeTableCols([]);

  const SubTitle = () => (
    <div>
      <CSVLink data={newItems} filename={`weekly-report-boa-${new Date().toISOString()}.csv`}>
        <Button><CloudDownloadOutlined />Report</Button>
      </CSVLink>
      <CSVLink data={omnibus} filename={`weekly-omnibus-boa-${new Date().toISOString()}.csv`}>
        <Button><CloudDownloadOutlined />Omnibus</Button>
      </CSVLink>
      <Button onClick={() => toggle()}><ExpandAltOutlined /></Button>
    </div>
  )

  const { height } = useWindowSize();


  const [theight, updateHeight] = useState(height - 400);

  const ref = useRef(null)
  const [show, toggle] = useToggle(false);
  const isFullscreen = useFullscreen(ref, show, { onClose: () => toggle(false) });

  useEffect(() => {
    updateHeight(isFullscreen ? height - 300 : height - 400)
  }, [height, show, isFullscreen])

  return (
    <div>

      {isLoading ? (
        <Card>
          <PageHeader
            title={`Weekly Reporting - ${requests.length}`}
            subTitle={<SubTitle />}
            extra={dropper}
          />
          <Skeleton active />
        </Card>
      ) : (
        <div ref={ref}>
        <Table
          size="small"
          title={(pd) => (
            <PageHeader
              title={`Weekly Reporting - ${requests.length}`}
              subTitle={<SubTitle />}
              extra={dropper}
            />
          )}
          footer={() => <SubTitle />}
          dataSource={newItems}
          columns={columns as ColumnsType<Entry>}
          scroll={{ y: theight }}
        />
        </div>
      )}
    </div>
  )
}

export default DataHolder;

