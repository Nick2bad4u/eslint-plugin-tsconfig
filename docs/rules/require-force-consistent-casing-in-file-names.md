---
title: require-force-consistent-casing-in-file-names
description: Require forceConsistentCasingInFileNames:true to prevent cross-platform import resolution failures.
---

# require-force-consistent-casing-in-file-names

Require `"forceConsistentCasingInFileNames": true` in `compilerOptions` to
prevent import-path casing mismatches that silently break on case-sensitive
file systems.

## Targeted pattern scope

The `compilerOptions.forceConsistentCasingInFileNames` field in any
`tsconfig*.json` file.

## What this rule reports

This rule reports when `compilerOptions.forceConsistentCasingInFileNames` is
absent or explicitly set to `false`.

## Why this rule exists

Windows and macOS use **case-insensitive** file systems by default. Linux uses
a **case-sensitive** file system. This difference is a frequent source of bugs
that are invisible in local development but break in CI or production.

Consider this scenario:

```text
project/
  src/
    Utils.ts       ← file is named with capital U
    index.ts       ← imports with lowercase u
```

```typescript
// index.ts — works on Windows/macOS, fails on Linux
import { helper } from "./utils"; // case mismatch: Utils vs utils
```

On Windows and macOS the import resolves successfully because the file system
ignores casing. On Linux the import fails with `Cannot find module './utils'`,
producing a build or runtime error only in CI or deployment.

`forceConsistentCasingInFileNames: true` makes TypeScript report an **error**
when an import path uses different casing than the actual file name — even on
case-insensitive systems — catching the mismatch before it reaches a
case-sensitive environment.

The auto-fixer adds `"forceConsistentCasingInFileNames": true` to
`compilerOptions`.

## ❌ Incorrect

```json
{
    "compilerOptions": {
        "target": "ES2022",
        "module": "NodeNext"
    }
}
```

`forceConsistentCasingInFileNames` is absent; casing mismatches will not be
reported and may silently break on Linux CI.

```json
{
    "compilerOptions": {
        "forceConsistentCasingInFileNames": false
    }
}
```

Explicitly disabled — cross-platform import casing errors are suppressed.

## ✅ Correct

```json
{
    "compilerOptions": {
        "target": "ES2022",
        "module": "NodeNext",
        "forceConsistentCasingInFileNames": true
    }
}
```

Casing mismatches in import paths are reported.

## When not to use it

Disable this rule only in projects that are guaranteed to run exclusively on
case-insensitive file systems and have no CI pipeline or deployment environment
running on Linux. This scenario is rare and shrinking as cloud-native
development becomes the norm.

## Package documentation

> **Rule catalog ID:** R028

## Further reading

- [TypeScript handbook — `forceConsistentCasingInFileNames`](https://www.typescriptlang.org/tsconfig#forceConsistentCasingInFileNames)
- [TypeScript issue — case-sensitivity](https://github.com/microsoft/TypeScript/issues/7444)
