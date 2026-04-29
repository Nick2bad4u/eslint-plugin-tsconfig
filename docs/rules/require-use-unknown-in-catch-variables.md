---
title: require-use-unknown-in-catch-variables
description: Require useUnknownInCatchVariables:true so catch-clause variables are typed as unknown instead of any.
---

# require-use-unknown-in-catch-variables

Require `"useUnknownInCatchVariables": true` in `compilerOptions` so that
`catch`-clause variables are typed as `unknown` rather than implicitly `any`.

## Targeted pattern scope

The `compilerOptions.useUnknownInCatchVariables` field in any `tsconfig*.json`
file.

## What this rule reports

This rule reports when `compilerOptions.useUnknownInCatchVariables` is absent
or explicitly set to `false`.

## Why this rule exists

Before TypeScript 4.4, the implicit type of a `catch`-clause variable was
always `any`:

```typescript
try {
    doSomething();
} catch (error) {
    // error: any — you can call anything on it without TypeScript objecting
    console.log(error.message); // no type error, but may be undefined
}
```

`useUnknownInCatchVariables: true` (introduced in TypeScript 4.4 and included
in `strict: true` since then) changes the type of `error` to `unknown`,
forcing you to narrow it before use:

```typescript
try {
    doSomething();
} catch (error) {
    // error: unknown — must narrow before use
    if (error instanceof Error) {
        console.log(error.message); // safe
    }
}
```

This prevents accidental property access on values that may not be `Error`
instances at all — for example, `throw "string"` or `throw 42` are both valid
in JavaScript.

Note: `useUnknownInCatchVariables` is already implied when `strict: true` is
set. This rule is useful when you want to enforce the flag explicitly, or when
`strict` is not set.

The auto-fixer adds `"useUnknownInCatchVariables": true` to `compilerOptions`.

## ❌ Incorrect

```json
{
    "compilerOptions": {
        "target": "ES2022",
        "module": "NodeNext",
        "strict": false
    }
}
```

`strict` is disabled so `useUnknownInCatchVariables` is also disabled.

```json
{
    "compilerOptions": {
        "useUnknownInCatchVariables": false
    }
}
```

Explicitly opting out of unknown-typed catch variables.

## ✅ Correct

```json
{
    "compilerOptions": {
        "strict": true
    }
}
```

`strict: true` implies `useUnknownInCatchVariables: true`.

```json
{
    "compilerOptions": {
        "useUnknownInCatchVariables": true
    }
}
```

Explicitly enabled.

## When not to use it

Disable this rule in projects that intentionally throw non-`Error` values and
have existing catch clauses that rely on `any` typing. Migrating those clauses
to narrow against `unknown` is the correct long-term fix, but can be a large
one-time refactor.

## Package documentation

> **Rule catalog ID:** R030

## Further reading

- [TypeScript 4.4 release — `useUnknownInCatchVariables`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-4.html#defaulting-to-the-unknown-type-in-catch-variables)
- [TypeScript handbook — `useUnknownInCatchVariables`](https://www.typescriptlang.org/tsconfig#useUnknownInCatchVariables)
- [TypeScript handbook — `strict`](https://www.typescriptlang.org/tsconfig#strict)
