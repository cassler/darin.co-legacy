import { ReportingPivot } from "../types/requestItem"
/**
 *
 * @param entry - computed
 * @returns
 */
export default function applyReportingBucket(entry: ReportingPivot): string {

  const { request, account, project, inventory } = entry;

  if (request['Program Active Status'] !== 'Active') {
    return 'Inactive'
  }
  if (!account) {
    return 'Not Enrolled' // No DT match
  }

  if (account['Enrollment Phase'] === 'Not Contacted') {
    return 'Not Enrolled'
  }

  if (!project) return 'In Queue';

  let hasInventory = (parseInt(inventory?.new) > 0 || parseInt(inventory?.used) > 0)

  let stage = project['Stage'] || project['Project: Stage'];

  if (hasInventory) {
    if (stage === 'Completed') return 'Live'
    if (stage === 'On Hold') return 'Project Stalled'
    if (stage === 'In Progress' || stage === 'Not Started') return 'Ready to Complete'
    return 'DRS Review'
  }
  if (stage === 'On Hold') {
    return 'Project Stalled'
  }

  if (stage === 'In Progress' || stage === 'Not Started') {
    return 'In Progress'
  }

  return 'DRS Review'
}
