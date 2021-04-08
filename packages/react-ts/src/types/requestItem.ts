export interface RequestItem {
  'Date Entered': string;
  'Client Manager Addendum Status': string;
  'Corporate Services Addendum Status': string;
  'Dealer Onboarded with DT Status': string;
  'Action needed by B of A': string;
  'Client Manager Name': string;
  'Client Manager Email Address': string;
  'Client Manager Phone Number': string;
  'Dealership Name': string;
  'Dealer Magellan #': string;
  'Dealer City': string;
  'Dealer State': string;
  'Dealer Contact First Name': string;
  'Dealer Contact Last Name': string;
  'Dealer Contact Email': string;
  'Dealer Contact Telephone': string;
  'Dealer Inventory Provider': string;
  'Dealer Email Address for Leads': string;
  'Primary Vendor': string;
  'Program Active Status': string;
  'Date Magellan Received Correct Addendum': string;
  'Dealer Info sent to DT': string;
  'Dealer Live Date': string;
  'Natl Acct Relationship Name': string;
  'Region': string;
  'Item Type': string;
  'Path': string;
  '': string;
}



export interface AccountItem {
  'Legal Name': string;
  'DBA Name': string;
  'Street': string;
  'City': string;
  'State': string;
  'Zip': string;
  'Country': string;
  'Phone No': string;
  'Fax No': string;
  'User Count': string;
  'DealerTrack Id': string;
  'Lender Dealer Id': string;
  'Lender Rep Name': string;
  'Lender Rep Id': string;
  'Enrollment Date': string;
  'Agreement Received': string;
  'Enrollment Phase': string;
  'Enrollment Update Date': string;
  'Modified Date': string;
  'Status': string;
  'Dept': string;
  'Alternate Street': string;
  'Independent': string;
  'PaymentTrack Id': string;
  'Equifax Signup Date': string;
  'Transunion Signup Date': string;
  'Experian Reseller Signup Date': string;
  'Experian Direct Signup Date': string;
  'Cost Center': string;
  'Loan App Id': string;
  'Lease App Id': string;
  'Loan Svc Id': string;
  'Lease Svc Id': string;
  'Prime Id': string;
  'Subprime Id': string;
  'Subvented Id': string;
  'Match Change Date': string;
  'Previous Match Dealerid': string;
  'Grace Period Status': string;
  'Agreement Required By Date': string;
  'Agreement Version': string;
  'Agreement Signatory': string;
  'Overall Use 30 Days': string;
  'Equifax Status': string;
  'Experian Status': string;
  'Transunion Status': string;
  'PaymentTrack Status': string;
  'eContract Status': string;
  'Dealer File Override': string;
  'Override Expiration': string;
  'Vehicle Type': string;
  'Created Date': string;
  'Activated Date': string;
  'Equifax Use 30 Days': string;
  'Experian Use 30 Days': string;
  'Transunion Use 30 Days': string;
  'DMS Use 30 Day': string;
  'DMS Status': string;
  'BookOut Kelley Status': string;
  'BookOut Kelley 30 Day Activity': string;
  'BookOut NADA Status': string;
  'BookOut NADA 30 Day Activity': string;
  'BookOut Black Status': string;
  'BookOut Black 30 Day Activity': string;
  'SalesDesk Status': string;
  'SalesDesk 30 Day Activity': string;
  'BookOut Pro Status': string;
  'BookOut Pro 30 Day Activity': string;
  'EFTFAX': string;
  'eMenu Status': string;
  'eMenu Version': string;
  'eMenu 30 Day Activity': string;
  'Independent Preference': string;
  'Independent Status': string;
  'Independent 30 Day Activity': string;
  'Notes': string;
  'uniFI Indicator': string;
  'Lender Preselect': string;
}

export interface InventoryItem {
  dealerid: string;
  dealer_code: string;
  new: string;
  used: string;
  company: string;
  address1: string;
  city: string;
  state: string;
  postalcode: string;
  country: string;
}

export interface ProjectItem {
  'Project: Project ID': string;
  'Project: Partner ID': string;
  'Project: Dealertrack ID': string;
  'Project: Service Account(s) (DMKT)': string;
  'Project: Service Account (DMKT)': string;
  'Project: Created Date': string;
  'Product Deliverable: Product Deliverable Number': string;
  'Project: Project Name': string;
  'Project: Account': string;
  'Project: Parent Account': string;
  'Project: Inventory Provider': string;
  'Project: Stage': string;
  'Project: Start Date': string;
  'Project: End Date': string;
  'Project: Project Completed By': string;
  'Project: Owner Name': string;
  'Project: Stage Description': string;
  'Project: Stage Reason': string;
  'Project: Last Activity Date': string;
  'Project: Project Status Notes': string;
  'Project: Product List': string;
}

export interface ReportingData {
  requests: RequestItem[];
  inventory: InventoryItem[];
  accounts: AccountItem[];
  projects: ProjectItem[];
}
