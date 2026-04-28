---
title: require-strict-mode
description: Require strict:true in compilerOptions for full type safety.
---

# require-strict-mode

Require `"strict": true` in `compilerOptions` to enable TypeScript's full
set of type-safety checks.

## Targeted pattern scope

The `compilerOptions.strict` field in any `tsconfig*.json` file.

## What this rule reports

This rule reports when `compilerOptions.strict` is absent or set to `false`.

## Why this rule exists

`strict: true` is a composite flag that enables a suite of checks designed to
catch the most common classes of type-unsafe code:

- `strictNullChecks` — prevents `undefined`/`null` from being assigned to
  non-nullable types.
- `strictFunctionTypes` — enforces contravariant function parameter types.
- `strictBindCallApply` — checks `bind`, `call`, and `apply` argument types.
- `strictPropertyInitialization` — ensures class properties are initialized.
- `noImplicitAny` — disallows implicit `any` on parameters and variables.
- `noImplicitThis` — disallows `this` expressions with an implied `any` type.
- `alwaysStrict` — emits `"use strict"` in output files.
- `useUnknownInCatchVariables` — types `catch` clause variables as `unknown`.

Omitting `strict: true` leaves these checks disabled, allowing entire
categories of runtime errors to compile without warning.

The auto-fixer adds `"strict": true` to `compilerOptions`.

## ❌ Incorrect

```json
{
    "compilerOptions": {
        "target": "ES2022",
        "module": "NodeNext"
    }
}
```

None of the strict checks are active.

```json
{
    "compilerOptions": {
        "strict": false
    }
}
```

Strict mode is explicitly disabled.

## ✅ Correct

```json
{
    "compilerOptions": {
        "target": "ES2022",
        "module": "NodeNext",
        "strict": true
    }
}
```

## When not to use it

Disable this rule for tsconfig files used exclusively to configure type-
checking tools or test runners that operate on already-compiled code, or for
configurations that extend a strict base tsconfig and therefore inherit the
`strict` setting from the parent.

## Package documentation

> **Rule catalog ID:** R024

## Further reading

- [TypeScript handbook — `strict`](https://www.typescriptlang.org/tsconfig#strict)
- [TypeScript handbook — Strict mode options](https://www.typescriptlang.org/tsconfig#strictNullChecks)
