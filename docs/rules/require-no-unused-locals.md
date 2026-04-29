---
title: require-no-unused-locals
description: Require noUnusedLocals:true to report declared but unused local variables and imports.
---

# require-no-unused-locals

Require `"noUnusedLocals": true` in `compilerOptions` to report declared but
unused local variables.

## Targeted pattern scope

The `compilerOptions.noUnusedLocals` field in any `tsconfig*.json` file.

## What this rule reports

This rule reports when `compilerOptions.noUnusedLocals` is absent or explicitly
set to `false`.

## Why this rule exists

TypeScript does not, by default, report errors for variables, function locals,
or imported names that are declared but never read. This means dead code can
accumulate undetected: renamed variables whose old names are never removed,
imports added while exploring an API but never used, or intermediate
computations whose results are discarded.

`noUnusedLocals: true` raises a compile-time error for any local variable,
import binding, or destructured name that is declared but never referenced after
its declaration. This:

- Prevents dead code accumulation that obscures intent and increases maintenance
  burden.
- Clarifies what each scope actually depends on, making code easier to reason
  about.
- Catches a common class of refactoring mistakes where a variable is renamed in
  one place but the old reference is not removed.

The auto-fixer adds `"noUnusedLocals": true` to `compilerOptions`.

## ❌ Incorrect

```json
{
    "compilerOptions": {
        "strict": true
    }
}
```

`noUnusedLocals` is absent; unused local variables and imports do not produce
type errors.

```json
{
    "compilerOptions": {
        "strict": true,
        "noUnusedLocals": false
    }
}
```

Explicitly disabled; TypeScript will not report unused locals.

## ✅ Correct

```json
{
    "compilerOptions": {
        "strict": true,
        "noUnusedLocals": true
    }
}
```

TypeScript reports an error for any declared but unread local variable or
import.

## Behavior and migration notes

- When enabling `noUnusedLocals: true` for the first time in an existing
  project, TypeScript may report errors across the codebase. The most common fixes
  are removing the unused declaration or prefixing the variable name with `_`
  to signal intentional non-use.
- `noUnusedLocals` applies to local variables within function bodies and to
  module-level imports. It does not apply to exported symbols.
- This flag does not interact with ESLint's `no-unused-vars` rule, but they
  serve similar purposes. Using both provides TypeScript-level feedback
  during type-checking as well as ESLint-level feedback during linting.

## When not to use it

Disable this rule in projects or config files where unused locals are
intentionally permitted — for example, declaration files (`.d.ts`) or configs
that are shared as a base and extended by downstream configs that suppress the
flag.

## Package documentation

> **Rule catalog ID:** R039

## Further reading

- [TypeScript handbook — `noUnusedLocals`](https://www.typescriptlang.org/tsconfig#noUnusedLocals)
