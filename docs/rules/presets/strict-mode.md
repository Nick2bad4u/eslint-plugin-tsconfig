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

| Rule                                                                                                                                            | Fix |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | :-: |
| [`no-disable-strict-subset`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-disable-strict-subset)                           |  —  |
| [`require-exact-optional-property-types`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-exact-optional-property-types) |  🔧 |
| [`require-no-implicit-override`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-no-implicit-override)                   |  🔧 |
| [`require-no-unchecked-indexed-access`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-no-unchecked-indexed-access)     |  🔧 |
| [`require-strict-mode`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-strict-mode)                                     |  🔧 |

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
