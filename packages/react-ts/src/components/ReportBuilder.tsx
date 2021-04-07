import React from 'react'

import { IParseResult } from '../context';
import Papa from 'papaparse';
import StyledDropzone from "./IO/StyledDropzone";
import { get, set, entries, keys, values, clear, getMany } from 'idb-keyval';
import { Badge } from 'antd';

const contentStyle = {
  // marginTop: "96px",
  padding: "96px 10vw",
  width: "100vw",
};
interface Props {

}

export const ReportBuilder = (props: Props) => {

  const [requests, setRequests] = React.useState([]);
  const [inventory, setInventory] = React.useState([]);
  const [accounts, setAccounts] = React.useState([]);
  const [projects, setProjects] = React.useState([]);
  const [extra, setExtra] = React.useState([]);

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
    if (fields.includes('Project: Project ID')) return 'projects'
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
    if (fields.includes('Project: Project ID')) return setProjects
    return setExtra
  }

  async function gatherResult(name: string, res: IParseResult) {
    const tableName = whichFile(res.meta.fields);
    const updater = whichCB(res.meta.fields);
    console.log(name, tableName, `Found ${res.data.length} items`)
    await set(tableName, res)
    updater(res.data);
  }

  const restoreData = React.useCallback(
    async () => {
      const tables = ['requests', 'accounts', 'inventory', 'projects']
      getMany(tables).then(i => {
        i.map(v => {
          if (!v?.meta?.fields) {
            console.log('No data for this one')
            return;
          }
          const cb = whichCB(v.meta.fields)
          cb(v.data)
          console.log(v)
        })
      })
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
    setExtra([])
    clear()
  }

  const hasAllFiles = React.useMemo(() => {
    return requests.length > 0 && accounts.length > 0 && projects.length > 0 && inventory.length > 0
  }, [requests, accounts, projects, inventory])


  return (
    <div style={contentStyle}>
      <StyledDropzone cb={handleDrop} onDrop={acceptedFiles => handleDrop(acceptedFiles)} />
      <div style={{padding: 20, display: 'flex', justifyContent: 'space-around'}}>
        <li>Requests <Badge overflowCount={20000} count={requests.length} /></li>
        <li>inventory <Badge overflowCount={20000} count={inventory.length} /></li>
        <li>accounts <Badge overflowCount={20000} count={accounts.length} /></li>
        <li>projects <Badge overflowCount={20000} count={projects.length} /></li>
      </div>
        {hasAllFiles && (
          <h2>Looking good!</h2>
      )}
      <button onClick={handleReset}>Reset</button>
      </div>
  )
}
