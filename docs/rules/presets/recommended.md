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

If you want the same baseline plus type-aware helper rules, use
`tsconfig.configs["recommended-type-checked"]`.

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

| Rule | Fix |
| --- | :-: |
| [`consistent-module-resolution`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/consistent-module-resolution) | — |
| [`require-strict-mode`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-strict-mode) | 🔧 |
