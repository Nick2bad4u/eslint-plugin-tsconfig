---
title: require-declaration-map
description: Require declarationMap:true alongside explicit declaration:true so editors can navigate from .d.ts files back to TypeScript source.
---

# require-declaration-map

Require `"declarationMap": true` in `compilerOptions` when `"declaration": true`
is explicitly present.

## Targeted pattern scope

The `compilerOptions.declaration` and `compilerOptions.declarationMap` fields in
any `tsconfig*.json` file.

## What this rule reports

This rule reports when `compilerOptions.declaration` is explicitly `true` but
`compilerOptions.declarationMap` is absent or set to `false`.

## Why this rule exists

When a TypeScript library emits declaration files, editors and other tools use
those `.d.ts` files for type information. Without a declaration map, "go to
definition" jumps to generated `.d.ts` output instead of the original TypeScript
source.

With `declarationMap: true`, TypeScript emits a `.d.ts.map` file alongside each
`.d.ts` file so tools can navigate back to the original source.

The auto-fixer adds `"declarationMap": true` to `compilerOptions`.

## ❌ Incorrect

```json
{
    "compilerOptions": {
        "declaration": true,
        "outDir": "./dist"
    }
}
```

```json
{
    "compilerOptions": {
        "declaration": true,
        "declarationMap": false,
        "outDir": "./dist"
    }
}
```

## ✅ Correct

```json
{
    "compilerOptions": {
        "declaration": true,
        "declarationMap": true,
        "outDir": "./dist"
    }
}
```

## Behavior and migration notes

- `declarationMap: true` only takes effect when `declaration: true` is also
  set. When `declaration` is absent or `false`, this rule does not report.
- The generated `.d.ts.map` files must be published alongside `.d.ts` files for
  consuming projects to benefit. Add the `*.d.ts.map` glob to the `files` or
  `exports` entries in `package.json`.
- This rule currently checks only the explicit `declaration: true` setting in
  the same config.

## When not to use it

Disable this rule for configs that intentionally omit declaration maps — for
example, internal monorepo packages where source is always available locally, or
build configs that skip declaration output entirely.

## Package documentation

> **Rule catalog ID:** R037

## Further reading

- [TypeScript handbook — `declarationMap`](https://www.typescriptlang.org/tsconfig#declarationMap)
- [TypeScript handbook — `declaration`](https://www.typescriptlang.org/tsconfig#declaration)
