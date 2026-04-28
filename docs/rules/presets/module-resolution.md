---
title: module-resolution preset
---

# 🟡 module-resolution

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

| Rule                                                                                                                                    | Fix |
| --------------------------------------------------------------------------------------------------------------------------------------- | :-: |
| [`consistent-module-resolution`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/consistent-module-resolution)           |  —  |
| [`no-esmoduleinterop-with-verbatim`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-esmoduleinterop-with-verbatim)   |  🔧 |
| [`no-legacy-module-resolution`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-legacy-module-resolution)             |  —  |
| [`require-bundler-module-resolution`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-bundler-module-resolution) |  🔧 |
| [`require-verbatim-module-syntax`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-verbatim-module-syntax)       |  🔧 |
