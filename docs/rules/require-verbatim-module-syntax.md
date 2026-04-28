---
title: require-verbatim-module-syntax
description: Require verbatimModuleSyntax for correct ESM type-import behavior.
---

# require-verbatim-module-syntax

Require `"verbatimModuleSyntax": true` in `compilerOptions` for projects
targeting ESM, to ensure that `import type` and `export type` are used
correctly and that type-only imports are never emitted as value imports.

## Targeted pattern scope

The `compilerOptions.verbatimModuleSyntax` and `compilerOptions.module`
fields in any `tsconfig*.json` file.

## What this rule reports

This rule reports when `module` is set to `"ESNext"`, `"NodeNext"`, or
`"Node16"` and `verbatimModuleSyntax` is absent or set to `false`.

## Why this rule exists

Without `verbatimModuleSyntax`, TypeScript's older `importsNotUsedAsValues` and
`preserveValueImports` flags controlled how type-only imports were handled.
These two flags had confusing interaction semantics and were deprecated in
TypeScript 5.0.

`verbatimModuleSyntax` replaces both with a single, clear rule: every import
and export statement is emitted exactly as written. An import without `type`
is treated as a value import; an import with `type` (or an `import type …`)
is erased at emit time. This means:

- Type-only imports that are not marked `import type` will cause a compile
  error, preventing accidental value imports that resolve to `undefined` at
  runtime.
- Bundlers and runtimes see exactly the imports the developer wrote, with no
  hidden transformations.
- IDE tooling can reliably determine which imports are type-only and apply
  automatic `import type` insertion.

The auto-fixer adds `"verbatimModuleSyntax": true` to `compilerOptions`.

## ❌ Incorrect

```json
{
    "compilerOptions": {
        "module": "NodeNext",
        "moduleResolution": "NodeNext"
    }
}
```

Type-only imports may be emitted as value imports, silently resolving to
`undefined` at runtime.

## ✅ Correct

```json
{
    "compilerOptions": {
        "module": "NodeNext",
        "moduleResolution": "NodeNext",
        "verbatimModuleSyntax": true
    }
}
```

## When not to use it

Disable this rule for CommonJS-only projects (`"module": "CommonJS"`) where
`esModuleInterop` is used instead, or for legacy projects that have not yet
migrated from `importsNotUsedAsValues`.

## Package documentation

> **Rule catalog ID:** R025

## Further reading

- [TypeScript handbook — `verbatimModuleSyntax`](https://www.typescriptlang.org/tsconfig#verbatimModuleSyntax)
- [TypeScript 5.0 release notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html#verbatimmodulesyntax)
