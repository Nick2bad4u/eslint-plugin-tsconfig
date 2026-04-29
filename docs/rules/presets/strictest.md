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

| Rule | Fix |
| --- | :-: |
| [`no-disable-strict-subset`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-disable-strict-subset) | — |
| [`no-skip-lib-check`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-skip-lib-check) | — |
| [`no-suppress-implicit-any-index-errors`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-suppress-implicit-any-index-errors) | — |
| [`require-exact-optional-property-types`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-exact-optional-property-types) | 🔧 |
| [`require-force-consistent-casing-in-file-names`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-force-consistent-casing-in-file-names) | 🔧 |
| [`require-isolated-declarations`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-isolated-declarations) | 🔧 |
| [`require-no-fallthrough-cases-in-switch`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-no-fallthrough-cases-in-switch) | 🔧 |
| [`require-no-implicit-override`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-no-implicit-override) | 🔧 |
| [`require-no-implicit-returns`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-no-implicit-returns) | 🔧 |
| [`require-no-property-access-from-index-signature`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-no-property-access-from-index-signature) | 🔧 |
| [`require-no-unchecked-indexed-access`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-no-unchecked-indexed-access) | 🔧 |
| [`require-no-unused-locals`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-no-unused-locals) | 🔧 |
| [`require-no-unused-parameters`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-no-unused-parameters) | 🔧 |
| [`require-strict-mode`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-strict-mode) | 🔧 |
| [`require-use-unknown-in-catch-variables`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-use-unknown-in-catch-variables) | 🔧 |
## Related presets

| Preset                             | Description                                             |
| ---------------------------------- | ------------------------------------------------------- |
| [🟡 recommended](./recommended.md) | Default baseline for most TypeScript codebases          |
| [🔴 strict](./strict.md)           | Recommended plus a richer set of safety rules           |
| [🟢 jsconfig](./jsconfig.md)       | Strictness-oriented coverage for jsconfig.json projects |
| [🟣 all](./all.md)                 | Every rule, including experimental coverage             |
| [🔒 strict-mode](./strict-mode.md) | Strict mode options beyond the base strict flag         |
