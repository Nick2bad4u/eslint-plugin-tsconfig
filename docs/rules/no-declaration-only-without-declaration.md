---
title: no-declaration-only-without-declaration
description: Disallow emitDeclarationOnly without declaration when it would be a no-op.
---

# no-declaration-only-without-declaration

Disallow `emitDeclarationOnly: true` without `declaration: true`, because
declaration emit requires both options to be active.

## Targeted pattern scope

The `compilerOptions.emitDeclarationOnly` and `compilerOptions.declaration`
fields in any `tsconfig*.json` file.

## What this rule reports

This rule reports when `"emitDeclarationOnly": true` is set but
`"declaration": true` is absent or explicitly set to `false`.

## Why this rule exists

`emitDeclarationOnly` is a modifier for the `declaration` option — it tells
TypeScript to emit only `.d.ts` files without the corresponding JavaScript.
Without `declaration: true`, TypeScript ignores `emitDeclarationOnly` entirely
and emits no files at all. This means the option has no effect, making it dead
configuration that silently misleads future maintainers.

The auto-fixer adds `"declaration": true` alongside the existing
`emitDeclarationOnly` entry.

## ❌ Incorrect

```json
{
    "compilerOptions": {
        "emitDeclarationOnly": true
    }
}
```

No `.d.ts` files will be emitted because `declaration` is implicitly `false`.

## ✅ Correct

```json
{
    "compilerOptions": {
        "declaration": true,
        "emitDeclarationOnly": true
    }
}
```

If the project should emit both JavaScript and declarations, omit
`emitDeclarationOnly`:

```json
{
    "compilerOptions": {
        "declaration": true
    }
}
```

## When not to use it

This rule should always be enabled. There is no valid use case for
`emitDeclarationOnly: true` without `declaration: true`.

## Package documentation

> **Rule catalog ID:** R004

## Further reading

- [TypeScript handbook — `emitDeclarationOnly`](https://www.typescriptlang.org/tsconfig#emitDeclarationOnly)
- [TypeScript handbook — `declaration`](https://www.typescriptlang.org/tsconfig#declaration)
