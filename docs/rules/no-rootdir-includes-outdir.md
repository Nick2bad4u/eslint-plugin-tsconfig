---
title: no-rootdir-includes-outdir
description: Disallow rootDir that includes or overlaps with outDir.
---

# no-rootdir-includes-outdir

Disallow `rootDir` values that overlap with or include the `outDir`, which
causes TypeScript to read and then immediately overwrite the same files.

## Targeted pattern scope

The `compilerOptions.rootDir` and `compilerOptions.outDir` fields in any
`tsconfig*.json` file.

## What this rule reports

This rule reports when `rootDir` and `outDir` are the same path, or when
`rootDir` is a parent of `outDir` such that generated output would be written
into the source tree.

## Why this rule exists

When `outDir` is nested inside `rootDir`, TypeScript's next compilation pass
will include the previously-generated JavaScript and declaration files as
inputs. This creates a feedback loop: the output of one build becomes an
input for the next, causing growing compile times, duplicate declarations, and
incorrect type information.

The correct pattern is to use sibling directories: `src/` as `rootDir` and a
separate top-level `dist/` or `build/` directory as `outDir`, so that output
is always distinct from source.

## ❌ Incorrect

```json
{
    "compilerOptions": {
        "rootDir": ".",
        "outDir": "./dist"
    }
}
```

`dist/` is a subdirectory of `.` (rootDir), so generated files fall inside
the source tree.

```json
{
    "compilerOptions": {
        "rootDir": "./src",
        "outDir": "./src/dist"
    }
}
```

`outDir` is directly nested inside `rootDir`.

## ✅ Correct

```json
{
    "compilerOptions": {
        "rootDir": "./src",
        "outDir": "./dist"
    }
}
```

`src/` and `dist/` are siblings; output is written entirely outside the
source root.

## When not to use it

Disable this rule only when a custom build pipeline explicitly excludes the
output directory from subsequent TypeScript compilations via `exclude`.

## Package documentation

> **Rule catalog ID:** R012

## Further reading

- [TypeScript handbook — `rootDir`](https://www.typescriptlang.org/tsconfig#rootDir)
- [TypeScript handbook — `outDir`](https://www.typescriptlang.org/tsconfig#outDir)
