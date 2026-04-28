---
title: include-hygiene preset
---

# 🟡 include-hygiene

Rules that enforce clean `include`, `exclude`, and `files` patterns in your tsconfig, preventing accidental inclusion of build artifacts or `node_modules`.

## Config key

```ts
tsconfig.configs["include-hygiene"]
```

## Flat Config example

```ts
import tsconfig from "eslint-plugin-tsconfig";

export default [tsconfig.configs["include-hygiene"]];
```

## Rules in this preset

- `Fix` legend:
  - `🔧` = autofixable
  - `💡` = suggestions available
  - `—` = report only

| Rule                                                                                                                                  | Fix |
| ------------------------------------------------------------------------------------------------------------------------------------- | :-: |
| [`no-include-dist`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-include-dist)                                   |  —  |
| [`no-include-node-modules`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-include-node-modules)                   |  🔧 |
| [`no-skip-lib-check`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-skip-lib-check)                               |  —  |
| [`require-exclude-common-artifacts`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-exclude-common-artifacts) |  🔧 |
