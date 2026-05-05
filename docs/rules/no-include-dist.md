---
title: no-include-dist
description: Disallow include patterns that match the dist output directory.
---

# no-include-dist

Disallow `include` patterns that match the `dist` output directory.

## Targeted pattern scope

The root-level `include` array in any `tsconfig*.json` file.

## What this rule reports

This rule reports `include` entries whose text matches a `dist` path segment,
for example:

- `"dist"`
- `"./dist"`
- `"dist/**"`
- `"packages/dist/types"`

It does not currently report on other output directory names such as `build`,
`out`, or `lib`, and it does not try to infer that broad globs like `"**/*"`
will include `dist` transitively.

## Why this rule exists

`dist` typically contains generated output that TypeScript should not recompile.
Including it in the program creates duplicate work, confusing errors, and noisy
feedback from generated files instead of source files.

## ❌ Incorrect

```json
{
  "include": ["src", "dist"]
}
```

TypeScript will attempt to process files in `dist/`, which are build outputs.

## ✅ Correct

```json
{
  "include": ["src"]
}
```

```json
{
  "include": ["./src", "./packages/*/src"]
}
```

## When not to use it

Disable this rule only when the project intentionally type-checks files emitted
into a `dist` directory.

## Package documentation

> **Rule catalog ID:** R009

## Further reading

- [TypeScript handbook — `include`](https://www.typescriptlang.org/tsconfig#include)
- [TypeScript handbook — `exclude`](https://www.typescriptlang.org/tsconfig#exclude)
