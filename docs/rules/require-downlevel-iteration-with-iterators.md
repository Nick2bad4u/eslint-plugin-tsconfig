---
title: require-downlevel-iteration-with-iterators
description: Require downlevelIteration when using ES2015+ iterators with an ES5 target.
---

# require-downlevel-iteration-with-iterators

Require `"downlevelIteration": true` when `target` is below `"ES2015"` and
the configured `lib` entries imply iterator protocol support.

## Targeted pattern scope

The `compilerOptions.target`, `compilerOptions.downlevelIteration`, and
`compilerOptions.lib` fields in any `tsconfig*.json` file.

## What this rule reports

This rule reports when `compilerOptions.target` is set to `"ES5"` or `"ES3"`,
`"downlevelIteration"` is absent or `false`, and `lib` includes one of the
iterator-related entries the rule recognizes:

- `"ES2015.Iterable"`
- `"Symbol.Iterator"`
- `"ES2018.AsyncIterable"`
- `"ESNext.AsyncIterable"`

Without `downlevelIteration`, TypeScript emits simplified for-of loop
transforms that do not correctly handle all iterable types — they work for
arrays but silently break for Maps, Sets, generators, and custom iterables.

## Why this rule exists

When TypeScript compiles iterator-using code (spread, destructuring, for-of,
yield\*, Symbol.iterator) for ES5, it must choose between:

1. A fast but incorrect transform that only works for arrays.
2. A correct transform (using `downlevelIteration`) that generates helper code
   conforming to the iterator protocol.

Without `downlevelIteration: true`, TypeScript picks option 1. Code that
iterates a `Set`, `Map`, or generator will compile without error but produce
wrong results at runtime on ES5 environments.

Setting `downlevelIteration: true` makes the compiler emit the correct, spec-
compliant iteration helpers.

The auto-fixer adds `"downlevelIteration": true` to `compilerOptions`.

## ❌ Incorrect

```json
{
    "compilerOptions": {
        "target": "ES5",
        "lib": ["ES2015.Iterable", "DOM"]
    }
}
```

Using iterator-enabled libs with an ES5 target without `downlevelIteration`
will silently break non-array iteration at runtime.

## ✅ Correct

```json
{
    "compilerOptions": {
        "target": "ES5",
        "lib": ["ES2015.Iterable", "DOM"],
        "downlevelIteration": true
    }
}
```

Or, if ES5 is no longer required, raise the target:

```json
{
    "compilerOptions": {
        "target": "ES2017",
        "lib": ["ES2018.AsyncIterable", "DOM"]
    }
}
```

## When not to use it

Disable this rule when the project guarantees it never iterates non-array
iterables and the bundle size increase from `downlevelIteration` helpers is
unacceptable.

## Package documentation

> **Rule catalog ID:** R017

## Further reading

- [TypeScript handbook — `downlevelIteration`](https://www.typescriptlang.org/tsconfig#downlevelIteration)
- [TypeScript handbook — `target`](https://www.typescriptlang.org/tsconfig#target)
