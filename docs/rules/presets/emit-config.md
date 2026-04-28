---
title: emit-config preset
---

# 🟡 emit-config

Rules that enforce best practices for TypeScript emit (output) configuration, including `outDir`, `declaration`, `declarationMap`, and `sourceMap` settings.

## Config key

```ts
tsconfig.configs["emit-config"]
```

## Flat Config example

```ts
import tsconfig from "eslint-plugin-tsconfig";

export default [tsconfig.configs["emit-config"]];
```

## Rules in this preset

- `Fix` legend:
  - `🔧` = autofixable
  - `💡` = suggestions available
  - `—` = report only

| Rule                                                                                                                                                | Fix |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | :-: |
| [`consistent-incremental-with-tsbuildinfo`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/consistent-incremental-with-tsbuildinfo) |  🔧 |
| [`no-declaration-only-without-declaration`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-declaration-only-without-declaration) |  🔧 |
| [`no-emit-in-root-config`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-emit-in-root-config)                                   |  🔧 |
| [`no-rootdir-includes-outdir`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-rootdir-includes-outdir)                           |  —  |
| [`require-outdir-when-emitting`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-outdir-when-emitting)                       |  —  |
| [`require-source-map-in-dev`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-source-map-in-dev)                             |  🔧 |
