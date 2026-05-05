---
title: require-source-map-in-dev
description: Require source maps to be enabled in tsconfig files that emit JavaScript.
---

# require-source-map-in-dev

Require `"sourceMap": true` (or `"inlineSourceMap": true`) in tsconfig files
that emit JavaScript so stack traces and debugger sessions map back to original
TypeScript source.

## Targeted pattern scope

The `compilerOptions.sourceMap`, `compilerOptions.inlineSourceMap`,
`compilerOptions.noEmit`, and `compilerOptions.emitDeclarationOnly` fields in
`tsconfig*.json` files.

## What this rule reports

This rule reports when a tsconfig that emits JavaScript does not set either
`"sourceMap": true` or `"inlineSourceMap": true`.

The rule does not report when:

- `"noEmit": true` is set, because no JavaScript output is produced.
- `"emitDeclarationOnly": true` is set, because only `.d.ts` output is
  produced.

## Why this rule exists

Without source maps, runtime errors and debugger breakpoints reference
compiled JavaScript locations. Developers must manually translate line numbers
back to TypeScript source, which slows down debugging.

Source maps are small and have no runtime cost — they are only loaded when
developer tools are open. If a config emits runnable JavaScript, enabling
either source maps or inline source maps usually makes debugging materially
easier.

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

Disable this rule for configs where emitted source maps are intentionally
forbidden, or where the project has a separate debugging workflow that does not
depend on TypeScript source maps.

## Package documentation

> **Rule catalog ID:** R023

## Further reading

- [TypeScript handbook — `sourceMap`](https://www.typescriptlang.org/tsconfig#sourceMap)
- [TypeScript handbook — `inlineSourceMap`](https://www.typescriptlang.org/tsconfig#inlineSourceMap)
