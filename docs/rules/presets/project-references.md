---
title: project-references preset
---

# 🟡 project-references

Rules that enforce correct TypeScript project references setup, requiring `composite`, `declaration`, and other settings that project references depend on.

## Config key

```ts
tsconfig.configs["project-references"]
```

## Flat Config example

```ts
import tsconfig from "eslint-plugin-tsconfig";

export default [tsconfig.configs["project-references"]];
```

## Rules in this preset

- `Fix` legend:
  - `🔧` = autofixable
  - `💡` = suggestions available
  - `—` = report only

| Rule                                                                                                                                      | Fix |
| ----------------------------------------------------------------------------------------------------------------------------------------- | :-: |
| [`no-emit-in-root-config`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-emit-in-root-config)                         |  🔧 |
| [`require-composite-for-references`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-composite-for-references)     |  🔧 |
| [`require-declaration-with-composite`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-declaration-with-composite) |  🔧 |
