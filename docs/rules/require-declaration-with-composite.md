---
title: require-declaration-with-composite
description: Require declaration:true when composite is enabled.
---

# require-declaration-with-composite

Require `"declaration": true` whenever `"composite": true` is set in
`compilerOptions`, because composite projects must emit declaration files.

## Targeted pattern scope

The `compilerOptions.composite` and `compilerOptions.declaration` fields in
any `tsconfig*.json` file.

## What this rule reports

This rule reports when `"composite": true` is present but `"declaration": true`
is absent (or explicitly set to `false`).

## Why this rule exists

TypeScript requires `"declaration": true` for composite projects. Without it,
`tsc` will report an error when building the project:

> `Option 'composite' requires option 'declaration' to be enabled.`

This rule surfaces that constraint at lint time, providing faster feedback
before a build is attempted.

Additionally, composite projects exist to allow other projects to reference
them. The declaration files produced by `declaration: true` are the mechanism
by which referencing projects consume the types — without them, the project
reference chain is broken.

The auto-fixer adds `"declaration": true` to `compilerOptions`.

## ❌ Incorrect

```json
{
    "compilerOptions": {
        "composite": true,
        "outDir": "./dist"
    }
}
```

`composite` is set but `declaration` is absent, which TypeScript will reject.

```json
{
    "compilerOptions": {
        "composite": true,
        "declaration": false
    }
}
```

`declaration` is explicitly disabled, which is invalid for composite projects.

## ✅ Correct

```json
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "outDir": "./dist"
    }
}
```

## When not to use it

This combination is always required by TypeScript when `composite` is `true`.
Disabling this rule is not appropriate.

## Package documentation

> **Rule catalog ID:** R016

## Further reading

- [TypeScript handbook — `composite`](https://www.typescriptlang.org/tsconfig#composite)
- [TypeScript handbook — `declaration`](https://www.typescriptlang.org/tsconfig#declaration)
- [TypeScript handbook — Project references](https://www.typescriptlang.org/docs/handbook/project-references.html)
