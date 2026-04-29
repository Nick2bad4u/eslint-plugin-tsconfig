---
title: Strictest preset
---

# 💎 Strictest

Use when you want the strongest available compiler-strictness enforcement this plugin can validate for `tsconfig*.json` files.

## Config key

```ts
tsconfig.configs.strictest
```

## Flat Config example

```ts
import tsconfig from "eslint-plugin-tsconfig";

export default [tsconfig.configs.strictest];
```

## Rules in this preset

- `Fix` legend:
  - `🔧` = autofixable
  - `💡` = suggestions available
  - `—` = report only

| Rule                                                                                                                                            | Fix |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | :-: |
| [`no-disable-strict-subset`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-disable-strict-subset)                           |  —  |
| [`no-skip-lib-check`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-skip-lib-check)                                         |  —  |
| [`require-exact-optional-property-types`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-exact-optional-property-types) |  🔧 |
| [`require-no-implicit-override`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-no-implicit-override)                   |  🔧 |
| [`require-no-unchecked-indexed-access`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-no-unchecked-indexed-access)     |  🔧 |
| [`require-strict-mode`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-strict-mode)                                     |  🔧 |

## Related presets

| Preset                             | Description                                             |
| ---------------------------------- | ------------------------------------------------------- |
| [🟡 recommended](./recommended.md) | Default baseline for most TypeScript codebases          |
| [🔴 strict](./strict.md)           | Recommended plus a richer set of safety rules           |
| [🟢 jsconfig](./jsconfig.md)       | Strictness-oriented coverage for jsconfig.json projects |
| [🟣 all](./all.md)                 | Every rule, including experimental coverage             |
| [🔒 strict-mode](./strict-mode.md) | Strict mode options beyond the base strict flag         |
