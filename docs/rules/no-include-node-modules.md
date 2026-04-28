---
title: no-include-node-modules
description: Disallow include patterns that match node_modules.
---

# no-include-node-modules

Disallow `include` patterns that would match the `node_modules` directory.

## Targeted pattern scope

The `include` array in any `tsconfig*.json` file.

## What this rule reports

This rule reports `include` entries that explicitly target `node_modules`,
such as `"node_modules"`, `"node_modules/**"`, or glob patterns that resolve
to include it.

## Why this rule exists

`node_modules` is excluded by TypeScript by default, and for good reason:
including it forces TypeScript to process thousands of source files from
installed packages — dramatically increasing type-check time — and may
introduce duplicate symbol declarations that conflict with the packages'
own `.d.ts` files.

TypeScript already reads declaration files from `node_modules/@types` and
package `exports` fields without `node_modules` being in `include`. Adding
it explicitly is never the right fix for type resolution problems and almost
always indicates a misconfiguration.

The auto-fixer removes the offending `include` entry.

## ❌ Incorrect

```json
{
    "include": ["src", "node_modules/my-internal-package"]
}
```

TypeScript will process the source files of `my-internal-package` directly,
conflicting with its published type declarations.

## ✅ Correct

```json
{
    "include": ["src"]
}
```

TypeScript resolves types for `node_modules` packages through their
declaration files automatically.

## When not to use it

Disable this rule for monorepo workspaces that use a `file:` or symlinked
package and need to include source files from a sibling workspace package
— though even in that case, using project references with `composite: true`
is the recommended approach.

## Package documentation

> **Rule catalog ID:** R010

## Further reading

- [TypeScript handbook — `include`](https://www.typescriptlang.org/tsconfig#include)
- [TypeScript handbook — `exclude`](https://www.typescriptlang.org/tsconfig#exclude)
