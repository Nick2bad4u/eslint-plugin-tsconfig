---
title: include-hygiene preset
---

# 🧹 include-hygiene

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

## Related presets

| Preset                                           | Description                                             |
| ------------------------------------------------ | ------------------------------------------------------- |
| [🟡 recommended](./recommended.md)               | Default baseline for most TypeScript codebases          |
| [🔴 strict](./strict.md)                         | Recommended plus a richer set of safety rules           |
| [🟣 all](./all.md)                               | Every rule, including experimental coverage             |
| [📤 emit-config](./emit-config.md)               | Best practices for TypeScript emit/output configuration |
| [🎯 lib-target](./lib-target.md)                 | Consistency between target, lib, and downlevelling      |
| [📦 module-resolution](./module-resolution.md)   | Modern and consistent module resolution settings        |
| [🔗 project-references](./project-references.md) | Correct TypeScript project references setup             |
| [🔒 strict-mode](./strict-mode.md)               | Strict mode options beyond the base strict flag         |
