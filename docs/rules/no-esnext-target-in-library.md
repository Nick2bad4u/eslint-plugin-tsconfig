---
title: no-esnext-target-in-library
description: Disallow ESNext as the target in library tsconfig files.
---

# no-esnext-target-in-library

Disallow `"target": "ESNext"` in library `tsconfig.json` files because
`ESNext` is a moving target that changes meaning across TypeScript releases.

## Targeted pattern scope

The `compilerOptions.target` field in any `tsconfig*.json` file where the
project is identified as a reusable library (i.e., `declaration: true` or
`emitDeclarationOnly: true` is present).

## What this rule reports

This rule reports when `compilerOptions.target` is set to `"ESNext"` in a
tsconfig that also emits declaration files, indicating a library build.

## Why this rule exists

`"ESNext"` does not refer to a fixed ECMAScript version — it always means "the
latest features available in the current version of TypeScript". When a library
is built with `"target": "ESNext"`, the emitted JavaScript syntax may change
with every TypeScript upgrade, potentially breaking consumers on older runtimes
without any change to the library source.

Pinning to a concrete target version like `"ES2022"` makes the library output
stable across TypeScript upgrades and gives consumers a clear minimum runtime
requirement.

## ❌ Incorrect

```json
{
    "compilerOptions": {
        "declaration": true,
        "target": "ESNext"
    }
}
```

Library consumers may receive incompatible syntax after a routine TypeScript
upgrade.

## ✅ Correct

```json
{
    "compilerOptions": {
        "declaration": true,
        "target": "ES2022"
    }
}
```

Choose the minimum ECMAScript version required by the library's actual feature
usage, giving consumers a stable and predictable output.

## When not to use it

Disable this rule for internal applications (not published as library packages)
or for experimental/bleeding-edge projects that explicitly target the latest
runtime and accept the instability of `ESNext`.

## Package documentation

> **Rule catalog ID:** R008

## Further reading

- [TypeScript handbook — `target`](https://www.typescriptlang.org/tsconfig#target)
- [Semantic versioning for TypeScript types](https://www.semver-ts.org/)
