---
title: consistent-module-resolution
description: Require moduleResolution to be compatible with the chosen module format.
---

# consistent-module-resolution

Require `moduleResolution` to be set to a strategy that is compatible with the
configured `module` output format.

## Targeted pattern scope

The `compilerOptions.module` and `compilerOptions.moduleResolution` fields in
any `tsconfig*.json` file.

## What this rule reports

This rule reports when `moduleResolution` is absent or set to an incompatible
strategy for the configured `module` value. Common mismatches include:

- `module: "CommonJS"` with `moduleResolution: "Bundler"` — bundler resolution
  is not designed for CJS output.
- `module: "ESNext"` or `"Preserve"` with `moduleResolution: "node"` or
  `"node16"` — modern ESM modules should use `Bundler` or `NodeNext`.
- `module: "Node16"` or `"NodeNext"` without `moduleResolution: "node16"` /
  `"nodenext"` — these must match.

## Why this rule exists

TypeScript's `module` option controls the output format while `moduleResolution`
controls how bare specifiers and file extensions are resolved at type-check
time. Using a mismatched combination causes TypeScript to silently accept import
paths that will fail at runtime. For example, writing extension-less imports is
valid under `bundler` resolution but illegal under `node16` strict ESM
resolution rules.

Keeping the two options aligned eliminates a class of "types pass, runtime
fails" bugs.

## ❌ Incorrect

```json
{
    "compilerOptions": {
        "module": "ESNext",
        "moduleResolution": "node"
    }
}
```

`node` resolution does not enforce the `.js` extension requirements that ESM
runtimes need, so TypeScript will silently accept imports that fail at runtime.

## ✅ Correct

```json
{
    "compilerOptions": {
        "module": "ESNext",
        "moduleResolution": "Bundler"
    }
}
```

For a Node.js ESM project:

```json
{
    "compilerOptions": {
        "module": "NodeNext",
        "moduleResolution": "NodeNext"
    }
}
```

## When not to use it

Disable this rule only when you have an unusual module interop scenario (such as
combining two compiler invocations in a single build pipeline) that genuinely
requires a non-standard combination.

## Package documentation

> **Rule catalog ID:** R002

## Further reading

- [TypeScript handbook — `module`](https://www.typescriptlang.org/tsconfig#module)
- [TypeScript handbook — `moduleResolution`](https://www.typescriptlang.org/tsconfig#moduleResolution)
