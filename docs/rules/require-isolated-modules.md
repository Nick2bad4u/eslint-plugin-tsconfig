---
title: require-isolated-modules
description: Require isolatedModules:true for compatibility with single-file transpilers like Vite, esbuild, and SWC.
---

# require-isolated-modules

Require `"isolatedModules": true` in `compilerOptions` to ensure the project
is compatible with single-file transpilers.

## Targeted pattern scope

The `compilerOptions.isolatedModules` field in any `tsconfig*.json` file.

## What this rule reports

This rule reports when `compilerOptions.isolatedModules` is absent or
explicitly set to `false`.

## Why this rule exists

Modern JavaScript build tools — Vite, esbuild, Parcel, SWC, Babel, and
others — typically transform TypeScript files **one file at a time** without
reading the full project's type information. This is dramatically faster than
the TypeScript compiler's full-project build, but it means these tools cannot
handle TypeScript features that require cross-file type resolution.

The most common culprit is `const enum`:

```typescript
// shared.ts
export const enum Direction {
    Up,
    Down,
}

// consumer.ts
import { Direction } from "./shared";
const d = Direction.Up; // esbuild cannot inline the value — fails at runtime
```

TypeScript itself can inline `const enum` values, but a single-file transpiler
has no visibility into `shared.ts` when processing `consumer.ts`.

Setting `isolatedModules: true` tells TypeScript to report an **error** for
any construct that would be unsafe in isolated-module mode — catching these
incompatibilities at compile time, before they cause silent runtime failures.

Other constructs guarded by `isolatedModules`:

- Ambient (declaration-only) modules — `declare module "…"` without a body
- Non-type-only re-exports of types — `export { SomeType }` must be
  `export type { SomeType }`
- Single-file `declare global` blocks without an import/export

The auto-fixer adds `"isolatedModules": true` to `compilerOptions`.

## ❌ Incorrect

```json
{
    "compilerOptions": {
        "module": "ESNext",
        "moduleResolution": "Bundler"
    }
}
```

`isolatedModules` is absent; the project may silently fail with esbuild/Vite.

```json
{
    "compilerOptions": {
        "isolatedModules": false
    }
}
```

Explicitly disabled — cross-file-only features will compile but may fail at
runtime when transpiled by a single-file tool.

## ✅ Correct

```json
{
    "compilerOptions": {
        "module": "ESNext",
        "moduleResolution": "Bundler",
        "isolatedModules": true
    }
}
```

All files are safe to process in isolation.

## When not to use it

Disable this rule when:

- The project uses `tsc` as the sole build tool (no bundler), so cross-file
  constructs like `const enum` are fully supported.
- You are authoring a library that intentionally uses `const enum` for
  consumers who also compile with `tsc` and can resolve values.

In these cases, `isolatedModules: false` (the default) is intentional.

## Package documentation

> **Rule catalog ID:** R029

## Further reading

- [TypeScript handbook — `isolatedModules`](https://www.typescriptlang.org/tsconfig#isolatedModules)
- [esbuild — TypeScript caveats](https://esbuild.github.io/content-types/#typescript-caveats)
- [Vite — TypeScript — Isolated Modules](https://vite.dev/guide/features#typescript)
- [Babel — TypeScript](https://babeljs.io/docs/babel-plugin-transform-typescript)
