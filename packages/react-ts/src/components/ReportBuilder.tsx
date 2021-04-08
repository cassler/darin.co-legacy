import React from 'react'
import { ReportingData } from '../types/requestItem';
import { IParseResult } from '../context';
import Papa from 'papaparse';
import StyledDropzone from "./IO/StyledDropzone";
import { get, set, clear, getMany } from 'idb-keyval';
import { Badge, Button, Divider, Space, message, Skeleton } from 'antd';
import DataHolder from './DataHolder';

const contentStyle = {
  // marginTop: "96px",
  padding: "96px 20px",
  width: "100vw",
};

export const DataContext = React.createContext<ReportingData>({
  requests: [],
  accounts: [],
  projects: [],
  inventory: []
})

export const ReportBuilder = () => {

  const [requests, setRequests] = React.useState([]);
  const [inventory, setInventory] = React.useState([]);
  const [accounts, setAccounts] = React.useState([]);
  const [projects, setProjects] = React.useState([]);
  const [isLoading, toggleLoading] = React.useState(true);

  function parseFile(file: any, callback: Function) {
    Papa.parse(file, {
      header: true,
      complete: (res) => {
        callback(file.name, res)
      }
    })
  }

  function whichFile(fields: string[]) {
    if (fields.includes('Dealer Magellan #')) return 'requests'
    if (fields.includes('new') && fields.includes('used')) return 'inventory'
    if (fields.includes('Enrollment Date')) return 'accounts'
    if (fields.includes('Project: Project Name')) return 'projects'
    return 'unknown'
  }

  function whichCB(fields: string[]) {
    if (fields.length === 1) {
      const table = fields[0];
      if (table === 'requests') return setRequests;
      if (table === 'inventory') return setInventory;
      if (table === 'accounts') return setAccounts;
      if (table === 'projects') return setProjects;
    }
    if (fields.includes('Dealer Magellan #')) return setRequests
    if (fields.includes('new') && fields.includes('used')) return setInventory
    if (fields.includes('Enrollment Date')) return setAccounts
    if (fields.includes('Project: Project Name')) return setProjects
    return () => {};
  }

  async function gatherResult(name: string, res: IParseResult) {
    const tableName = whichFile(res.meta.fields);
    const updater = whichCB(res.meta.fields);

    console.log(name, tableName, `Found ${res.data.length} items`)
    await set(tableName, res)
    updater(res.data);
    message.info(<><b>{name}:</b> Updated with {res.data.length} items</>)
  }

  const restoreData = React.useCallback(
    async () => {
      const tables = ['requests', 'accounts', 'inventory', 'projects']
      getMany(tables).then(restored => {
        restored.forEach((t) => {
          if (t?.meta?.fields) {
            const setter = whichCB(t?.meta?.fields)
            setter(t.data)
            console.log(t)
          }
        })
        toggleLoading(false)
      });
    },[])

  React.useEffect(() => {
    restoreData()
  }, [restoreData])

  function handleDrop<T>(files: T[]) {
    files.forEach(async (file, key) => {
      await parseFile(file, gatherResult)
    })
  }

  function handleReset() {
    setAccounts([])
    setRequests([])
    setInventory([])
    setProjects([])
    clear()
  }

  const Dropper = () => (
    <Space>
      <li>Requests <Badge overflowCount={20000} count={requests.length} /></li>
      <li>inventory <Badge overflowCount={20000} count={inventory.length} /></li>
      <li>accounts <Badge overflowCount={20000} count={accounts.length} /></li>
      <li>projects <Badge overflowCount={20000} count={projects.length} /></li>
      <Button type="ghost" onClick={handleReset}>Reset</Button>
      <StyledDropzone cb={handleDrop} onDrop={acceptedFiles => handleDrop(acceptedFiles)} />
    </Space>
  )
  return (
    <div style={contentStyle}>
      <DataContext.Provider value={{
        accounts,
        inventory,
        requests,
        projects
      }}>
        {isLoading ? (
          <Skeleton active />
        ) : (
          <DataHolder dropper={<Dropper />} />
        )}
      </DataContext.Provider>
    </div>
  )
}

