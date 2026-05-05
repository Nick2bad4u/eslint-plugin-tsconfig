---
title: require-no-unused-parameters
description: Require noUnusedParameters:true to report declared but unused function parameters.
---

# require-no-unused-parameters

Require `"noUnusedParameters": true` in `compilerOptions` to report declared but
unused function parameters.

## Targeted pattern scope

The `compilerOptions.noUnusedParameters` field in any `tsconfig*.json` file.

## What this rule reports

This rule reports when `compilerOptions` is present and `compilerOptions.noUnusedParameters` is absent or explicitly set to `false`. The rule does not report if `compilerOptions` is not defined at all.

## Why this rule exists

Function signatures document the contract between a caller and a callee. When a
parameter is present in the signature but never read inside the function body,
it misleads callers into believing the value is used, and it adds noise to the
signature that must be mentally filtered out during code review.

`noUnusedParameters: true` raises a compile-time error for any function
parameter that is declared but never read. This:

- Catches refactoring mistakes where a parameter was present in an older
  version of a function but is no longer needed after the function body
  changed.
- Keeps function signatures accurate: every declared parameter genuinely
  influences the function's behavior.
- Prevents accidental parameter drift in overridden methods, callbacks, and
  event handlers.

Parameters that are intentionally ignored can be prefixed with `_` (for example
`_event`) to suppress the error without removing the parameter from the
signature, which is useful when the parameter must be present to satisfy an
interface or callback shape.

The auto-fixer adds `"noUnusedParameters": true` to `compilerOptions`.

## ❌ Incorrect

```json
{
    "compilerOptions": {
        "strict": true
    }
}
```

`noUnusedParameters` is absent; unused function parameters do not produce type
errors.

```json
{
    "compilerOptions": {
        "strict": true,
        "noUnusedParameters": false
    }
}
```

Explicitly disabled; TypeScript will not report unused function parameters.

## ✅ Correct

```json
{
    "compilerOptions": {
        "strict": true,
        "noUnusedParameters": true
    }
}
```

TypeScript reports an error for any function parameter that is declared but
never read.

## Behavior and migration notes

- When enabling `noUnusedParameters: true` for the first time in an existing
  project, TypeScript may surface errors in callback-heavy code where
  framework-imposed signatures include parameters the handler does not use.
  The standard fix is to prefix unused parameters with `_`.
- `noUnusedParameters` covers parameters in function declarations, function
  expressions, arrow functions, methods, and constructors.
- The flag pairs naturally with `noUnusedLocals: true` (`require-no-unused-locals`)
  for comprehensive unused-symbol coverage.

## When not to use it

Disable this rule in projects where function signatures must conform to
framework-imposed shapes and prefixing ignored parameters with `_` is considered
too noisy.

## Package documentation

> **Rule catalog ID:** R040

## Further reading

- [TypeScript handbook — `noUnusedParameters`](https://www.typescriptlang.org/tsconfig#noUnusedParameters)
- [TypeScript handbook — `noUnusedLocals`](https://www.typescriptlang.org/tsconfig#noUnusedLocals)
