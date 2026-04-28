---
title: no-esmoduleinterop-with-verbatim
description: Disallow esModuleInterop when verbatimModuleSyntax is enabled.
---

# no-esmoduleinterop-with-verbatim

Disallow `esModuleInterop: true` when `verbatimModuleSyntax: true` is already
configured, because `verbatimModuleSyntax` supersedes and conflicts with the
interop shim model.

## Targeted pattern scope

The `compilerOptions.esModuleInterop` and `compilerOptions.verbatimModuleSyntax`
fields in any `tsconfig*.json` file.

## What this rule reports

This rule reports when both `"esModuleInterop": true` and
`"verbatimModuleSyntax": true` appear together in `compilerOptions`.

## Why this rule exists

`esModuleInterop` was introduced to allow writing `import React from "react"`
instead of `import * as React from "react"` for CJS modules. It works by
injecting interop helper functions at emit time.

`verbatimModuleSyntax` takes a stricter approach: every import and export is
emitted exactly as written, with no interop shims. The two options represent
fundamentally different mental models of how modules behave. Using both
together produces undefined behavior for default imports of CJS modules —
`verbatimModuleSyntax` wins and the `esModuleInterop` shims are not inserted,
potentially causing silent runtime failures if the code relied on synthetic
default imports.

Remove `esModuleInterop` when `verbatimModuleSyntax` is active, and update
any default imports of CJS modules to namespace-style imports.

## ❌ Incorrect

```json
{
    "compilerOptions": {
        "esModuleInterop": true,
        "verbatimModuleSyntax": true
    }
}
```

The `esModuleInterop` shims will not be inserted because `verbatimModuleSyntax`
takes precedence, making the option a dead setting that misleads readers.

## ✅ Correct

Use `verbatimModuleSyntax` alone for ESM-first codebases:

```json
{
    "compilerOptions": {
        "verbatimModuleSyntax": true
    }
}
```

Or use `esModuleInterop` alone for CJS-interop codebases:

```json
{
    "compilerOptions": {
        "esModuleInterop": true
    }
}
```

## When not to use it

This rule should always be enabled. There is no well-defined scenario where
both flags should be active simultaneously.

## Package documentation

> **Rule catalog ID:** R007

## Further reading

- [TypeScript handbook — `esModuleInterop`](https://www.typescriptlang.org/tsconfig#esModuleInterop)
- [TypeScript handbook — `verbatimModuleSyntax`](https://www.typescriptlang.org/tsconfig#verbatimModuleSyntax)
