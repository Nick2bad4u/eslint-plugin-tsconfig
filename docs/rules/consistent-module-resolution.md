---
title: consistent-module-resolution
description: Require specific moduleResolution values for Node16, NodeNext, and Preserve module modes.
---

# consistent-module-resolution

Require specific `moduleResolution` values for the `module` modes that this
plugin treats as strict pairings.

## Targeted pattern scope

The `compilerOptions.module` and `compilerOptions.moduleResolution` fields in
any `tsconfig*.json` file, but only for these `module` values:

- `"Node16"` → requires `moduleResolution: "Node16"`
- `"NodeNext"` → requires `moduleResolution: "NodeNext"`
- `"Preserve"` → requires `moduleResolution: "Bundler"`

## What this rule reports

This rule reports when `moduleResolution` is absent or set to an incompatible
value for one of the constrained module modes above.

It does not try to validate every possible `module` / `moduleResolution`
combination.

## Why this rule exists

For these specific module modes, TypeScript expects a matching resolution
algorithm. If the pairing is wrong, the compiler models imports differently than
the runtime or bundler that will eventually execute them.

## ❌ Incorrect

```json
{
  "compilerOptions": {
    "module": "NodeNext",
    "moduleResolution": "node"
  }
}
```

`NodeNext` output should use `NodeNext` resolution so TypeScript models Node's
ESM rules correctly.

## ✅ Correct

```json
{
  "compilerOptions": {
    "module": "NodeNext",
    "moduleResolution": "NodeNext"
  }
}
```

For preserved ESM intended for bundlers:

```json
{
  "compilerOptions": {
    "module": "Preserve",
    "moduleResolution": "Bundler"
  }
}
```

## When not to use it

Disable this rule if you need custom handling for `module` values outside the
three pairings enforced here, or if your build intentionally relies on a
non-standard combination that this plugin does not attempt to model.

## Package documentation

> **Rule catalog ID:** R002

## Further reading

- [TypeScript handbook — `module`](https://www.typescriptlang.org/tsconfig#module)
- [TypeScript handbook — `moduleResolution`](https://www.typescriptlang.org/tsconfig#moduleResolution)
