---
title: consistent-target-and-lib
description: Require lib to be compatible with the configured target.
---

# consistent-target-and-lib

Require `lib` entries to include the standard library corresponding to the
`target` ECMAScript version, avoiding a mismatch between what TypeScript
compiles and what it type-checks against.

## Targeted pattern scope

The `compilerOptions.target` and `compilerOptions.lib` fields in any
`tsconfig*.json` file.

## What this rule reports

This rule reports when an explicit `lib` array is configured but does not
include at least the default lib entry for the configured `target`. For example:

- `target: "ES2022"` but `lib` contains only `"ES2015"` — code compiled to
  ES2022 syntax has access to `Array.prototype.at()` and similar APIs, but the
  type checker will report them as missing.
- `lib` includes newer entries (e.g., `"ESNext"`) but `target` is set to an
  older version — the type checker accepts code that the downlevel output cannot
  execute.

## Why this rule exists

The `target` option tells TypeScript what syntax to emit. The `lib` option
tells TypeScript what global APIs exist at runtime. When these two diverge the
type checker may accept code that fails at runtime (target too old for the lib)
or reject code that would actually run fine (lib too conservative for the
target). Keeping them aligned produces a truthful model of what is available.

## ❌ Incorrect

```json
{
    "compilerOptions": {
        "target": "ES2022",
        "lib": ["ES2015", "DOM"]
    }
}
```

`ES2022` APIs like `Array.prototype.at` and `Object.hasOwn` are available
at runtime but TypeScript will report them as missing because they are not in
the `ES2015` lib.

## ✅ Correct

```json
{
    "compilerOptions": {
        "target": "ES2022",
        "lib": ["ES2022", "DOM"]
    }
}
```

Or omit `lib` entirely and let TypeScript derive it from `target`:

```json
{
    "compilerOptions": {
        "target": "ES2022"
    }
}
```

## When not to use it

Disable this rule in projects that deliberately use a conservative `lib` set
to constrain available APIs (for example, a library supporting legacy
browsers that polyfills specific APIs).

## Package documentation

> **Rule catalog ID:** R003

## Further reading

- [TypeScript handbook — `target`](https://www.typescriptlang.org/tsconfig#target)
- [TypeScript handbook — `lib`](https://www.typescriptlang.org/tsconfig#lib)
