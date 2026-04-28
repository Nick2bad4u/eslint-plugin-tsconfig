---
title: require-exclude-common-artifacts
description: Require that common build output and tool directories are excluded.
---

# require-exclude-common-artifacts

Require that `exclude` contains entries for common build artifact and tooling
directories such as `node_modules`, `dist`, `coverage`, and `.cache`.

## Targeted pattern scope

The `exclude` array in any `tsconfig*.json` file.

## What this rule reports

This rule reports when commonly generated directories that should not be
type-checked are absent from `exclude`. The checked directories include:
`node_modules`, `dist`, `build`, `coverage`, `.cache`, `temp`.

Note: TypeScript excludes `node_modules` by default when `exclude` is absent,
but when an explicit `exclude` array is provided the default is replaced and
`node_modules` must be listed manually.

## Why this rule exists

When a project defines a custom `exclude` array, TypeScript's automatic
exclusion of `node_modules` no longer applies. If `node_modules` is not in the
list, TypeScript will process all package source files, which dramatically
increases type-check time and may introduce duplicate symbol errors.

Similarly, including `dist`, `build`, or `coverage` in the compilation causes
TypeScript to re-process generated files, which can produce confusing cascading
errors and slow incremental builds.

The auto-fixer appends missing directories to the `exclude` array.

## ❌ Incorrect

```json
{
    "include": ["src"],
    "exclude": ["dist"]
}
```

`node_modules` is absent. Because `exclude` is explicitly defined, TypeScript
no longer applies its built-in default exclusion.

## ✅ Correct

```json
{
    "include": ["src"],
    "exclude": ["node_modules", "dist", "coverage"]
}
```

## When not to use it

Disable this rule in projects with a custom non-standard directory layout
where the common artifact directory names are not used.

## Package documentation

> **Rule catalog ID:** R019

## Further reading

- [TypeScript handbook — `exclude`](https://www.typescriptlang.org/tsconfig#exclude)
