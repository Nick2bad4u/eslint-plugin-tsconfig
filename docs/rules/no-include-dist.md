---
title: no-include-dist
description: Disallow include patterns that match dist or build output directories.
---

# no-include-dist

Disallow `include` patterns that match `dist`, `build`, or similar output
directories, which would cause TypeScript to attempt to compile generated
files.

## Targeted pattern scope

The `include` array in any `tsconfig*.json` file.

## What this rule reports

This rule reports `include` entries that would match common build output
directories, including `dist`, `build`, `out`, and `lib` when placed at the
project root (e.g., `"dist"`, `"dist/**"`, `"./build"`, `"./out/**"`).

## Why this rule exists

Build output directories contain generated JavaScript (and sometimes
declaration files) that TypeScript should not re-compile. Including them
creates the following problems:

- TypeScript attempts to compile files it already generated, producing errors
  or duplicate declarations.
- Type errors in generated code confuse developers since the errors are in
  output, not in source.
- Build times increase because TypeScript processes files it should skip.
- In project reference setups, including output files from referenced packages
  breaks the module boundary guarantees that composite builds enforce.

## ❌ Incorrect

```json
{
    "include": ["src", "dist"]
}
```

TypeScript will attempt to process files in `dist/`, which are build outputs.

```json
{
    "include": ["**/*"],
    "exclude": ["node_modules"]
}
```

Without excluding `dist/`, the `**/*` pattern includes build output.

## ✅ Correct

```json
{
    "include": ["src"]
}
```

Only source files are included. Output directories are not listed.

```json
{
    "include": ["**/*"],
    "exclude": ["node_modules", "dist", "build"]
}
```

If a broad include pattern is used, output directories should be explicitly
excluded.

## When not to use it

Disable this rule in rare scenarios where the project intentionally validates
generated code — for example, a code generation tool that type-checks its own
output as part of a test suite.

## Package documentation

> **Rule catalog ID:** R009

## Further reading

- [TypeScript handbook — `include`](https://www.typescriptlang.org/tsconfig#include)
- [TypeScript handbook — `exclude`](https://www.typescriptlang.org/tsconfig#exclude)
