---
title: module-resolution preset
---

# 📦 module-resolution

Rules that enforce modern and consistent module resolution settings in tsconfig, including `moduleResolution`, `module`, and `esModuleInterop` options.

## Config key

```ts
tsconfig.configs["module-resolution"]
```

## Flat Config example

```ts
import tsconfig from "eslint-plugin-tsconfig";

export default [tsconfig.configs["module-resolution"]];
```

## Rules in this preset

- `Fix` legend:
  - `🔧` = autofixable
  - `💡` = suggestions available
  - `—` = report only

| Rule | Fix |
| --- | :-: |
| [`consistent-module-resolution`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/consistent-module-resolution) | — |
| [`no-esmoduleinterop-with-verbatim`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-esmoduleinterop-with-verbatim) | 🔧 |
| [`no-legacy-module-detection`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-legacy-module-detection) | — |
| [`no-legacy-module-resolution`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-legacy-module-resolution) | — |
| [`require-bundler-module-resolution`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-bundler-module-resolution) | 🔧 |
| [`require-isolated-modules`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-isolated-modules) | 🔧 |
| [`require-verbatim-module-syntax`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-verbatim-module-syntax) | 🔧 |
## Related presets

| Preset                                           | Description                                             |
| ------------------------------------------------ | ------------------------------------------------------- |
| [🟡 recommended](./recommended.md)               | Default baseline for most TypeScript codebases          |
| [🔴 strict](./strict.md)                         | Recommended plus a richer set of safety rules           |
| [🟣 all](./all.md)                               | Every rule, including experimental coverage             |
| [📤 emit-config](./emit-config.md)               | Best practices for TypeScript emit/output configuration |
| [🧹 include-hygiene](./include-hygiene.md)       | Clean include, exclude, and files patterns              |
| [🎯 lib-target](./lib-target.md)                 | Consistency between target, lib, and downlevelling      |
| [🔗 project-references](./project-references.md) | Correct TypeScript project references setup             |
| [🔒 strict-mode](./strict-mode.md)               | Strict mode options beyond the base strict flag         |
