# @workflower

## What is this?

A collection of backoffice utilities for working with inbound implementation requests in bulk. Workflower primarily consists of two sets of tools which go hand-in-hand.

### 1. Pre-Processing
Workflower can pre-process digital retailing implementation request as they come in and automatically apply business logic. Arbitrary requests are validated against standard policies (billing, enrollment, partner  requints etc.) by analyzing reporting data exported from Dealertrack.

### 2. Post-Processing
After identifying the appropriate course for items, Workflower allows you to generate accurate bulk provisioning files which can be used to implement dealers on eBiz Suite, Finance Driver and product subscription.


# Quickstart

### For end-users

1. Download the [latest release (1.0.0)](https://ghe.coxautoinc.com/Darin-Cassler/workflower-monorepo/releases/download/1.0.0/workflower-portable-1.0.0-dist.zip)
2. Unzip the contents and open `index.html`
3. Head over to the [official documentation site](https://pages.ghe.coxautoinc.com/Darin-Cassler/workflower-monorepo/) for a complete walkthrough and full documentation.


### For developers

1. `lerna bootstrap` or `yarn install`
2. `yarn run start`

This will launch the React client at `http://localhost:3333` and documentation website `http://localhost:3000`


# Included Packages

- **[core](https://ghe.coxautoinc.com/Darin-Cassler/workflower-monorepo/tree/master/packages/core)** - Central business logic and classes for analyzing account/partner data.
- **[react-ts](https://ghe.coxautoinc.com/Darin-Cassler/workflower-monorepo/tree/master/packages/react-ts)** - React client built with TypeScript
- **[csv](https://ghe.coxautoinc.com/Darin-Cassler/workflower-monorepo/tree/master/packages/csv)** - A collection of utilities for parsing/unparsing uploaded files.
- **[docs](https://ghe.coxautoinc.com/Darin-Cassler/workflower-monorepo/tree/master/docs)** - Self-contained documentation website using Docusaurus.




## Package Version Notice - September 2 2020

```
@wf/docs     v1.0.0 docs
@wf/core     v1.0.0 packages/core
@wf/csv      v1.0.0 packages/csv
@wf/examples v1.0.0 packages/examples
@wf/react-ts v1.0.0 packages/react-ts
@wf/template v1.0.0 packages/template
@wf/types    v1.0.0 packages/types
@wf/utils    v1.0.0 packages/utils

