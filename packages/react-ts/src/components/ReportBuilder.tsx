import React from 'react'

import { IParseResult } from '../context';
import Papa from 'papaparse';
import StyledDropzone from "./IO/StyledDropzone";
import Dropzone from 'react-dropzone';
import { List, Typography, Divider, Space, Tag, Badge } from 'antd';

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
    updater(res.data);
  }

  function handleDrop<T>(files: T[]) {
    files.forEach(async (file, key) => {
      await parseFile(file, gatherResult)
    })
  }

  return (

    <div style={contentStyle}>


      <StyledDropzone cb={handleDrop} onDrop={acceptedFiles => handleDrop(acceptedFiles)} />
      <div style={{padding: 20, display: 'flex', justifyContent: 'space-around'}}>
        <li>Requests <Badge overflowCount={20000} count={requests.length} /></li>
        <li>inventory <Badge overflowCount={20000} count={inventory.length} /></li>
        <li>accounts <Badge overflowCount={20000} count={accounts.length} /></li>
        <li>projects <Badge overflowCount={20000} count={projects.length} /></li>
      </div>
      </div>

  )
}
