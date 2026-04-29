---
title: require-no-property-access-from-index-signature
description: Require noPropertyAccessFromIndexSignature:true to enforce bracket notation for index-signature access.
---

# require-no-property-access-from-index-signature

Require `"noPropertyAccessFromIndexSignature": true` in `compilerOptions` to
enforce bracket notation for properties defined by index signatures,
distinguishing them from explicitly declared properties.

## Targeted pattern scope

The `compilerOptions.noPropertyAccessFromIndexSignature` field in any
`tsconfig*.json` file.

## What this rule reports

This rule reports when `compilerOptions.noPropertyAccessFromIndexSignature` is
absent or explicitly set to `false`.

## Why this rule exists

TypeScript allows two ways to access a property on an object:

- **Dot notation:** `obj.key` — suggests `key` is a known, declared property
- **Bracket notation:** `obj["key"]` — suggests the key may not be declared

When an object type has an index signature, TypeScript normally allows both
notations interchangeably:

```typescript
interface Config {
    strict: boolean; // declared property
    [key: string]: unknown; // index signature
}

declare const cfg: Config;
cfg.strict; // declared — fine
cfg.unknownKey; // index signature — TypeScript allows this without the flag
```

With `noPropertyAccessFromIndexSignature: true`, TypeScript requires bracket
notation for any access that is satisfied by an index signature rather than a
declared property:

```typescript
cfg.strict; // ✅ declared property — dot notation allowed
cfg["unknownKey"]; // ✅ index-signature access — bracket notation required
cfg.unknownKey; // ❌ error — must use bracket notation for index-sig access
```

This distinction has two practical benefits:

1. **Visual clarity:** Dot notation signals "I know this property exists".
   Bracket notation signals "this may or may not exist at runtime".
2. **Interaction with `noUncheckedIndexedAccess`:** When both flags are
   enabled, bracket-notation index accesses produce `T | undefined` rather
   than `T`, making the potential absence of the value explicit.

The auto-fixer adds `"noPropertyAccessFromIndexSignature": true` to
`compilerOptions`.

## ❌ Incorrect

```json
{
    "compilerOptions": {
        "strict": true,
        "noUncheckedIndexedAccess": true
    }
}
```

`noPropertyAccessFromIndexSignature` is absent; dot notation is silently
allowed for index-signature accesses.

```json
{
    "compilerOptions": {
        "noPropertyAccessFromIndexSignature": false
    }
}
```

Explicitly disabled.

## ✅ Correct

```json
{
    "compilerOptions": {
        "strict": true,
        "noUncheckedIndexedAccess": true,
        "noPropertyAccessFromIndexSignature": true
    }
}
```

Index-signature accesses must use bracket notation.

## When not to use it

Disable this rule in projects that access index-signature properties with dot
notation throughout the codebase and where migrating to bracket notation is not
immediately feasible. The rule pairs best with `noUncheckedIndexedAccess: true`
for maximum benefit.

## Package documentation

> **Rule catalog ID:** R035

## Further reading

- [TypeScript handbook — `noPropertyAccessFromIndexSignature`](https://www.typescriptlang.org/tsconfig#noPropertyAccessFromIndexSignature)
- [TypeScript handbook — `noUncheckedIndexedAccess`](https://www.typescriptlang.org/tsconfig#noUncheckedIndexedAccess)
