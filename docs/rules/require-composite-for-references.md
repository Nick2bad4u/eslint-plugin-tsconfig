---
title: require-composite-for-references
description: Require composite:true in any tsconfig referenced by another tsconfig.
---

# require-composite-for-references

Require `"composite": true` in any `tsconfig.json` that is listed as a
project reference by another tsconfig.

## Targeted pattern scope

The `references` array in `tsconfig*.json` files and the
`compilerOptions.composite` field of referenced project configs.

## What this rule reports

This rule reports when a `tsconfig.json` that contains a `references` array
points to a project that does not have `"composite": true` in its own
`compilerOptions`. TypeScript itself enforces this at compile time, but this
rule surfaces the misconfiguration at lint time — before `tsc` is invoked.

## Why this rule exists

TypeScript project references rely on the `composite` flag in each referenced
project to:

1. Generate `.d.ts` declaration files that the referencing project can consume
   without re-reading source files.
2. Produce `.tsbuildinfo` incremental build files so `tsc -b` can skip
   unchanged projects.
3. Enforce that the referenced project defines its `rootDir` and `outDir`
   explicitly.

Without `composite: true`, `tsc -b` will error at build time. Catching this at
lint time gives faster feedback and avoids broken CI pipelines.

The auto-fixer adds `"composite": true` to the referenced project's
`compilerOptions`.

## ❌ Incorrect

`tsconfig.json` (root orchestrator):

```json
{
    "references": [
        { "path": "./packages/core" }
    ]
}
```

`packages/core/tsconfig.json` (missing `composite`):

```json
{
    "compilerOptions": {
        "outDir": "./dist",
        "declaration": true
    }
}
```

## ✅ Correct

`packages/core/tsconfig.json`:

```json
{
    "compilerOptions": {
        "composite": true,
        "outDir": "./dist",
        "declaration": true
    }
}
```

## When not to use it

Disable this rule only when project references are used in a non-standard
`tsc` workflow where the normal `composite` requirements do not apply.

## Package documentation

> **Rule catalog ID:** R015

## Further reading

- [TypeScript handbook — Project references](https://www.typescriptlang.org/docs/handbook/project-references.html)
- [TypeScript handbook — `composite`](https://www.typescriptlang.org/tsconfig#composite)
