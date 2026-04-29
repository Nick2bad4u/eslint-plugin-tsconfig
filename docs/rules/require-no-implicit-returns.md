---
title: require-no-implicit-returns
description: Require noImplicitReturns:true to catch functions that silently return undefined on some code paths.
---

# require-no-implicit-returns

Require `"noImplicitReturns": true` in `compilerOptions` so that TypeScript
reports an error when a function does not explicitly return a value on all
code paths.

## Targeted pattern scope

The `compilerOptions.noImplicitReturns` field in any `tsconfig*.json` file.

## What this rule reports

This rule reports when `compilerOptions.noImplicitReturns` is absent or
explicitly set to `false`.

## Why this rule exists

When a function is declared with a non-`void` return type but some of its
code paths reach the end without returning a value, JavaScript silently
returns `undefined` from that branch:

```typescript
function getLabel(code: number): string {
    if (code === 1) {
        return "success";
    }
    // ← no return here — TypeScript would allow this without noImplicitReturns
    // at runtime, callers receive `undefined` instead of a string
}
```

With `noImplicitReturns: true`, TypeScript reports an error on this function,
requiring every code path to explicitly return a value (or be typed as
returning `string | undefined`).

Common scenarios where this catches real bugs:

- Functions with complex `if`/`else` or `switch` chains where a new branch
  is added but the return statement is forgotten.
- Methods in classes where the default return is accidentally `undefined`
  due to an incomplete migration.
- Arrow functions used as callbacks that are expected to always produce a
  value.

The auto-fixer adds `"noImplicitReturns": true` to `compilerOptions`.

## ❌ Incorrect

```json
{
    "compilerOptions": {
        "target": "ES2022",
        "module": "NodeNext"
    }
}
```

`noImplicitReturns` is absent; functions that silently return `undefined`
on some paths are not reported.

```json
{
    "compilerOptions": {
        "noImplicitReturns": false
    }
}
```

Explicitly disabled.

## ✅ Correct

```json
{
    "compilerOptions": {
        "noImplicitReturns": true
    }
}
```

All code paths in non-`void` functions must explicitly return a value.

## When not to use it

Disable this rule in projects that deliberately use implicit `undefined`
returns as a shorthand for early-exit patterns, or when migrating a large
JavaScript codebase where fixing every implicit return at once is not
feasible. In those cases, track the suppressions and enable the rule
incrementally.

## Package documentation

> **Rule catalog ID:** R033

## Further reading

- [TypeScript handbook — `noImplicitReturns`](https://www.typescriptlang.org/tsconfig#noImplicitReturns)
