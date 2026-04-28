---
title: no-legacy-module-resolution
description: Disallow deprecated module resolution strategies.
---

# no-legacy-module-resolution

Disallow deprecated module resolution strategies such as `"classic"` and
`"node"` in favor of modern alternatives.

## Targeted pattern scope

The `compilerOptions.moduleResolution` field in any `tsconfig*.json` file.

## What this rule reports

This rule reports when `moduleResolution` is set to `"classic"` or `"node"`.
Both strategies predate modern Node.js ESM and bundler resolution conventions
and do not correctly model the module resolution semantics of current tooling.

## Why this rule exists

`"classic"` was TypeScript's original resolution algorithm and is no longer
suitable for any real-world project. It does not understand `node_modules`,
`exports` fields in `package.json`, or path aliases.

`"node"` (also written `"node10"`) models the CommonJS resolution algorithm
from Node.js 10 and earlier. It does not understand `exports` field package
conditions, `.js` extension requirements for ESM, or dual CJS/ESM packages.
Projects using this strategy often silently accept extension-less imports that
fail at runtime in modern Node.js or browser environments.

The modern replacements are:

- `"NodeNext"` or `"Node16"` for Node.js projects with ESM or dual CJS/ESM.
- `"Bundler"` for projects processed by a bundler like Vite, esbuild, or
  webpack.

## ❌ Incorrect

```json
{
    "compilerOptions": {
        "moduleResolution": "node"
    }
}
```

```json
{
    "compilerOptions": {
        "moduleResolution": "classic"
    }
}
```

## ✅ Correct

For a Node.js ESM project:

```json
{
    "compilerOptions": {
        "module": "NodeNext",
        "moduleResolution": "NodeNext"
    }
}
```

For a bundled frontend project:

```json
{
    "compilerOptions": {
        "module": "ESNext",
        "moduleResolution": "Bundler"
    }
}
```

## When not to use it

Disable this rule when maintaining a legacy codebase that cannot yet migrate
from `node` resolution, and the migration is tracked as a separate work item.

## Package documentation

> **Rule catalog ID:** R011

## Further reading

- [TypeScript handbook — `moduleResolution`](https://www.typescriptlang.org/tsconfig#moduleResolution)
- [TypeScript 4.7 release notes — ESM resolution](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-7.html)
