---
title: Recommended preset
---

# 🟡 Recommended

Use as the default baseline for most TypeScript codebases.

## Config key

```ts
tsconfig.configs.recommended
```

## Flat Config example

```ts
import tsconfig from "eslint-plugin-tsconfig";

export default [tsconfig.configs.recommended];
```

This preset does **not** require type information.

For stricter coverage, see the [`strict`](./strict.md) preset, or use the
[`all`](./all.md) preset to enable every available rule.

## Alternative: apply recommended rules in your own scope

```ts
import tsParser from "@typescript-eslint/parser";
import tsconfig from "eslint-plugin-tsconfig";

export default [
    {
        files: ["src/**/*.ts", "src/**/*.tsx"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
            },
        },
        plugins: {
            tsconfig,
        },
        rules: {
            ...tsconfig.configs.recommended.rules,
        },
    },
];
```

This option is useful when you want the recommended rule set, but only for specific file globs.

## Rules in this preset

- `Fix` legend:
  - `🔧` = autofixable
  - `💡` = suggestions available
  - `—` = report only

| Rule                                                                                                                          | Fix |
| ----------------------------------------------------------------------------------------------------------------------------- | :-: |
| [`consistent-module-resolution`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/consistent-module-resolution) |  —  |
| [`require-strict-mode`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-strict-mode)                   |  🔧 |

## Related presets

| Preset                                           | Description                                             |
| ------------------------------------------------ | ------------------------------------------------------- |
| [🔴 strict](./strict.md)                         | Recommended plus a richer set of safety rules           |
| [🟣 all](./all.md)                               | Every rule, including experimental coverage             |
| [📤 emit-config](./emit-config.md)               | Best practices for TypeScript emit/output configuration |
| [🧹 include-hygiene](./include-hygiene.md)       | Clean include, exclude, and files patterns              |
| [🎯 lib-target](./lib-target.md)                 | Consistency between target, lib, and downlevelling      |
| [📦 module-resolution](./module-resolution.md)   | Modern and consistent module resolution settings        |
| [🔗 project-references](./project-references.md) | Correct TypeScript project references setup             |
| [🔒 strict-mode](./strict-mode.md)               | Strict mode options beyond the base strict flag         |
