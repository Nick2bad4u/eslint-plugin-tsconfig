---
title: lib-target preset
---

# 🎯 lib-target

Rules that enforce consistency between `target`, `lib`, and related TypeScript downlevelling options.

## Config key

```ts
tsconfig.configs["lib-target"]
```

## Flat Config example

```ts
import tsconfig from "eslint-plugin-tsconfig";

export default [tsconfig.configs["lib-target"]];
```

## Rules in this preset

- `Fix` legend:
  - `🔧` = autofixable
  - `💡` = suggestions available
  - `—` = report only

| Rule | Fix |
| --- | :-: |
| [`consistent-target-and-lib`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/consistent-target-and-lib) | — |
| [`no-deprecated-target`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-deprecated-target) | — |
| [`no-esnext-target-in-library`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-esnext-target-in-library) | — |
| [`require-downlevel-iteration-with-iterators`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-downlevel-iteration-with-iterators) | 🔧 |
## Related presets

| Preset                                           | Description                                             |
| ------------------------------------------------ | ------------------------------------------------------- |
| [🟡 recommended](./recommended.md)               | Default baseline for most TypeScript codebases          |
| [🔴 strict](./strict.md)                         | Recommended plus a richer set of safety rules           |
| [🟣 all](./all.md)                               | Every rule, including experimental coverage             |
| [📤 emit-config](./emit-config.md)               | Best practices for TypeScript emit/output configuration |
| [🧹 include-hygiene](./include-hygiene.md)       | Clean include, exclude, and files patterns              |
| [📦 module-resolution](./module-resolution.md)   | Modern and consistent module resolution settings        |
| [🔗 project-references](./project-references.md) | Correct TypeScript project references setup             |
| [🔒 strict-mode](./strict-mode.md)               | Strict mode options beyond the base strict flag         |
