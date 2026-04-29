---
title: no-allowjs-without-checkjs
description: Disallow allowJs without checkJs — enabling JS compilation without type-checking it defeats the purpose.
---

# no-allowjs-without-checkjs

Disallow using `allowJs: true` without also enabling `checkJs: true`.

## Targeted pattern scope

The `compilerOptions.allowJs` and `compilerOptions.checkJs` fields in any
`tsconfig*.json` file.

## What this rule reports

This rule reports when `compilerOptions.allowJs` is set to `true` while
`compilerOptions.checkJs` is either absent or explicitly `false`.

## Why this rule exists

`allowJs: true` tells TypeScript to include `.js` (and `.jsx`) files in the
compilation. This is commonly used when incrementally migrating a JavaScript
project to TypeScript.

However, without `checkJs: true`, TypeScript includes those JavaScript files
in output but **does not type-check them**. This means:

- Type errors in `.js` files go unreported.
- Incorrect argument types, undefined properties, and missing returns pass
  silently.
- The TypeScript investment yields no safety benefit for the JavaScript
  portions of the codebase.

The intended pattern for mixed JS/TS projects is:

```json
{
    "compilerOptions": {
        "allowJs": true,
        "checkJs": true
    }
}
```

This ensures all files — both `.ts` and `.js` — are subject to type analysis.

### `jsconfig.json` consideration

In a `jsconfig.json` context (a JavaScript-only project), `allowJs: true` is
implied and `checkJs` should always be set. This rule is included in the
`jsconfig` preset for that reason.

## ❌ Incorrect

```json
{
    "compilerOptions": {
        "allowJs": true
    }
}
```

JavaScript files are compiled but not type-checked.

```json
{
    "compilerOptions": {
        "allowJs": true,
        "checkJs": false
    }
}
```

Type-checking is explicitly disabled for JavaScript files.

## ✅ Correct

```json
{
    "compilerOptions": {
        "allowJs": true,
        "checkJs": true
    }
}
```

Both compilation and type-checking are enabled for JavaScript files.

```json
{
    "compilerOptions": {}
}
```

Neither option is set — no JavaScript is included, so the rule does not apply.

## When not to use it

Disable this rule when you intentionally include JavaScript files for
compilation (e.g., copying `.js` build helpers into the output directory)
without wanting type errors reported on those files. This is an uncommon but
valid scenario, for example when using TypeScript as a build pipeline for
legacy code.

## Package documentation

> **Rule catalog ID:** R026

## Further reading

- [TypeScript handbook — `allowJs`](https://www.typescriptlang.org/tsconfig#allowJs)
- [TypeScript handbook — `checkJs`](https://www.typescriptlang.org/tsconfig#checkJs)
- [jsconfig.json documentation](https://code.visualstudio.com/docs/languages/jsconfig)
