---
id: calcstate
title: Processing State
---

Broadly, implementation requests represent a *change in desired state* to a finite set of dealerships. When a partner submits a file with *N* dealers on it where *X* are active any *Y* are inactive, we can use a simple formula to find what implementation actions are needed.


## Gathering Our Data

### Requested Active Dealers
These are included on partner file submission (referred to as **Request File**).

This can be as simple as listing every dealer on the submitted file. However,  some partners include entries that are not yet ready to be implemented for one reason or another. See [Partner Specific Validation Steps](/partner-preferences/)

### Dealertrack Matches
Pull the appropriate business report from DT (referred to as **DT Report**). This will be especially helpful if there are any problems with the dealer match process. (by DT/Partner ID)

### eBiz Profile Entries
Gather by using the `gatherEBizIDs` bookmarklet in Workflower, referred to as **eBiz Dealers**. This will allow us to easily identify any dealers that should be added. (by DT/Partner ID)

### Projects / Billing Assets
Pull the appropriate Salesforce report. This will allow us to identify any active dealers that have already been processed by product subscription. Inversely, it will provide a set that must be sent to prod sub for processing. (by DT ID)



## Formula Overview

| label | values | description |
| ----- | ------ | ----------- |
| Request File **RA** | `[1,2,3,4,6,7]` | Dealers on submission listed as active (by partner ID) |
| DT Report **DTA** | `[1,2,3,4,5,6]` | Dealertrack report showing active dealers for partner (by parnter ID + DT ID) |
| eBiz Dealers **EBA** | `[1,2,4,5]` | Dealers included on the partner's Ebusiness account (by partner ID) |

### Identify New Dealers

Compare DT or Partner IDs (where applicable) found on the **Request File** with **eBiz Dealers**. We are looking for any requested dealers that do not have a corresponding entry in eBiz. This is expressed as *dealers requested who do not have an entry in eBiz*. In the scenario from the table above, we see that dealers 3,6 and 7 fit this criteria.

- New Dealers (**ND**) = **RA** - **EBA**  | `[3,6,7]`

### Removing Inelligible/Invalid Dealers

Now that we've isolated a list of new setup requests, it's time to validate the corresponding DT accounts for enrollment. The following formula shows us how to find which dealers must be held back:

- Need Enrollment (**NE**) = **ND** - **DTA** | `[7]`

When processing these results, you may be returned a verbose object such as this:

```
{
	status: 'FAILED', 
	title: 'Inelligble Dealertrack ID', 
	dt: 562890, 
	partnerId: 'DRW-6060', 
	message: 'Enrollment phase is "Not Contacted" for 562890. This account is not eligible for product subscription. This may be due to a problem with DT matching process. Check for possible alternate accounts to remap DRW-6060.', 
	include: false
} 
```

OR

```
{
	dt: 704033, 
	partnerId: 'DRW-5723', 
	status: 'warning', 
	title: 'Limited Account Access for Dealer', 
	message: 'The dealer must reactivate their Dealertrack account to restore access to some functionality.', 
	include: true
} 
```

These dealers are not able to subscribe to products for one of several reasons. In most cases you'll need to notify the partner of these issues or find a way to resolve them, for example, by working with ADM to remap partners.



### Calculate Implementation Set
Now we simply remove any invalid DT enrollments from the request and proceed to provisioning. In the provided scenario, dealers 3 and 6 have been newly requested and are matched to an enrolled DT account.

- Need Implementation (**IMP**) = **ND** - **NE** | `[3,6]`

Using data about 3 and 6, we will use Workflower's built in tools to generate CSV files for the following output destinations using the appropriate partner settings (included with tools):

- eBiz Provisioning File
- Product Subscription Request
- FinanceDriver Provisioning File


### Validate Coverage
- **EBP** + **NE** = **ND**  | `[3,6; 7]` = `[3,6,7]`

Combining all items in your **NE** and **EBP** arrays should equal the **ND** array.

