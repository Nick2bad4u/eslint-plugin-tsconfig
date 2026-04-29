---
title: strict-mode preset
---

# 🔒 strict-mode

Rules that enforce TypeScript strict mode options beyond the base `strict` flag, including `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`, `noImplicitOverride`, and similar settings.

## Config key

```ts
tsconfig.configs["strict-mode"]
```

## Flat Config example

```ts
import tsconfig from "eslint-plugin-tsconfig";

export default [tsconfig.configs["strict-mode"]];
```

## Rules in this preset

- `Fix` legend:
  - `🔧` = autofixable
  - `💡` = suggestions available
  - `—` = report only

| Rule | Fix |
| --- | :-: |
| [`no-disable-strict-subset`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-disable-strict-subset) | — |
| [`no-suppress-implicit-any-index-errors`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-suppress-implicit-any-index-errors) | — |
| [`require-exact-optional-property-types`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-exact-optional-property-types) | 🔧 |
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

| Preset                                           | Description                                             |
| ------------------------------------------------ | ------------------------------------------------------- |
| [🟡 recommended](./recommended.md)               | Default baseline for most TypeScript codebases          |
| [🔴 strict](./strict.md)                         | Recommended plus a richer set of safety rules           |
| [🟣 all](./all.md)                               | Every rule, including experimental coverage             |
| [📤 emit-config](./emit-config.md)               | Best practices for TypeScript emit/output configuration |
| [🧹 include-hygiene](./include-hygiene.md)       | Clean include, exclude, and files patterns              |
| [🎯 lib-target](./lib-target.md)                 | Consistency between target, lib, and downlevelling      |
| [📦 module-resolution](./module-resolution.md)   | Modern and consistent module resolution settings        |
| [🔗 project-references](./project-references.md) | Correct TypeScript project references setup             |
