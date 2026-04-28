---
title: no-emit-in-root-config
description: Disallow emit settings in root tsconfig when project references are used.
---

# no-emit-in-root-config

Disallow emit-producing compiler options in the root `tsconfig.json` when the
project uses TypeScript project references.

## Targeted pattern scope

The `compilerOptions.noEmit`, `compilerOptions.emitDeclarationOnly`, and
`references` fields in the root-level `tsconfig.json`.

## What this rule reports

This rule reports when a `tsconfig.json` that declares a non-empty `references`
array does not set `"noEmit": true` in its `compilerOptions`. In project
reference builds the root config is used purely to orchestrate composite
sub-projects; the root itself should not produce output.

## Why this rule exists

When TypeScript project references are used, each referenced sub-project is
responsible for its own output. The root `tsconfig.json` is an orchestration
file: running `tsc -b` from the root builds all references in dependency order.
If the root config is also set to emit output, it creates two independent emit
paths — one from the root and one from each composite sub-project — which
frequently produce overlapping or conflicting output files.

Setting `"noEmit": true` in the root config makes the orchestration role
explicit and prevents accidental double-emit.

## ❌ Incorrect

```json
{
    "compilerOptions": {
        "outDir": "./dist"
    },
    "references": [
        { "path": "./packages/core" },
        { "path": "./packages/utils" }
    ]
}
```

The root config has emit settings while also acting as a project references
orchestrator.

## ✅ Correct

```json
{
    "compilerOptions": {
        "noEmit": true
    },
    "references": [
        { "path": "./packages/core" },
        { "path": "./packages/utils" }
    ]
}
```

Each referenced sub-project (`packages/core/tsconfig.json`, etc.) handles its
own emit with `"composite": true` and the appropriate `outDir`.

## When not to use it

Disable this rule when the root config is intentionally both an entry point
for type checking the full project and a build config for a monolithic output
— a pattern more common in small single-package projects.

## Package documentation

> **Rule catalog ID:** R006

## Further reading

- [TypeScript handbook — Project references](https://www.typescriptlang.org/docs/handbook/project-references.html)
- [TypeScript handbook — `noEmit`](https://www.typescriptlang.org/tsconfig#noEmit)
