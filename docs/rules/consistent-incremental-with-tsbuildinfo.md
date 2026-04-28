---
title: consistent-incremental-with-tsbuildinfo
description: Require tsBuildInfoFile to be set when incremental is enabled.
---

# consistent-incremental-with-tsbuildinfo

Require `tsBuildInfoFile` to be explicitly set whenever `incremental: true` is
present in `compilerOptions`.

## Targeted pattern scope

The `compilerOptions.incremental` and `compilerOptions.tsBuildInfoFile` fields
in any `tsconfig*.json` file.

## What this rule reports

This rule reports when `"incremental": true` is present in `compilerOptions`
but `tsBuildInfoFile` is not explicitly configured.

## Why this rule exists

TypeScript's incremental compilation caches type-checking information in a
build-info file. By default the file lands in the compiler's output directory
under a generated name. This is fine when there is only one project, but in
monorepos or multi-config setups multiple projects will silently overwrite each
other's cache, defeating the purpose of incremental builds and causing
unexplained cache misses.

Explicitly declaring `tsBuildInfoFile` makes the path intentional, reviewable,
and gitignore-friendly.

## ❌ Incorrect

```json
{
    "compilerOptions": {
        "incremental": true
    }
}
```

The `tsBuildInfoFile` path is unspecified, so TypeScript chooses a default
location that may conflict with other projects.

## ✅ Correct

```json
{
    "compilerOptions": {
        "incremental": true,
        "tsBuildInfoFile": ".tsbuildinfo"
    }
}
```

Or disable incremental compilation entirely:

```json
{
    "compilerOptions": {
        "incremental": false
    }
}
```

## When not to use it

This rule can be disabled in projects where there is genuinely only one
`tsconfig.json` and the default build-info location is acceptable and
committed to `.gitignore`.

## Package documentation

> **Rule catalog ID:** R001

## Further reading

- [TypeScript handbook — `incremental`](https://www.typescriptlang.org/tsconfig#incremental)
- [TypeScript handbook — `tsBuildInfoFile`](https://www.typescriptlang.org/tsconfig#tsBuildInfoFile)
