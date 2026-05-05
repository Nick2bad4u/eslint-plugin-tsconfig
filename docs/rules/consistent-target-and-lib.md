---
title: consistent-target-and-lib
description: Disallow lib entries that target a newer ES version than the configured target.
---

# consistent-target-and-lib

Disallow ES-versioned `lib` entries that are newer than the configured
`target`.

## Targeted pattern scope

The `compilerOptions.target` and `compilerOptions.lib` fields in any
`tsconfig*.json` file.

## What this rule reports

This rule reports when an explicit `lib` array contains an ES-versioned entry
that is newer than the configured `target`.

Examples of configurations this rule reports:

- `target: "ES2020"` with `lib: ["ES2022", "DOM"]`
- `target: "ES2018"` with `lib: ["ESNext"]`

If `lib` is omitted entirely, or if `lib` is more conservative than `target`,
this rule does not report.

## Why this rule exists

The `target` option controls the syntax level TypeScript emits. The `lib`
option controls which built-in APIs the type checker assumes are available at
runtime. When `lib` is configured to a newer ES version than `target`, the type
checker can accept APIs that are not a safe match for the configured output
baseline.

This rule prevents that one-way mismatch.

## ❌ Incorrect

```json
{
    "compilerOptions": {
        "target": "ES2020",
        "lib": ["ES2022", "DOM"]
    }
}
```

The type checker accepts `ES2022` APIs even though the configured target is only
`ES2020`.

## ✅ Correct

```json
{
    "compilerOptions": {
        "target": "ES2022",
        "lib": ["ES2022", "DOM"]
    }
}
```

Or use a more conservative `lib`:

```json
{
    "compilerOptions": {
        "target": "ES2022",
        "lib": ["ES2020", "DOM"]
    }
}
```

## When not to use it

Disable this rule if you intentionally model newer runtime APIs than the
configured `target` because the environment guarantees polyfills, or if you do
not want to enforce this one-way compatibility check.

## Package documentation

> **Rule catalog ID:** R003

## Further reading

- [TypeScript handbook — `target`](https://www.typescriptlang.org/tsconfig#target)
- [TypeScript handbook — `lib`](https://www.typescriptlang.org/tsconfig#lib)
