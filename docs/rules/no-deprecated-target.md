---
title: no-deprecated-target
description: Disallow obsolete target values below ES2015 — all modern runtimes have supported ES2015 for years.
---

# no-deprecated-target

Disallow `target` values of `"ES3"` or `"ES5"` in `compilerOptions`.

## Targeted pattern scope

The `compilerOptions.target` field in any `tsconfig*.json` file.

## What this rule reports

This rule reports when `compilerOptions.target` is set to `"ES3"` or `"ES5"`.

## Why this rule exists

TypeScript's `target` option controls which JavaScript version the compiler
emits. Targeting an old version causes TypeScript to down-level modern syntax
features — arrow functions become `function` expressions, `class` becomes
prototype chains, template literals become string concatenation, and so on.

As of 2024, **ES2015 (ES6) support is universal** across all actively
maintained runtimes:

| Runtime                 | ES2015 support since |
| ----------------------- | -------------------- |
| Node.js                 | v6.0 (April 2016)    |
| Chrome / V8             | v51 (May 2016)       |
| Firefox                 | v54 (June 2017)      |
| Safari / JavaScriptCore | v10 (September 2016) |
| Edge (Chromium)         | v14 (August 2016)    |

Consequences of targeting `ES3` or `ES5`:

- **Larger output:** Down-leveled syntax is verbose. Arrow functions, classes,
  and destructuring all expand into more code.
- **Performance regressions:** Some engines have optimised native ES2015+
  syntax paths that down-leveled equivalents do not benefit from.
- **False security:** The project may still use npm packages that ship ES2015+
  code, meaning the bundle is not actually ES5-safe end-to-end.
- **Decorator interop issues:** The legacy decorator implementation in TS 5.x
  behaves differently under `ES5` vs `ES2022` targets.

If you need to support old runtimes (pre-ES2015), use a separate transpilation step
(e.g., Babel) targeting those runtimes after TypeScript has done its type
checking against a modern target. This gives you accurate type checking
_and_ the correct output.

## ❌ Incorrect

```json
{
    "compilerOptions": {
        "target": "ES3"
    }
}
```

Targets a 1999-era JavaScript specification.

```json
{
    "compilerOptions": {
        "target": "ES5"
    }
}
```

Targets IE-era JavaScript; no modern runtime requires this.

## ✅ Correct

```json
{
    "compilerOptions": {
        "target": "ES2022"
    }
}
```

Targets a version all modern runtimes support natively.

```json
{
    "compilerOptions": {
        "target": "ESNext"
    }
}
```

Targets the latest ECMAScript version — appropriate for Vite/bundler
projects where a separate minifier handles compatibility.

## When not to use it

Disable this rule when the project genuinely targets an environment that only
supports ES3 or ES5 — such as legacy IoT firmware, embedded browsers from before 2016,
or environments with a strict regulatory mandate to support Internet Explorer.
In those cases, the old target is intentional and the trade-offs are accepted.

## Package documentation

> **Rule catalog ID:** R027

## Further reading

- [TypeScript handbook — `target`](https://www.typescriptlang.org/tsconfig#target)
- [Node.js compatibility table](https://node.green/)
- [ECMAScript compatibility table](https://kangax.github.io/compat-table/es6/)
