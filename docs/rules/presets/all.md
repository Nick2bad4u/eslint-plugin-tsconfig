---
title: All preset
---

# 🟣 All

Use when you explicitly want every plugin rule, including experimental coverage.

## Config key

```ts
tsconfig.configs.all
```

## Flat Config example

```ts
import tsconfig from "eslint-plugin-tsconfig";

export default [tsconfig.configs.all];
```

## Rules in this preset

- `Fix` legend:
  - `🔧` = autofixable
  - `💡` = suggestions available
  - `—` = report only

| Rule | Fix |
| --- | :-: |
| [`consistent-incremental-with-tsbuildinfo`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/consistent-incremental-with-tsbuildinfo) | 🔧 |
| [`consistent-module-resolution`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/consistent-module-resolution) | — |
| [`consistent-target-and-lib`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/consistent-target-and-lib) | — |
| [`no-allowjs-without-checkjs`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-allowjs-without-checkjs) | — |
| [`no-declaration-only-without-declaration`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-declaration-only-without-declaration) | 🔧 |
| [`no-deprecated-target`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-deprecated-target) | — |
| [`no-disable-strict-subset`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-disable-strict-subset) | — |
| [`no-emit-in-root-config`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-emit-in-root-config) | 🔧 |
| [`no-esmoduleinterop-with-verbatim`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-esmoduleinterop-with-verbatim) | 🔧 |
| [`no-esnext-target-in-library`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-esnext-target-in-library) | — |
| [`no-include-dist`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-include-dist) | — |
| [`no-include-node-modules`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-include-node-modules) | 🔧 |
| [`no-inline-source-map`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-inline-source-map) | — |
| [`no-legacy-module-detection`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-legacy-module-detection) | — |
| [`no-legacy-module-resolution`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-legacy-module-resolution) | — |
| [`no-rootdir-includes-outdir`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-rootdir-includes-outdir) | — |
| [`no-skip-lib-check`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-skip-lib-check) | — |
| [`no-suppress-implicit-any-index-errors`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-suppress-implicit-any-index-errors) | — |
| [`require-bundler-module-resolution`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-bundler-module-resolution) | 🔧 |
| [`require-composite-for-references`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-composite-for-references) | 🔧 |
| [`require-declaration-map`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-declaration-map) | 🔧 |
| [`require-declaration-with-composite`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-declaration-with-composite) | 🔧 |
| [`require-downlevel-iteration-with-iterators`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-downlevel-iteration-with-iterators) | 🔧 |
| [`require-exact-optional-property-types`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-exact-optional-property-types) | 🔧 |
| [`require-exclude-common-artifacts`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-exclude-common-artifacts) | 🔧 |
| [`require-force-consistent-casing-in-file-names`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-force-consistent-casing-in-file-names) | 🔧 |
| [`require-isolated-declarations`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-isolated-declarations) | 🔧 |
| [`require-isolated-modules`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-isolated-modules) | 🔧 |
| [`require-no-fallthrough-cases-in-switch`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-no-fallthrough-cases-in-switch) | 🔧 |
| [`require-no-implicit-override`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-no-implicit-override) | 🔧 |
| [`require-no-implicit-returns`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-no-implicit-returns) | 🔧 |
| [`require-no-property-access-from-index-signature`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-no-property-access-from-index-signature) | 🔧 |
| [`require-no-unchecked-indexed-access`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-no-unchecked-indexed-access) | 🔧 |
| [`require-no-unused-locals`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-no-unused-locals) | 🔧 |
| [`require-no-unused-parameters`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-no-unused-parameters) | 🔧 |
| [`require-outdir-when-emitting`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-outdir-when-emitting) | — |
| [`require-source-map-in-dev`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-source-map-in-dev) | 🔧 |
| [`require-strict-mode`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-strict-mode) | 🔧 |
| [`require-use-unknown-in-catch-variables`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-use-unknown-in-catch-variables) | 🔧 |
| [`require-verbatim-module-syntax`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-verbatim-module-syntax) | 🔧 |
## Related presets

| Preset | Description |
| --- | --- |
| [🟡 recommended](./recommended.md) | Default baseline for most TypeScript codebases |
| [🔴 strict](./strict.md) | Recommended plus a richer set of safety rules |
| [📤 emit-config](./emit-config.md) | Best practices for TypeScript emit/output configuration |
| [🧹 include-hygiene](./include-hygiene.md) | Clean include, exclude, and files patterns |
| [🎯 lib-target](./lib-target.md) | Consistency between target, lib, and downlevelling |
| [📦 module-resolution](./module-resolution.md) | Modern and consistent module resolution settings |
| [🔗 project-references](./project-references.md) | Correct TypeScript project references setup |
| [🔒 strict-mode](./strict-mode.md) | Strict mode options beyond the base strict flag |
