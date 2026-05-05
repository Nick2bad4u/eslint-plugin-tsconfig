---
title: require-exclude-common-artifacts
description: Require node_modules and dist in an explicit exclude array.
---

# require-exclude-common-artifacts

Require an explicit `exclude` array to contain `node_modules` and `dist`.

## Targeted pattern scope

The root-level `exclude` array in any `tsconfig*.json` file.

## What this rule reports

This rule reports only when an explicit `exclude` array is present but does not
contain one or both of these entries:

- `node_modules`
- `dist`

When `exclude` is absent, this rule does not report.

## Why this rule exists

When a project defines a custom `exclude` array, TypeScript's automatic
exclusion of `node_modules` no longer applies. If `node_modules` is missing,
TypeScript may process package sources and declarations unnecessarily.

Including `dist` in the program likewise causes TypeScript to re-process build
output, which slows type-checking and can produce confusing errors.

The auto-fixer appends any missing entries to the `exclude` array.

## ❌ Incorrect

```json
{
    "include": ["src"],
    "exclude": ["dist"]
}
```

`node_modules` is absent. Because `exclude` is explicitly defined, TypeScript no
longer applies its built-in default exclusion.

## ✅ Correct

```json
{
    "include": ["src"],
    "exclude": ["node_modules", "dist"]
}
```

## When not to use it

Disable this rule in projects with a custom directory layout or where an
explicit `exclude` array is intentionally used for a different strategy.

## Package documentation

> **Rule catalog ID:** R019

## Further reading

- [TypeScript handbook — `exclude`](https://www.typescriptlang.org/tsconfig#exclude)
