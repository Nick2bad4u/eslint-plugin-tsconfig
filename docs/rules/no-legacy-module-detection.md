---
title: no-legacy-module-detection
description: Disallow moduleDetection:"legacy" — the pre-4.7 script/module classification is incompatible with modern tooling.
---

# no-legacy-module-detection

Disallow `moduleDetection: "legacy"` in `compilerOptions`.

## Targeted pattern scope

The `compilerOptions.moduleDetection` field in any `tsconfig*.json` file.

## What this rule reports

This rule reports when `compilerOptions.moduleDetection` is explicitly set to
`"legacy"`.

## Why this rule exists

TypeScript 4.7 introduced `moduleDetection` to control how TypeScript decides
whether a `.ts` file is a **module** (has top-level `import`/`export`) or a
**script** (runs in the global scope). The available values are:

| Value      | Behaviour                                                                                                    |
| ---------- | ------------------------------------------------------------------------------------------------------------ |
| `"legacy"` | Pre-4.7 behaviour: a file is a module only if it contains `import`/`export`                                  |
| `"auto"`   | Considers `package.json#type: "module"`, `.mts`/`.cts` extensions, and `jsx` settings to determine file type |
| `"force"`  | Treats every non-declaration file as a module, unconditionally                                               |

The `"legacy"` mode has two well-known failure modes:

### 1. Accidental global scope pollution

A `.ts` file with no imports or exports is treated as a script under
`"legacy"`, meaning its declarations enter the global scope. Adding a single
`export {}` fixes this, but it is easy to forget — and the error only surfaces
when a name collision with another module is detected.

### 2. Incompatibility with modern bundlers

Vite, esbuild, Webpack 5, and other bundlers treat every `.ts` file as a
module by default. When TypeScript uses `"legacy"` detection and a bundler
uses module semantics, the two disagree on the file's scope, leading to
confusing type errors or runtime failures.

Use `"auto"` to get context-aware module detection, or `"force"` to ensure
every file is always a module regardless of content.

## ❌ Incorrect

```json
{
    "compilerOptions": {
        "module": "NodeNext",
        "moduleDetection": "legacy"
    }
}
```

Legacy detection is incompatible with `NodeNext` module resolution.

## ✅ Correct

```json
{
    "compilerOptions": {
        "module": "NodeNext",
        "moduleDetection": "auto"
    }
}
```

`"auto"` considers `package.json#type` and file extensions.

```json
{
    "compilerOptions": {
        "module": "ESNext",
        "moduleResolution": "Bundler",
        "moduleDetection": "force"
    }
}
```

`"force"` is the safest option for bundler projects.

```json
{
    "compilerOptions": {
        "module": "NodeNext"
    }
}
```

`moduleDetection` is absent — TypeScript defaults to `"auto"` in most modern
configurations.

## When not to use it

Disable this rule when maintaining a project that intentionally relies on
TypeScript's legacy global-scope behaviour — for example, a codebase that
writes ambient declarations in script files and uses reference paths to combine
them. This pattern is uncommon in new projects but exists in some legacy
codebases.

## Package documentation

> **Rule catalog ID:** R031

## Further reading

- [TypeScript 4.7 release — `moduleDetection`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-7.html#moduledection)
- [TypeScript handbook — `moduleDetection`](https://www.typescriptlang.org/tsconfig#moduleDetection)
