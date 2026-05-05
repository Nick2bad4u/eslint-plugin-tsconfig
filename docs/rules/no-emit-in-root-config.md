---
title: no-emit-in-root-config
description: Require noEmit:true in the root tsconfig.json file.
---

# no-emit-in-root-config

Require `"noEmit": true` in the root `tsconfig.json` file.

## Targeted pattern scope

The `compilerOptions.noEmit` field in the root-level `tsconfig.json`.

## What this rule reports

This rule reports when the root `tsconfig.json` file does not set
`"noEmit": true` in `compilerOptions`, or sets it to `false`.

## Why this rule exists

In this plugin's opinionated model, the root `tsconfig.json` should coordinate
other configs or provide shared settings, not emit JavaScript itself. Requiring
`"noEmit": true` makes that separation explicit and avoids accidental output
from the root config.

## ❌ Incorrect

```json
{
    "compilerOptions": {
        "outDir": "./dist"
    }
}
```

The root config is allowed to emit because `noEmit` is not enabled.

## ✅ Correct

```json
{
    "compilerOptions": {
        "noEmit": true
    }
}
```

## When not to use it

Disable this rule when the root `tsconfig.json` is intentionally also the emit
config for the project.

## Package documentation

> **Rule catalog ID:** R006

## Further reading

- [TypeScript handbook — `noEmit`](https://www.typescriptlang.org/tsconfig#noEmit)
