---
title: require-exact-optional-property-types
description: Require exactOptionalPropertyTypes for precise optional-property semantics.
---

# require-exact-optional-property-types

Require `"exactOptionalPropertyTypes": true` in `compilerOptions` to enforce
that optional properties cannot be explicitly set to `undefined` unless
`undefined` is part of the property's declared type.

## Targeted pattern scope

The `compilerOptions.exactOptionalPropertyTypes` field in any `tsconfig*.json`
file.

## What this rule reports

This rule reports when `compilerOptions` is present and `exactOptionalPropertyTypes` is absent or set to `false`. The rule does not report if `compilerOptions` is not defined at all.

## Why this rule exists

Without `exactOptionalPropertyTypes`, TypeScript treats `{ prop?: string }`
as equivalent to `{ prop?: string | undefined }`. This means code like
`obj.prop = undefined` compiles successfully even though the intent of the
optional marker was "the property may be absent", not "the property may be
present with value `undefined`".

These are two meaningfully different states:

- `Object.hasOwn(obj, "prop")` returns `false` when the property is absent.
- `Object.hasOwn(obj, "prop")` returns `true` when `prop` is present with
  value `undefined`.

Enabling `exactOptionalPropertyTypes` forces TypeScript to distinguish between
these states, catching a class of bugs where code assumes a property is absent
but it is present with an `undefined` value, or vice versa.

The auto-fixer adds `"exactOptionalPropertyTypes": true` to `compilerOptions`.

## ❌ Incorrect

```json
{
    "compilerOptions": {
        "strict": true
    }
}
```

`exactOptionalPropertyTypes` is not enabled by `strict` and must be set
explicitly.

## ✅ Correct

```json
{
    "compilerOptions": {
        "strict": true,
        "exactOptionalPropertyTypes": true
    }
}
```

## When not to use it

Disable this rule when integrating with third-party libraries that rely on
optional-as-`undefined` assignment patterns and cannot be updated.

## Package documentation

> **Rule catalog ID:** R018

## Further reading

- [TypeScript handbook — `exactOptionalPropertyTypes`](https://www.typescriptlang.org/tsconfig#exactOptionalPropertyTypes)
- [TypeScript 4.4 release notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-4.html#exact-optional-property-types---exactoptionalpropertytypes)
