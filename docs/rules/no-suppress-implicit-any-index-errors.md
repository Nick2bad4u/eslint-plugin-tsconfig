---
title: no-suppress-implicit-any-index-errors
description: Disallow suppressImplicitAnyIndexErrors:true, which silences noImplicitAny errors for index-signature access.
---

# no-suppress-implicit-any-index-errors

Disallow `"suppressImplicitAnyIndexErrors": true` in `compilerOptions`.

## Targeted pattern scope

The `compilerOptions.suppressImplicitAnyIndexErrors` field in any
`tsconfig*.json` file.

## What this rule reports

This rule reports when `compilerOptions.suppressImplicitAnyIndexErrors` is
explicitly set to `true`.

## Why this rule exists

TypeScript's `noImplicitAny` flag (included in `strict: true`) requires all
values to have an explicit type so that accidental `any` values cannot silently
propagate through the codebase. `suppressImplicitAnyIndexErrors: true` carves
out an exception to this: it suppresses the implicit-`any` error that would
normally appear when you index an object with a string key that has no matching
index signature.

Consider this pattern:

```typescript
const config: Record<string, unknown> = {};
const value = config["timeout"]; // type is `unknown` — safe
```

```typescript
const options = { retries: 3 };
const value = options["timeout"]; // type is `any` when suppressImplicitAnyIndexErrors is true
```

With the option disabled (the default), the second example is a type error,
and the developer is forced to add an index signature or use a safer access
pattern. With `suppressImplicitAnyIndexErrors: true`, the error is silently
suppressed and `value` becomes `any`, bypassing strict-mode guarantees.

This option was historically used as a migration escape hatch. In modern
TypeScript projects, it should not be present in a finished configuration
because it creates a silent hole in `noImplicitAny` coverage.

## ❌ Incorrect

```json
{
    "compilerOptions": {
        "strict": true,
        "suppressImplicitAnyIndexErrors": true
    }
}
```

`suppressImplicitAnyIndexErrors` silences implicit-`any` errors for index
access, undermining `noImplicitAny`.

## ✅ Correct

```json
{
    "compilerOptions": {
        "strict": true
    }
}
```

Without `suppressImplicitAnyIndexErrors`, TypeScript enforces `noImplicitAny`
consistently for all index-signature accesses.

## Behavior and migration notes

When removing `suppressImplicitAnyIndexErrors: true` from an existing config,
TypeScript may report new type errors in files that relied on the suppression.
The typical fixes are:

- Add an explicit index signature to the type (e.g.,
  `Record<string, unknown>`).
- Use optional chaining or a type assertion with an explicit type.
- Prefer `noUncheckedIndexedAccess: true` together with typed index signatures
  for the strongest guarantees.

## When not to use it

Disable this rule only during a large-scale migration from a loosely typed
codebase where fixing all implicit-`any` index-access errors is not immediately
feasible.

## Package documentation

> **Rule catalog ID:** R036

## Further reading

- [TypeScript handbook — `suppressImplicitAnyIndexErrors`](https://www.typescriptlang.org/tsconfig#suppressImplicitAnyIndexErrors)
- [TypeScript handbook — `noImplicitAny`](https://www.typescriptlang.org/tsconfig#noImplicitAny)
- [TypeScript handbook — `noUncheckedIndexedAccess`](https://www.typescriptlang.org/tsconfig#noUncheckedIndexedAccess)
