import React from 'react';
import { DataContext } from "./ReportBuilder";
import { Tag } from 'antd'
export const DataHolder: React.FC = () => {
  const { requests, accounts, projects, inventory } = React.useContext(DataContext)

  const sample = [...requests].slice(0, 100).map(r => {
    const magellan = r['Dealer Magellan #'];
    const acc = accounts.find(i => i['Lender Dealer Id'] === magellan)
    const pr = projects.find(i => i['Project: Dealertrack ID'] === acc?.['DealerTrack Id'])
    const inv = inventory.find(i => i.dealer_code === acc?.['DealerTrack Id'])
    return {
      magellan: r['Dealer Magellan #'],
      dt: acc?.['DealerTrack Id'] || null,
      pr: pr?.['Project: Project ID'] || null,
      lend: inv?.dealerid,
      added: r['Date Entered'],
      addendum: r['Corporate Services Addendum Status'],
      program: r['Program Active Status'],
      region: r.Region,
      // onboarded: r['Dealer Onboarded with DT Status'],
      new: inv.new || 0,
      used: inv.used || 0,
      enrollment: acc?.['Enrollment Phase'].slice(0, 20) || null,
      stage: pr?.['Project: Stage'] || null,
    }
  });

  function isLive(item: any) {
    if (item.program !== 'Active') {
      return false;
    }
    return item.stage === 'Completed' && (item?.new > 0 || item?.used > 0)
  }
  return (
    <div>
      <h2>Looking good!</h2>
      {sample.map(item => (
        <tr style={{ border: '1px solid #ccc' }}>
          <td>{isLive(item) ? <Tag color="green">Live</Tag> : <Tag>Pending</Tag>}</td>
          {Object.keys(item).map(k => (
            <td style={{padding: 3}}>{item[k]}</td>
          ))}
        </tr>
      ))}
    </div>
  )
}

export default DataHolder;
