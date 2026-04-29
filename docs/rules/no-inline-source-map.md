---
title: no-inline-source-map
description: Disallow inlineSourceMap:true, which embeds source maps inside every JavaScript output file and substantially increases output size.
---

# no-inline-source-map

Disallow `"inlineSourceMap": true` in `compilerOptions`.

## Targeted pattern scope

The `compilerOptions.inlineSourceMap` field in any `tsconfig*.json` file.

## What this rule reports

This rule reports when `compilerOptions.inlineSourceMap` is explicitly set to
`true`.

## Why this rule exists

TypeScript can emit source maps in two ways:

- **Separate files** (`sourceMap: true`): For each `.js` output file, a
  companion `.js.map` file is written. Browsers and debuggers load the map on
  demand, keeping the `.js` file compact.
- **Inline** (`inlineSourceMap: true`): The full source map is base64-encoded
  and appended as a data URI comment at the bottom of every emitted `.js` file.

Inline source maps inflate every JavaScript output file in proportion to the
size of the original TypeScript source. In a non-trivial codebase, this can
double or triple the file size.

- **Browser bundles:** Increased payload size slows page load, even when source
  maps are not used in production.
- **Node.js packages:** Larger installed files in `node_modules`.
- **Build caches and version control diffs:** Binary-like base64 blobs
  accumulate in diffs and cache hashes.

Separate source map files (`.js.map`) are loaded lazily by browsers and
debuggers only when developer tools are open or when an error is symbolicated.
They impose no cost on normal execution. Prefer `sourceMap: true` and deploy
`.js.map` files alongside the JavaScript output.

## ❌ Incorrect

```json
{
    "compilerOptions": {
        "inlineSourceMap": true
    }
}
```

Every emitted JavaScript file will contain a large base64-encoded source map
comment, increasing output file size.

## ✅ Correct

```json
{
    "compilerOptions": {
        "sourceMap": true
    }
}
```

Source maps are written to separate `.js.map` files and loaded only when needed.

```json
{
    "compilerOptions": {}
}
```

No source maps are emitted; this is acceptable for configs that do not need
source maps at all.

## Behavior and migration notes

- `inlineSourceMap: true` and `sourceMap: true` are mutually exclusive.
  TypeScript reports an error if both are set. When switching from
  `inlineSourceMap: true` to `sourceMap: true`, existing tooling (bundlers,
  deployment scripts) may need to be updated to copy or serve the `.js.map`
  files.
- For development-time builds where file size does not matter, inline source
  maps may be tolerable, but separate source maps are still preferred because
  they work the same way in all environments.

## When not to use it

Disable this rule for local development or rapid-prototyping configs where
simplicity is preferred over output file size.

## Package documentation

> **Rule catalog ID:** R038

## Further reading

- [TypeScript handbook — `inlineSourceMap`](https://www.typescriptlang.org/tsconfig#inlineSourceMap)
- [TypeScript handbook — `sourceMap`](https://www.typescriptlang.org/tsconfig#sourceMap)
