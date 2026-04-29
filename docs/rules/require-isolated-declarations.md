---
title: require-isolated-declarations
description: Require isolatedDeclarations:true for libraries to enable fast single-file declaration emit without full type resolution.
---

# require-isolated-declarations

Require `"isolatedDeclarations": true` in `compilerOptions` so that all
exported declarations carry explicit type annotations, enabling fast
declaration-file generation without full cross-file type resolution.

## Targeted pattern scope

The `compilerOptions.isolatedDeclarations` field in any `tsconfig*.json` file.

## What this rule reports

This rule reports when `compilerOptions.isolatedDeclarations` is absent or
explicitly set to `false`.

## Why this rule exists

TypeScript 5.5 introduced `isolatedDeclarations` as a build-performance
feature for library authors. Traditional declaration emit (`tsc --declaration`)
requires TypeScript to resolve the full type graph — examining every imported
type and every inferred return type — before emitting a single `.d.ts` file.
This is inherently sequential and cannot be parallelised.

With `isolatedDeclarations: true`, TypeScript requires that all exported
declarations include explicit type annotations (parameters, return types, and
property types). Because no cross-file resolution is needed, tools like
`esbuild`, `oxc-transform`, and `SWC` can generate declaration files for each
file independently and in parallel — yielding dramatically faster declaration
emit for large libraries.

When `isolatedDeclarations: true` is enabled, TypeScript reports an error for
any exported declaration that would require cross-file inference:

```typescript
// ❌ TypeScript error with isolatedDeclarations
export function getUser() {
    // return type must be inferred from the return expression
    return { id: 1, name: "Alice" };
}

// ✅ Explicit return type — safe for isolated declaration emit
export function getUser(): { id: number; name: string } {
    return { id: 1, name: "Alice" };
}
```

The auto-fixer adds `"isolatedDeclarations": true` to `compilerOptions`.

## ❌ Incorrect

```json
{
    "compilerOptions": {
        "declaration": true,
        "composite": true
    }
}
```

Declarations are emitted but `isolatedDeclarations` is absent; build tools
cannot parallelise declaration emit.

```json
{
    "compilerOptions": {
        "isolatedDeclarations": false
    }
}
```

Explicitly disabled.

## ✅ Correct

```json
{
    "compilerOptions": {
        "declaration": true,
        "composite": true,
        "isolatedDeclarations": true
    }
}
```

Declaration files can be emitted by fast single-file tools.

## When not to use it

Disable this rule for:

- Application configs (not library configs) where declaration files are not
  emitted and the flag provides no benefit.
- Projects targeting TypeScript < 5.5, where `isolatedDeclarations` is not
  available.
- Codebases where adding explicit type annotations to every export is
  currently impractical. Adopt this rule incrementally as annotations are
  added.

## Package documentation

> **Rule catalog ID:** R034

## Further reading

- [TypeScript 5.5 release — `isolatedDeclarations`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-5.html#isolated-declarations)
- [TypeScript handbook — `isolatedDeclarations`](https://www.typescriptlang.org/tsconfig#isolatedDeclarations)
- [esbuild — TypeScript declarations](https://esbuild.github.io/content-types/#typescript)
