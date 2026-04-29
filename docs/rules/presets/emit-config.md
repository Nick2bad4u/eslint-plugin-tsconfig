---
title: emit-config preset
---

# 📤 emit-config

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

## Related presets

| Preset                                           | Description                                        |
| ------------------------------------------------ | -------------------------------------------------- |
| [🟡 recommended](./recommended.md)               | Default baseline for most TypeScript codebases     |
| [🔴 strict](./strict.md)                         | Recommended plus a richer set of safety rules      |
| [🟣 all](./all.md)                               | Every rule, including experimental coverage        |
| [🧹 include-hygiene](./include-hygiene.md)       | Clean include, exclude, and files patterns         |
| [🎯 lib-target](./lib-target.md)                 | Consistency between target, lib, and downlevelling |
| [📦 module-resolution](./module-resolution.md)   | Modern and consistent module resolution settings   |
| [🔗 project-references](./project-references.md) | Correct TypeScript project references setup        |
| [🔒 strict-mode](./strict-mode.md)               | Strict mode options beyond the base strict flag    |
