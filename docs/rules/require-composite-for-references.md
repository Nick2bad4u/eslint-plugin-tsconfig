---
title: require-composite-for-references
description: Require composite:true in a tsconfig that defines project references.
---

# require-composite-for-references

Require `"composite": true` in a `tsconfig.json` that defines a `references`
array.

## Targeted pattern scope

The `references` array and `compilerOptions.composite` field in the same
`tsconfig*.json` file.

## What this rule reports

This rule reports when a `tsconfig.json` contains a `references` array but does
not set `"composite": true` in its own `compilerOptions`.

## Why this rule exists

In this plugin's project-reference model, a config that declares `references`
should also opt into composite mode so the config is aligned with the build-mode
workflow expected by TypeScript and the surrounding tooling.

The auto-fixer adds `"composite": true` to the current config's
`compilerOptions`.

## ❌ Incorrect

```json
{
    "references": [
        { "path": "./packages/core" }
    ]
}
```

The config declares references but is not itself marked composite.

## ✅ Correct

```json
{
    "references": [
        { "path": "./packages/core" }
    ],
    "compilerOptions": {
        "composite": true
    }
}
```

## When not to use it

Disable this rule only when `references` is being used in a non-standard
workflow and you do not want this plugin to enforce `composite` on the current
config.

## Package documentation

> **Rule catalog ID:** R015

## Further reading

- [TypeScript handbook — Project references](https://www.typescriptlang.org/docs/handbook/project-references.html)
- [TypeScript handbook — `composite`](https://www.typescriptlang.org/tsconfig#composite)
