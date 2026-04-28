---
title: require-source-map-in-dev
description: Require source maps to be enabled in non-production tsconfig files.
---

# require-source-map-in-dev

Require `"sourceMap": true` (or `"inlineSourceMap": true`) in development-
oriented tsconfig files so that stack traces and debugger sessions map back to
original TypeScript source.

## Targeted pattern scope

The `compilerOptions.sourceMap`, `compilerOptions.inlineSourceMap`, and
`compilerOptions.noEmit` fields in `tsconfig*.json` files that are not
identified as production-only build configs.

## What this rule reports

This rule reports when a tsconfig that emits JavaScript does not set either
`"sourceMap": true` or `"inlineSourceMap": true`. The rule does not fire
when `"noEmit": true` is set, since no output is produced.

## Why this rule exists

Without source maps, runtime errors and debugger breakpoints reference
compiled JavaScript locations. Developers must manually translate line numbers
back to TypeScript source, which slows down debugging.

Source maps are small and have no runtime cost — they are only loaded when
developer tools are open. The only reason to omit them in development is an
explicit performance optimization for production bundles, which should be
handled in a separate production-only tsconfig.

The auto-fixer adds `"sourceMap": true` to `compilerOptions`.

## ❌ Incorrect

```json
{
    "compilerOptions": {
        "target": "ES2022",
        "outDir": "./dist"
    }
}
```

Stack traces from compiled code will reference `dist/` line numbers, not the
original TypeScript source.

## ✅ Correct

```json
{
    "compilerOptions": {
        "target": "ES2022",
        "outDir": "./dist",
        "sourceMap": true
    }
}
```

Or using inline source maps:

```json
{
    "compilerOptions": {
        "target": "ES2022",
        "outDir": "./dist",
        "inlineSourceMap": true
    }
}
```

## When not to use it

Disable this rule for production build tsconfig files where source maps are
intentionally omitted to reduce bundle size or prevent source exposure.

## Package documentation

> **Rule catalog ID:** R023

## Further reading

- [TypeScript handbook — `sourceMap`](https://www.typescriptlang.org/tsconfig#sourceMap)
- [TypeScript handbook — `inlineSourceMap`](https://www.typescriptlang.org/tsconfig#inlineSourceMap)
