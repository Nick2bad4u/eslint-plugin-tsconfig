---
title: lib-target preset
---

# 🟡 lib-target

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

| Rule                                                                                                                                                      | Fix |
| --------------------------------------------------------------------------------------------------------------------------------------------------------- | :-: |
| [`consistent-target-and-lib`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/consistent-target-and-lib)                                   |  —  |
| [`no-esnext-target-in-library`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-esnext-target-in-library)                               |  —  |
| [`require-downlevel-iteration-with-iterators`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-downlevel-iteration-with-iterators) |  🔧 |
