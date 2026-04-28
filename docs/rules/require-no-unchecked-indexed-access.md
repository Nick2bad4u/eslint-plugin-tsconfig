---
title: require-no-unchecked-indexed-access
description: Require noUncheckedIndexedAccess for safer array and index-signature access.
---

# require-no-unchecked-indexed-access

Require `"noUncheckedIndexedAccess": true` in `compilerOptions` to include
`undefined` in the type of array index access and index-signature reads.

## Targeted pattern scope

The `compilerOptions.noUncheckedIndexedAccess` field in any `tsconfig*.json`
file.

## What this rule reports

This rule reports when `noUncheckedIndexedAccess` is absent or set to `false`.

## Why this rule exists

Without `noUncheckedIndexedAccess`, accessing an array element by index (e.g.,
`arr[0]`) returns the element type `T` even though the array might be empty.
TypeScript assumes the access is in-bounds and produces no warning, so code
like:

```typescript
const first = items[0].name; // No error even if items is empty
```

compiles without complaint but throws `TypeError: Cannot read properties of
undefined` at runtime.

Enabling `noUncheckedIndexedAccess` changes the return type of indexed access
to `T | undefined`, forcing developers to check for `undefined` before using
the value — the same pattern required for `Map.get()` and `Record` access.

The auto-fixer adds `"noUncheckedIndexedAccess": true` to `compilerOptions`.

## ❌ Incorrect

```json
{
    "compilerOptions": {
        "strict": true
    }
}
```

`noUncheckedIndexedAccess` is not part of `strict` and must be set explicitly.

## ✅ Correct

```json
{
    "compilerOptions": {
        "strict": true,
        "noUncheckedIndexedAccess": true
    }
}
```

## When not to use it

Disable this rule for codebases that rely heavily on index access where the
in-bounds guarantee is established by surrounding logic, and the additional
`undefined` checks would add noise without catching real bugs.

## Package documentation

> **Rule catalog ID:** R021

## Further reading

- [TypeScript handbook — `noUncheckedIndexedAccess`](https://www.typescriptlang.org/tsconfig#noUncheckedIndexedAccess)
- [TypeScript 4.1 release notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#checked-indexed-accesses---nouncheckedindexedaccess)
