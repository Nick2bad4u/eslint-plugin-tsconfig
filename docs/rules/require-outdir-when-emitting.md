---
title: require-outdir-when-emitting
description: Require outDir when the project emits JavaScript output.
---

# require-outdir-when-emitting

Require `compilerOptions.outDir` when the project emits JavaScript output,
to prevent compiled files from being written next to source files.

## Targeted pattern scope

The `compilerOptions.outDir`, `compilerOptions.noEmit`, and
`compilerOptions.emitDeclarationOnly` fields in any `tsconfig*.json` file.

## What this rule reports

This rule reports when a `tsconfig.json` is configured to emit JavaScript
(i.e., `noEmit` is absent or `false`, and `emitDeclarationOnly` is absent or
`false`) but `outDir` is not specified.

## Why this rule exists

Without `outDir`, TypeScript writes compiled `.js` files alongside their
corresponding `.ts` source files in the same directory. This leads to:

- Source directories filled with generated JavaScript that should not be
  committed.
- Build tool confusion when both `.ts` and `.js` files exist with the same
  name.
- Incomplete `.gitignore` coverage because outputs are interspersed with
  sources.
- Unexpected behavior when `include` patterns match both the source `.ts` and
  the generated `.js`.

Setting `outDir` to a dedicated output directory such as `./dist` or `./build`
keeps the source tree clean and makes the build output predictable.

## ❌ Incorrect

```json
{
    "compilerOptions": {
        "target": "ES2022",
        "module": "NodeNext"
    }
}
```

Without `outDir` or `noEmit`, TypeScript writes `.js` files next to `.ts`
files.

## ✅ Correct

```json
{
    "compilerOptions": {
        "target": "ES2022",
        "module": "NodeNext",
        "outDir": "./dist"
    }
}
```

Or, for a type-check-only config:

```json
{
    "compilerOptions": {
        "noEmit": true
    }
}
```

## When not to use it

Disable this rule for scripts-only projects where all TypeScript files are
run via `ts-node` or similar tools and no compilation step is needed.

## Package documentation

> **Rule catalog ID:** R022

## Further reading

- [TypeScript handbook — `outDir`](https://www.typescriptlang.org/tsconfig#outDir)
- [TypeScript handbook — `noEmit`](https://www.typescriptlang.org/tsconfig#noEmit)
