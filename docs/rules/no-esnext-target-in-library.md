---
title: no-esnext-target-in-library
description: Disallow ESNext as the target in tsconfig files.
---

# no-esnext-target-in-library

Disallow `"target": "ESNext"` in `tsconfig*.json` files.

## Targeted pattern scope

The `compilerOptions.target` field in any `tsconfig*.json` file.

## What this rule reports

This rule reports whenever `compilerOptions.target` is set to `"ESNext"`.

## Why this rule exists

`"ESNext"` does not refer to a fixed ECMAScript version — it always means "the
latest features available in the current version of TypeScript". When a project
is built with `"target": "ESNext"`, the emitted JavaScript syntax may change
with every TypeScript upgrade even if the source code does not.

Pinning to a concrete target version like `"ES2022"` makes the output stable
across TypeScript upgrades and gives consumers and runtimes a clearer baseline.

## ❌ Incorrect

```json
{
    "compilerOptions": {
        "target": "ESNext"
    }
}
```

The emitted output target can shift after a routine TypeScript upgrade.

## ✅ Correct

```json
{
    "compilerOptions": {
        "target": "ES2022"
    }
}
```

## When not to use it

Disable this rule for experimental or tightly controlled environments that
intentionally track the latest runtime features and accept the instability of
`ESNext`.

## Package documentation

> **Rule catalog ID:** R008

## Further reading

- [TypeScript handbook — `target`](https://www.typescriptlang.org/tsconfig#target)
- [Semantic versioning for TypeScript types](https://www.semver-ts.org/)
