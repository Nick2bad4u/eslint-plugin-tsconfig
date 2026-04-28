---
title: no-skip-lib-check
description: Discourage skipLibCheck because it suppresses real type errors from dependencies.
---

# no-skip-lib-check

Discourage `skipLibCheck: true` because it silences type errors in declaration
files from dependencies, masking real bugs.

## Targeted pattern scope

The `compilerOptions.skipLibCheck` field in any `tsconfig*.json` file.

## What this rule reports

This rule reports when `compilerOptions.skipLibCheck` is set to `true`.

## Why this rule exists

`skipLibCheck: true` tells TypeScript to skip type-checking of all `.d.ts`
files. While this can speed up compilation and unblock projects with broken
third-party type definitions, it has a high cost: any type error in a
dependency's declaration file — including errors that would affect your own
code — is silently ignored.

Common consequences include:

- A dependency ships a broken overload. Without `skipLibCheck` TypeScript
  would report it at the call site; with `skipLibCheck` the call compiles but
  fails at runtime.
- A package's `.d.ts` uses a type that conflicts with a sibling dependency.
  `skipLibCheck` hides the conflict, leaving it to surface as a runtime
  exception.

The recommended alternative is to update the dependency, override the type
with a local declaration, or use `skipDefaultLibCheck` to skip only the
TypeScript built-in libraries if that is the specific pain point.

## ❌ Incorrect

```json
{
    "compilerOptions": {
        "skipLibCheck": true
    }
}
```

## ✅ Correct

Remove the option entirely or set it to `false`:

```json
{
    "compilerOptions": {
        "strict": true
    }
}
```

If only the built-in TypeScript lib files are causing issues:

```json
{
    "compilerOptions": {
        "skipDefaultLibCheck": true
    }
}
```

## When not to use it

Disable this rule when a third-party dependency ships incompatible declaration
files that cannot be patched or overridden, and the only way to unblock the
project in the short term is `skipLibCheck: true`. Track the root cause as a
separate issue.

## Package documentation

> **Rule catalog ID:** R013

## Further reading

- [TypeScript handbook — `skipLibCheck`](https://www.typescriptlang.org/tsconfig#skipLibCheck)
- [TypeScript handbook — `skipDefaultLibCheck`](https://www.typescriptlang.org/tsconfig#skipDefaultLibCheck)
