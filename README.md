# @workflower

A monorepo for combinging repositories that are spread across Github with similar names and
plenty of duplicate functionality. This is an effort to  consolidate efforts that have taken
place since 2018.

#### Uses

- Lerna for monorepo handling
- Yarn workspaces for custom name spaces

#### Quickstart

- Clone repository
- `lerna bootstrap` or `yarn install`
- `yarn run start`

This start our React client at `http://localhost:3333` and a documentation server at `http://localhost:3000`

#### Building

- `yarn run build`

### Package Version Notice - August 17th 2020

```
@wf/documentation v0.2.0 docs
@wf/core          v0.6.0 packages/core
@wf/csv           v0.5.0 packages/csv
@wf/examples      v0.3.0 packages/examples
@wf/react-ts      v0.6.0 packages/react-ts
@wf/template      v0.1.0 packages/template
@wf/types         v0.6.0 packages/types
```

