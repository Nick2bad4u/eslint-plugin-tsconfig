# eslint-plugin-tsconfig

[![npm license.](https://flat.badgen.net/npm/license/eslint-plugin-tsconfig?color=purple)](https://github.com/Nick2bad4u/eslint-plugin-tsconfig/blob/main/LICENSE) [![npm total downloads.](https://flat.badgen.net/npm/dt/eslint-plugin-tsconfig?color=pink)](https://www.npmjs.com/package/eslint-plugin-tsconfig) [![latest GitHub release.](https://flat.badgen.net/github/release/Nick2bad4u/eslint-plugin-tsconfig?color=cyan)](https://github.com/Nick2bad4u/eslint-plugin-tsconfig/releases) [![GitHub stars.](https://flat.badgen.net/github/stars/Nick2bad4u/eslint-plugin-tsconfig?color=yellow)](https://github.com/Nick2bad4u/eslint-plugin-tsconfig/stargazers) [![GitHub forks.](https://flat.badgen.net/github/forks/Nick2bad4u/eslint-plugin-tsconfig?color=green)](https://github.com/Nick2bad4u/eslint-plugin-tsconfig/forks) [![GitHub open issues.](https://flat.badgen.net/github/open-issues/Nick2bad4u/eslint-plugin-tsconfig?color=red)](https://github.com/Nick2bad4u/eslint-plugin-tsconfig/issues) [![codecov.](https://flat.badgen.net/codecov/github/Nick2bad4u/eslint-plugin-tsconfig?color=blue)](https://codecov.io/gh/Nick2bad4u/eslint-plugin-tsconfig)

ESLint plugin for teams that want consistent `tsconfig.json` configurations enforced as linting rules.

Uses [`jsonc-eslint-parser`](https://github.com/ota-meshi/jsonc-eslint-parser) to statically analyze your `tsconfig*.json` files and report configuration issues.

## Table of contents

1. [Installation](#installation)
2. [Quick start (flat config)](#quick-start-flat-config)
3. [Presets](#presets)
4. [Configuration examples by preset](#configuration-examples-by-preset)
5. [Rules](#rules)
6. [Contributors ✨](#contributors-)

## Installation

```sh
npm install --save-dev eslint-plugin-tsconfig
```

### Compatibility

- **Supported ESLint versions:** `9.x` and `10.x`
- **Config system:** Flat Config only (`eslint.config.*`)
- **Node.js runtime:** `>=22.0.0`

## Quick start (flat config)

```js
import tsconfig from "eslint-plugin-tsconfig";

export default [
  tsconfig.configs.recommended
  ];
```

That is enough to start linting your `tsconfig*.json` files.

## Presets

This plugin exports nine presets:

| Preset                                                                                                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [🟡](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/recommended) [`tsconfig.configs.recommended`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/recommended)                         |
| [🔴](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strict) [`tsconfig.configs.strict`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strict)                                        |
| [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [`tsconfig.configs.all`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all)                                                 |
| [🔒](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strict-mode) [`tsconfig.configs["strict-mode"]`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strict-mode)                      |
| [📦](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/module-resolution) [`tsconfig.configs["module-resolution"]`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/module-resolution)    |
| [📤](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/emit-config) [`tsconfig.configs["emit-config"]`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/emit-config)                      |
| [🧹](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/include-hygiene) [`tsconfig.configs["include-hygiene"]`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/include-hygiene)          |
| [🎯](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/lib-target) [`tsconfig.configs["lib-target"]`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/lib-target)                         |
| [🔗](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/project-references) [`tsconfig.configs["project-references"]`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/project-references) |

## Configuration examples by preset

```js
import tsconfig from "eslint-plugin-tsconfig";

export default [
  // Two recommended rules enabled at "error" severity.
  tsconfig.configs.recommended,

  // All 25 rules enabled.
  // tsconfig.configs.all,

  // Strict type-safety conventions.
  // tsconfig.configs.strict,

  // Focused subsets:
  // tsconfig.configs["strict-mode"],
  // tsconfig.configs["module-resolution"],
  // tsconfig.configs["emit-config"],
  // tsconfig.configs["include-hygiene"],
  // tsconfig.configs["lib-target"],
  // tsconfig.configs["project-references"],
  // tsconfig.configs.jsconfig,
  // tsconfig.configs.strictest,
];
```

### How parser configuration works

Each preset automatically sets:

- `files: ["**/tsconfig.json", "**/tsconfig.*.json", "**/tsconfig-*.json"]` (targeting tsconfig JSON files via `jsonc-eslint-parser`)
- `languageOptions.parser` set to `jsonc-eslint-parser`

End users usually do **not** need to configure the parser manually.

> **Important:** Always use the full preset object (e.g. `tsconfig.configs.recommended`) rather than
> spreading only its `.rules` property. The full preset includes both the `files` glob and the
> `languageOptions.parser` required for rules to fire on `.json` files. Spreading only
> `tsconfig.configs.recommended.rules` skips the parser configuration, so no rule will ever
> report a violation.

## Rules

- `Fix` legend:
  - `🔧` = autofixable
  - `💡` = suggestions available
  - `—` = report only
- `Preset key` legend:
  - [🟡](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/recommended) — [`tsconfig.configs.recommended`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/recommended)
  - [🔴](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strict) — [`tsconfig.configs.strict`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strict)
  - [💎](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strictest) — [`tsconfig.configs.strictest`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strictest)
  - [🟢](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/jsconfig) — [`tsconfig.configs.jsconfig`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/jsconfig)
  - [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) — [`tsconfig.configs.all`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all)
  - [🔒](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strict-mode) — [`tsconfig.configs["strict-mode"]`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strict-mode)
  - [📦](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/module-resolution) — [`tsconfig.configs["module-resolution"]`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/module-resolution)
  - [📤](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/emit-config) — [`tsconfig.configs["emit-config"]`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/emit-config)
  - [🧹](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/include-hygiene) — [`tsconfig.configs["include-hygiene"]`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/include-hygiene)
  - [🎯](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/lib-target) — [`tsconfig.configs["lib-target"]`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/lib-target)
  - [🔗](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/project-references) — [`tsconfig.configs["project-references"]`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/project-references)

| Rule                                                                                                                                                                | Fix | Preset key                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`consistent-incremental-with-tsbuildinfo`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/consistent-incremental-with-tsbuildinfo)                 |  🔧 | [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [📤](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/emit-config)                                                                                                                                                                                                                                                                         |
| [`consistent-module-resolution`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/consistent-module-resolution)                                       |  —  | [🟡](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/recommended) [🔴](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strict) [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [📦](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/module-resolution)                                                                                      |
| [`consistent-target-and-lib`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/consistent-target-and-lib)                                             |  —  | [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [🎯](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/lib-target)                                                                                                                                                                                                                                                                          |
| [`no-allowjs-without-checkjs`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-allowjs-without-checkjs)                                           |  —  | [🟢](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/jsconfig) [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [🧹](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/include-hygiene)                                                                                                                                                                               |
| [`no-declaration-only-without-declaration`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-declaration-only-without-declaration)                 |  🔧 | [🔴](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strict) [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [📤](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/emit-config)                                                                                                                                                                                     |
| [`no-deprecated-target`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-deprecated-target)                                                       |  —  | [🟡](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/recommended) [🔴](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strict) [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [🎯](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/lib-target)                                                                                             |
| [`no-disable-strict-subset`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-disable-strict-subset)                                               |  —  | [🔴](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strict) [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [🔒](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strict-mode)                                                                                                                                                                                     |
| [`no-emit-in-root-config`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-emit-in-root-config)                                                   |  🔧 | [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [📤](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/emit-config) [🔗](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/project-references)                                                                                                                                                                         |
| [`no-esmoduleinterop-with-verbatim`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-esmoduleinterop-with-verbatim)                               |  🔧 | [🔴](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strict) [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [📦](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/module-resolution)                                                                                                                                                                               |
| [`no-esnext-target-in-library`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-esnext-target-in-library)                                         |  —  | [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [🎯](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/lib-target)                                                                                                                                                                                                                                                                          |
| [`no-include-dist`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-include-dist)                                                                 |  —  | [🔴](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strict) [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [🧹](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/include-hygiene)                                                                                                                                                                                 |
| [`no-include-node-modules`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-include-node-modules)                                                 |  🔧 | [🔴](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strict) [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [🧹](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/include-hygiene)                                                                                                                                                                                 |
| [`no-inline-source-map`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-inline-source-map)                                                       |  —  | [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [📤](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/emit-config)                                                                                                                                                                                                                                                                         |
| [`no-legacy-module-detection`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-legacy-module-detection)                                           |  —  | [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [📦](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/module-resolution)                                                                                                                                                                                                                                                                   |
| [`no-legacy-module-resolution`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-legacy-module-resolution)                                         |  —  | [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [📦](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/module-resolution)                                                                                                                                                                                                                                                                   |
| [`no-rootdir-includes-outdir`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-rootdir-includes-outdir)                                           |  —  | [🔴](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strict) [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [📤](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/emit-config)                                                                                                                                                                                     |
| [`no-skip-lib-check`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-skip-lib-check)                                                             |  —  | [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [🧹](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/include-hygiene)                                                                                                                                                                                                                                                                     |
| [`no-suppress-implicit-any-index-errors`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-suppress-implicit-any-index-errors)                     |  —  | [💎](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strictest) [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [🔒](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strict-mode)                                                                                                                                                                                  |
| [`require-bundler-module-resolution`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-bundler-module-resolution)                             |  🔧 | [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [📦](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/module-resolution)                                                                                                                                                                                                                                                                   |
| [`require-composite-for-references`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-composite-for-references)                               |  🔧 | [🔴](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strict) [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [🔗](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/project-references)                                                                                                                                                                              |
| [`require-declaration-map`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-declaration-map)                                                 |  🔧 | [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [📤](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/emit-config)                                                                                                                                                                                                                                                                         |
| [`require-declaration-with-composite`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-declaration-with-composite)                           |  🔧 | [🔴](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strict) [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [🔗](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/project-references)                                                                                                                                                                              |
| [`require-downlevel-iteration-with-iterators`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-downlevel-iteration-with-iterators)           |  🔧 | [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [🎯](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/lib-target)                                                                                                                                                                                                                                                                          |
| [`require-exact-optional-property-types`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-exact-optional-property-types)                     |  🔧 | [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [🔒](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strict-mode)                                                                                                                                                                                                                                                                         |
| [`require-exclude-common-artifacts`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-exclude-common-artifacts)                               |  🔧 | [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [🧹](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/include-hygiene)                                                                                                                                                                                                                                                                     |
| [`require-force-consistent-casing-in-file-names`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-force-consistent-casing-in-file-names)     |  🔧 | [🟡](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/recommended) [🔴](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strict) [💎](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strictest) [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [🧹](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/include-hygiene) |
| [`require-isolated-declarations`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-isolated-declarations)                                     |  🔧 | [💎](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strictest) [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [📤](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/emit-config)                                                                                                                                                                                  |
| [`require-isolated-modules`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-isolated-modules)                                               |  🔧 | [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [📦](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/module-resolution)                                                                                                                                                                                                                                                                   |
| [`require-no-fallthrough-cases-in-switch`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-no-fallthrough-cases-in-switch)                   |  🔧 | [💎](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strictest) [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [🔒](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strict-mode)                                                                                                                                                                                  |
| [`require-no-implicit-override`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-no-implicit-override)                                       |  🔧 | [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [🔒](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strict-mode)                                                                                                                                                                                                                                                                         |
| [`require-no-implicit-returns`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-no-implicit-returns)                                         |  🔧 | [💎](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strictest) [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [🔒](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strict-mode)                                                                                                                                                                                  |
| [`require-no-property-access-from-index-signature`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-no-property-access-from-index-signature) |  🔧 | [💎](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strictest) [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [🔒](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strict-mode)                                                                                                                                                                                  |
| [`require-no-unchecked-indexed-access`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-no-unchecked-indexed-access)                         |  🔧 | [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [🔒](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strict-mode)                                                                                                                                                                                                                                                                         |
| [`require-no-unused-locals`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-no-unused-locals)                                               |  🔧 | [💎](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strictest) [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [🔒](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strict-mode)                                                                                                                                                                                  |
| [`require-no-unused-parameters`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-no-unused-parameters)                                       |  🔧 | [💎](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strictest) [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [🔒](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strict-mode)                                                                                                                                                                                  |
| [`require-outdir-when-emitting`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-outdir-when-emitting)                                       |  —  | [🔴](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strict) [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [📤](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/emit-config)                                                                                                                                                                                     |
| [`require-source-map-in-dev`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-source-map-in-dev)                                             |  🔧 | [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [📤](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/emit-config)                                                                                                                                                                                                                                                                         |
| [`require-strict-mode`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-strict-mode)                                                         |  🔧 | [🟡](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/recommended) [🔴](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strict) [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [🔒](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strict-mode)                                                                                            |
| [`require-use-unknown-in-catch-variables`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-use-unknown-in-catch-variables)                   |  🔧 | [💎](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strictest) [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [🔒](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strict-mode)                                                                                                                                                                                  |
| [`require-verbatim-module-syntax`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-verbatim-module-syntax)                                   |  🔧 | [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [📦](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/module-resolution)                                                                                                                                                                                                                                                                   |

## Contributors ✨

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors.](https://img.shields.io/badge/all_contributors-5-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->

<!-- prettier-ignore-start -->

<!-- markdownlint-disable -->

<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="25%"><a href="https://github.com/Nick2bad4u"><img src="https://avatars.githubusercontent.com/u/20943337?v=4?s=80" width="80px;" alt="Nick2bad4u"/><br /><sub><b>Nick2bad4u</b></sub></a><br /><a href="https://github.com/Nick2bad4u/eslint-plugin-tsconfig/issues?q=author%3ANick2bad4u" title="Bug reports">🐛</a> <a href="https://github.com/Nick2bad4u/eslint-plugin-tsconfig/commits?author=Nick2bad4u" title="Code">💻</a> <a href="https://github.com/Nick2bad4u/eslint-plugin-tsconfig/commits?author=Nick2bad4u" title="Documentation">📖</a> <a href="#ideas-Nick2bad4u" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-Nick2bad4u" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-Nick2bad4u" title="Maintenance">🚧</a> <a href="https://github.com/Nick2bad4u/eslint-plugin-tsconfig/pulls?q=is%3Apr+reviewed-by%3ANick2bad4u" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/Nick2bad4u/eslint-plugin-tsconfig/commits?author=Nick2bad4u" title="Tests">⚠️</a> <a href="#tool-Nick2bad4u" title="Tools">🔧</a></td>
      <td align="center" valign="top" width="25%"><a href="https://snyk.io/"><img src="https://avatars.githubusercontent.com/u/19733683?v=4?s=80" width="80px;" alt="Snyk bot"/><br /><sub><b>Snyk bot</b></sub></a><br /><a href="#security-snyk-bot" title="Security">🛡️</a> <a href="#infra-snyk-bot" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-snyk-bot" title="Maintenance">🚧</a> <a href="https://github.com/Nick2bad4u/eslint-plugin-tsconfig/pulls?q=is%3Apr+reviewed-by%3Asnyk-bot" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="25%"><a href="https://www.stepsecurity.io/"><img src="https://avatars.githubusercontent.com/u/89328645?v=4?s=80" width="80px;" alt="StepSecurity Bot"/><br /><sub><b>StepSecurity Bot</b></sub></a><br /><a href="#security-step-security-bot" title="Security">🛡️</a> <a href="#infra-step-security-bot" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-step-security-bot" title="Maintenance">🚧</a></td>
      <td align="center" valign="top" width="25%"><a href="https://github.com/apps/dependabot"><img src="https://avatars.githubusercontent.com/in/29110?v=4?s=80" width="80px;" alt="dependabot[bot]"/><br /><sub><b>dependabot[bot]</b></sub></a><br /><a href="#infra-dependabot[bot]" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#security-dependabot[bot]" title="Security">🛡️</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="25%"><a href="https://github.com/apps/github-actions"><img src="https://avatars.githubusercontent.com/in/15368?v=4?s=80" width="80px;" alt="github-actions[bot]"/><br /><sub><b>github-actions[bot]</b></sub></a><br /><a href="https://github.com/Nick2bad4u/eslint-plugin-tsconfig/commits?author=github-actions[bot]" title="Code">💻</a> <a href="#infra-github-actions[bot]" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->

<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
