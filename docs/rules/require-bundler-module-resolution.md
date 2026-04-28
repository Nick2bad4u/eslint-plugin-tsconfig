---
title: require-bundler-module-resolution
description: Require moduleResolution Bundler when module is ESNext and a bundler is in use.
---

# require-bundler-module-resolution

Require `moduleResolution: "Bundler"` when `module` is set to `"ESNext"` and
the project is processed by a bundler, to correctly model how the bundler
resolves imports.

## Targeted pattern scope

The `compilerOptions.module` and `compilerOptions.moduleResolution` fields in
any `tsconfig*.json` file.

## What this rule reports

This rule reports when `"module": "ESNext"` is set without
`"moduleResolution": "Bundler"`. The `ESNext` module format is intended for
bundler-processed code where the bundler (not Node.js) resolves imports, but
older resolution modes like `"node"` or `"node16"` do not model bundler
semantics.

## Why this rule exists

`moduleResolution: "node"` requires that every import of a relative module
path include the file extension (`.js`, `.ts`). Bundlers such as Vite,
esbuild, webpack, and Rollup resolve extension-less imports by trying multiple
extensions automatically — which is exactly what `"Bundler"` resolution
models.

Using `"module": "ESNext"` with `"moduleResolution": "node"` causes TypeScript
to reject valid bundler-resolved imports and accept patterns that would fail
under `"NodeNext"` semantics. The `"Bundler"` option was introduced in
TypeScript 5.0 precisely to fix this mismatch.

The auto-fixer inserts `"moduleResolution": "Bundler"` when it is absent.

## ❌ Incorrect

```json
{
    "compilerOptions": {
        "module": "ESNext",
        "moduleResolution": "node"
    }
}
```

`"node"` resolution does not match the semantics of a bundler.

```json
{
    "compilerOptions": {
        "module": "ESNext"
    }
}
```

Without an explicit `moduleResolution`, TypeScript defaults to `"node"` for
`"ESNext"`, which is incorrect for bundler projects.

## ✅ Correct

```json
{
    "compilerOptions": {
        "module": "ESNext",
        "moduleResolution": "Bundler"
    }
}
```

## When not to use it

Disable this rule when `"module": "ESNext"` is used in a non-bundler context,
such as a Deno project or an experimental native ESM Node.js project that
prefers `"NodeNext"` resolution.

## Package documentation

> **Rule catalog ID:** R014

## Further reading

- [TypeScript 5.0 — `moduleResolution: "bundler"`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html#resolution-customization-flags)
- [TypeScript handbook — `moduleResolution`](https://www.typescriptlang.org/tsconfig#moduleResolution)
