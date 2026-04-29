---
title: Strict preset
---

# 🔴 Strict

Use when you want recommended-type-checked + additional stable runtime helpers.

## Config key

```ts
tsconfig.configs.strict
```

## Flat Config example

```ts
import tsconfig from "eslint-plugin-tsconfig";

export default [tsconfig.configs.strict];
```

## Rules in this preset

- `Fix` legend:
  - `🔧` = autofixable
  - `💡` = suggestions available
  - `—` = report only

| Rule | Fix |
| --- | :-: |
| [`consistent-module-resolution`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/consistent-module-resolution) | — |
| [`no-declaration-only-without-declaration`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-declaration-only-without-declaration) | 🔧 |
| [`no-disable-strict-subset`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-disable-strict-subset) | — |
| [`no-esmoduleinterop-with-verbatim`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-esmoduleinterop-with-verbatim) | 🔧 |
| [`no-include-dist`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-include-dist) | — |
| [`no-include-node-modules`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-include-node-modules) | 🔧 |
| [`no-rootdir-includes-outdir`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-rootdir-includes-outdir) | — |
| [`require-composite-for-references`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-composite-for-references) | 🔧 |
| [`require-declaration-with-composite`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-declaration-with-composite) | 🔧 |
| [`require-force-consistent-casing-in-file-names`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-force-consistent-casing-in-file-names) | 🔧 |
| [`require-outdir-when-emitting`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-outdir-when-emitting) | — |
| [`require-strict-mode`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-strict-mode) | 🔧 |
## Related presets

| Preset | Description |
| --- | --- |
| [🟡 recommended](./recommended.md) | Default baseline for most TypeScript codebases |
| [🟣 all](./all.md) | Every rule, including experimental coverage |
| [📤 emit-config](./emit-config.md) | Best practices for TypeScript emit/output configuration |
| [🧹 include-hygiene](./include-hygiene.md) | Clean include, exclude, and files patterns |
| [🎯 lib-target](./lib-target.md) | Consistency between target, lib, and downlevelling |
| [📦 module-resolution](./module-resolution.md) | Modern and consistent module resolution settings |
| [🔗 project-references](./project-references.md) | Correct TypeScript project references setup |
| [🔒 strict-mode](./strict-mode.md) | Strict mode options beyond the base strict flag |
