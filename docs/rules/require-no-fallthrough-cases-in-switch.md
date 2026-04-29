---
title: require-no-fallthrough-cases-in-switch
description: Require noFallthroughCasesInSwitch:true to report switch cases that fall through without break, return, or throw.
---

# require-no-fallthrough-cases-in-switch

Require `"noFallthroughCasesInSwitch": true` in `compilerOptions` so that
TypeScript reports an error for `switch` cases that fall through without an
explicit terminator.

## Targeted pattern scope

The `compilerOptions.noFallthroughCasesInSwitch` field in any `tsconfig*.json`
file.

## What this rule reports

This rule reports when `compilerOptions.noFallthroughCasesInSwitch` is absent
or explicitly set to `false`.

## Why this rule exists

`switch` fall-through is one of the most common sources of latent bugs in
JavaScript and TypeScript. When a `case` block is not terminated by `break`,
`return`, or `throw`, execution continues into the next `case` body, even if
the next `case` condition does not match:

```typescript
switch (action) {
    case "increment":
        count++;
    // ← missing break — falls through to "decrement"!
    case "decrement":
        count--;
        break;
}
```

This is almost always unintentional. Intentional fall-through (sharing a code
path between two case labels) can still be expressed by placing the labels
consecutively with no code between them:

```typescript
switch (action) {
    case "increment":
    case "increase": // explicit shared case — TypeScript allows this
        count++;
        break;
}
```

`noFallthroughCasesInSwitch: true` makes TypeScript report an error on the
first pattern above while allowing the second.

The auto-fixer adds `"noFallthroughCasesInSwitch": true` to `compilerOptions`.

## ❌ Incorrect

```json
{
    "compilerOptions": {
        "target": "ES2022",
        "module": "NodeNext"
    }
}
```

`noFallthroughCasesInSwitch` is absent; fall-through cases go unreported.

```json
{
    "compilerOptions": {
        "noFallthroughCasesInSwitch": false
    }
}
```

Explicitly disabled.

## ✅ Correct

```json
{
    "compilerOptions": {
        "noFallthroughCasesInSwitch": true
    }
}
```

All non-empty `switch` cases must explicitly terminate.

## When not to use it

Disable this rule in projects that intentionally rely on fall-through as a
control-flow pattern, or that use a linting rule (such as ESLint's built-in
`no-fallthrough`) to enforce this at the source level instead.

## Package documentation

> **Rule catalog ID:** R032

## Further reading

- [TypeScript handbook — `noFallthroughCasesInSwitch`](https://www.typescriptlang.org/tsconfig#noFallthroughCasesInSwitch)
- [MDN — `switch` statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch)
