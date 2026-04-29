---
title: require-declaration-map
description: Require declarationMap:true alongside declaration:true so editors can navigate from .d.ts files back to TypeScript source.
---

# require-declaration-map

Require `"declarationMap": true` in `compilerOptions` when `"declaration": true`
is present.

## Targeted pattern scope

The `compilerOptions.declaration` and `compilerOptions.declarationMap` fields in
any `tsconfig*.json` file.

## What this rule reports

This rule reports when `compilerOptions.declaration` is `true` (or is implied by
`composite: true`) but `compilerOptions.declarationMap` is absent or set to
`false`.

## Why this rule exists

When a TypeScript library emits declaration files (`declaration: true`), editors
and other tools use those `.d.ts` files for type information. Without a
declaration map, "go to definition" in VS Code and other editors jumps to the
emitted `.d.ts` file — the generated output — rather than the original
TypeScript source. This makes it harder to understand the implementation and
contribute to the library.

With `declarationMap: true`, TypeScript emits a `.d.ts.map` file alongside each
`.d.ts` file. This map lets tools translate a position in the declaration file
back to the corresponding position in the original TypeScript source file.
"Go to definition" then navigates directly to the `.ts` source, preserving the
full developer experience for consumers who have access to the source.

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

`declaration: true` emits `.d.ts` files but no `.d.ts.map` files, so editors
cannot navigate back to the original source.

```json
{
    "compilerOptions": {
        "declaration": true,
        "declarationMap": false,
        "outDir": "./dist"
    }
}
```

`declarationMap` is explicitly disabled.

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

Both `.d.ts` and `.d.ts.map` files are emitted, allowing editors to navigate to
the original TypeScript source.

## Behavior and migration notes

- `declarationMap: true` only takes effect when `declaration: true` (or
  `composite: true`) is also set. When `declaration` is absent or `false`,
  this rule does not report.
- The generated `.d.ts.map` files must be published alongside `.d.ts` files for
  consuming projects to benefit. Add the `*.d.ts.map` glob to the `files` or
  `exports` entries in `package.json`.
- If `composite: true` is set, `declaration: true` is implied, and this rule
  still applies.

## When not to use it

Disable this rule for configs that intentionally omit declaration maps — for
example, internal monorepo packages where source is always available locally, or
build configs that skip declaration output entirely.

## Package documentation

> **Rule catalog ID:** R037

## Further reading

- [TypeScript handbook — `declarationMap`](https://www.typescriptlang.org/tsconfig#declarationMap)
- [TypeScript handbook — `declaration`](https://www.typescriptlang.org/tsconfig#declaration)
