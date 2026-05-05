---
title: require-bundler-module-resolution
description: Require a modern resolution mode for bundler-oriented module settings.
---

# require-bundler-module-resolution

Require a modern `moduleResolution` strategy for bundler-oriented `module`
settings.

## Targeted pattern scope

The `compilerOptions.module` and `compilerOptions.moduleResolution` fields in
any `tsconfig*.json` file.

## What this rule reports

This rule reports when `module` is one of these values and `moduleResolution`
is absent or set to an older legacy mode:

- `"ES2015"`
- `"ES2016"`
- `"ES2017"`
- `"ES2018"`
- `"ES2019"`
- `"ES2020"`
- `"ES2022"`
- `"ESNext"`
- `"Preserve"`

The current implementation accepts `"Bundler"`, `"Node16"`, and `"NodeNext"`
as modern resolution modes. When it auto-fixes, it inserts or replaces with
`"Bundler"`.

## Why this rule exists

Using ESM-like or bundler-oriented module output with legacy resolution modes
like `"node"`, `"node10"`, or `"classic"` causes TypeScript to model imports
using rules that do not match modern bundlers or package `exports` fields.

## ❌ Incorrect

```json
{
    "compilerOptions": {
        "module": "Preserve",
        "moduleResolution": "node"
    }
}
```

`"node"` resolution does not match the modern resolution behavior expected by
bundler-oriented output.

## ✅ Correct

```json
{
    "compilerOptions": {
        "module": "ESNext",
        "moduleResolution": "Bundler"
    }
}
```

These are also treated as acceptable by the current implementation:

```json
{
    "compilerOptions": {
        "module": "ESNext",
        "moduleResolution": "NodeNext"
    }
}
```

## When not to use it

Disable this rule when these module settings are used in a workflow that
intentionally prefers `"Node16"`/`"NodeNext"` semantics or some other
non-bundler resolution strategy.

## Package documentation

> **Rule catalog ID:** R014

## Further reading

- [TypeScript 5.0 — `moduleResolution: "bundler"`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html#resolution-customization-flags)
- [TypeScript handbook — `moduleResolution`](https://www.typescriptlang.org/tsconfig#moduleResolution)
