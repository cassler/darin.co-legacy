# @workflower

## What is this?

A collection of backoffice utilities for working with inbound implementation requests in bulk. Workflower primarily consists of two sets of tools which go hand-in-hand.

### 1. Pre-Processing
Workflower can pre-process digital retailing implementation request as they come in and automatically apply business logic. Arbitrary requests are validated against standard policies (billing, enrollment, partner  requints etc.) by analyzing reporting data exported from Dealertrack.

### 2. Post-Processing
After identifying the appropriate course for items, Workflower allows you to generate accurate bulk provisioning files which can be used to implement dealers on eBiz Suite, Finance Driver and product subscription.

## Included Packages

- **[core](https://ghe.coxautoinc.com/Darin-Cassler/workflower-monorepo/tree/master/packages/core)** - Central business logic and classes for analyzing account/partner data.
- **[react-ts](https://ghe.coxautoinc.com/Darin-Cassler/workflower-monorepo/tree/master/packages/react-ts)** - React client built with TypeScript
- **[csv](https://ghe.coxautoinc.com/Darin-Cassler/workflower-monorepo/tree/master/packages/csv)** - A collection of utilities for parsing/unparsing uploaded files.
- **[docs](https://ghe.coxautoinc.com/Darin-Cassler/workflower-monorepo/tree/master/docs)** - Self-contained documentation website using Docusaurus.

#### Quickstart (Developer)

- `lerna bootstrap` or `yarn install`
- `yarn run start`

This will start:

- React client at `http://localhost:3333`
- Documentation website `http://localhost:3000`


### Package Version Notice - August 20th 2020

```
@wf/docs     v0.5.0 docs
@wf/core     v0.6.0 packages/core
@wf/csv      v0.5.0 packages/csv
@wf/dex      v0.1.0 packages/dex
@wf/examples v0.3.0 packages/examples
@wf/react-ts v0.6.0 packages/react-ts
@wf/template v0.1.0 packages/template
@wf/types    v0.6.0 packages/types
```

