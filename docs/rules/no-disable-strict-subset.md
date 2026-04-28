---
title: no-disable-strict-subset
description: Disallow explicitly disabling individual strict-mode flags when strict is enabled.
---

# no-disable-strict-subset

Disallow explicitly setting individual strict-mode flags to `false` when
`strict: true` is already enabled in `compilerOptions`.

## Targeted pattern scope

The `compilerOptions.strict` field and the individual strict-mode sub-flags
(`strictNullChecks`, `strictFunctionTypes`, `strictBindCallApply`,
`strictPropertyInitialization`, `noImplicitAny`, `noImplicitThis`,
`alwaysStrict`, `useUnknownInCatchVariables`) in any `tsconfig*.json` file.

## What this rule reports

This rule reports when `"strict": true` is present alongside any individual
strict-mode sub-flag explicitly set to `false`. The combination is
misleading: the intent of `strict: true` is to enable all current and
future strict checks, but the explicit `false` overrides silently erode that
guarantee.

## Why this rule exists

`strict: true` is a composite flag that bundles all strict checks into one
declaration. When individual sub-flags are turned off the configuration
becomes a maintenance hazard: a reader must mentally subtract each disabled
flag from the composite, and new strict sub-flags added by TypeScript in
future versions may be inadvertently disabled too.

If a specific check is legitimately too strict for a codebase, the correct
approach is to disable the entire `strict` flag and explicitly list only the
individual checks that should be active, making the intended strictness level
unambiguous.

## ❌ Incorrect

```json
{
    "compilerOptions": {
        "strict": true,
        "strictNullChecks": false
    }
}
```

The `strict: true` intention is undermined by the `strictNullChecks: false`
override.

## ✅ Correct

Enable everything via `strict`:

```json
{
    "compilerOptions": {
        "strict": true
    }
}
```

Or, if `strictNullChecks` is genuinely unsuitable, disable `strict` and
enumerate exactly what should be enabled:

```json
{
    "compilerOptions": {
        "noImplicitAny": true,
        "strictFunctionTypes": true,
        "strictBindCallApply": true
    }
}
```

## When not to use it

Disable this rule during a gradual strictness migration where `strict: true`
has been added as a future target but some checks must temporarily remain
disabled to unblock a release.

## Package documentation

> **Rule catalog ID:** R005

## Further reading

- [TypeScript handbook — `strict`](https://www.typescriptlang.org/tsconfig#strict)
- [TypeScript handbook — Strict mode family](https://www.typescriptlang.org/tsconfig#strictNullChecks)
