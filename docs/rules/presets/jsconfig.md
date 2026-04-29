---
title: jsconfig preset
---

# 🟢 jsconfig

Use when you lint `jsconfig.json` files and want strong JavaScript-project compiler-option hygiene without TS-only project-reference constraints.

## Config key

```ts
tsconfig.configs.jsconfig
```

## Flat Config example

```ts
import tsconfig from "eslint-plugin-tsconfig";

export default [tsconfig.configs.jsconfig];
```

## Rules in this preset

- `Fix` legend:
  - `🔧` = autofixable
  - `💡` = suggestions available
  - `—` = report only

| Rule                                                                                                                                            | Fix |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | :-: |
| [`consistent-module-resolution`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/consistent-module-resolution)                   |  —  |
| [`no-disable-strict-subset`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-disable-strict-subset)                           |  —  |
| [`no-include-dist`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-include-dist)                                             |  —  |
| [`no-include-node-modules`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-include-node-modules)                             |  🔧 |
| [`no-legacy-module-resolution`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-legacy-module-resolution)                     |  —  |
| [`no-skip-lib-check`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-skip-lib-check)                                         |  —  |
| [`require-bundler-module-resolution`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-bundler-module-resolution)         |  🔧 |
| [`require-exact-optional-property-types`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-exact-optional-property-types) |  🔧 |
| [`require-exclude-common-artifacts`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-exclude-common-artifacts)           |  🔧 |
| [`require-no-implicit-override`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-no-implicit-override)                   |  🔧 |
| [`require-no-unchecked-indexed-access`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-no-unchecked-indexed-access)     |  🔧 |
| [`require-strict-mode`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-strict-mode)                                     |  🔧 |
| [`require-verbatim-module-syntax`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-verbatim-module-syntax)               |  🔧 |

## Related presets

| Preset                                         | Description                                      |
| ---------------------------------------------- | ------------------------------------------------ |
| [🟡 recommended](./recommended.md)             | Default baseline for most TypeScript codebases   |
| [🔴 strict](./strict.md)                       | Recommended plus a richer set of safety rules    |
| [💎 strictest](./strictest.md)                 | Maximum strict compiler-settings coverage        |
| [🟣 all](./all.md)                             | Every rule, including experimental coverage      |
| [📦 module-resolution](./module-resolution.md) | Modern and consistent module resolution settings |
| [🧹 include-hygiene](./include-hygiene.md)     | Clean include, exclude, and files patterns       |
| [🔒 strict-mode](./strict-mode.md)             | Strict mode options beyond the base strict flag  |
