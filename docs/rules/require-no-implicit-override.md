---
title: require-no-implicit-override
description: Require noImplicitOverride to prevent accidental method overrides.
---

# require-no-implicit-override

Require `"noImplicitOverride": true` in `compilerOptions` to prevent
subclasses from accidentally overriding base-class methods without the
`override` keyword.

## Targeted pattern scope

The `compilerOptions.noImplicitOverride` field in any `tsconfig*.json` file.

## What this rule reports

This rule reports when `noImplicitOverride` is absent or set to `false`.

## Why this rule exists

Without `noImplicitOverride`, a subclass method silently shadows a base-class
method of the same name. This makes it easy to accidentally override a method
when the developer intended to add a new one, or to continue calling a method
as "overriding" after the base class renames it.

With `noImplicitOverride: true`, TypeScript requires the `override` keyword
on any method that shadows a base-class method, and reports an error if
`override` is used on a method that does not exist in the base class.

This creates an explicit contract: all intentional overrides are marked, and
accidental name collisions surface as compiler errors.

The auto-fixer adds `"noImplicitOverride": true` to `compilerOptions`.

## ❌ Incorrect

```json
{
    "compilerOptions": {
        "strict": true
    }
}
```

`noImplicitOverride` is not part of `strict` and must be set explicitly.

## ✅ Correct

```json
{
    "compilerOptions": {
        "strict": true,
        "noImplicitOverride": true
    }
}
```

## When not to use it

Disable this rule for codebases with a large number of class hierarchies that
have not yet adopted the `override` keyword and where the migration effort is
not currently planned.

## Package documentation

> **Rule catalog ID:** R020

## Further reading

- [TypeScript handbook — `noImplicitOverride`](https://www.typescriptlang.org/tsconfig#noImplicitOverride)
- [TypeScript 4.3 release notes — `override`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-3.html#override-and-the---noimplicitoverride-flag)
