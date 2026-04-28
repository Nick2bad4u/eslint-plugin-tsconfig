# eslint-plugin-typefest

[![npm license.](https://flat.badgen.net/npm/license/eslint-plugin-typefest?color=purple)](https://github.com/Nick2bad4u/eslint-plugin-typefest/blob/main/LICENSE) [![npm total downloads.](https://flat.badgen.net/npm/dt/eslint-plugin-typefest?color=pink)](https://www.npmjs.com/package/eslint-plugin-typefest) [![latest GitHub release.](https://flat.badgen.net/github/release/Nick2bad4u/eslint-plugin-typefest?color=cyan)](https://github.com/Nick2bad4u/eslint-plugin-typefest/releases) [![GitHub stars.](https://flat.badgen.net/github/stars/Nick2bad4u/eslint-plugin-typefest?color=yellow)](https://github.com/Nick2bad4u/eslint-plugin-typefest/stargazers) [![GitHub forks.](https://flat.badgen.net/github/forks/Nick2bad4u/eslint-plugin-typefest?color=green)](https://github.com/Nick2bad4u/eslint-plugin-typefest/forks) [![GitHub open issues.](https://flat.badgen.net/github/open-issues/Nick2bad4u/eslint-plugin-typefest?color=red)](https://github.com/Nick2bad4u/eslint-plugin-typefest/issues) [![codecov.](https://flat.badgen.net/codecov/github/Nick2bad4u/eslint-plugin-typefest?color=blue)](https://codecov.io/gh/Nick2bad4u/eslint-plugin-typefest) [![Mutation testing badge.](https://img.shields.io/endpoint?style=flat-square\&url=https%3A%2F%2Fbadge-api.stryker-mutator.io%2Fgithub.com%2FNick2bad4u%2Feslint-plugin-typefest%2Fmain)](https://dashboard.stryker-mutator.io/reports/github.com/Nick2bad4u/eslint-plugin-typefest/main)

ESLint plugin for teams that want consistent TypeScript-first conventions based on:

- [`type-fest`](https://github.com/sindresorhus/type-fest)
- [`ts-extras`](https://github.com/sindresorhus/ts-extras)

The plugin ships focused rule sets for modern flat config usage, with parser setup
included in each preset config.

## Table of contents

1. [Installation](#installation)
2. [Quick start (flat config)](#quick-start-flat-config)
3. [Presets](#presets)
4. [Configuration examples by preset](#configuration-examples-by-preset)
5. [Global settings](#global-settings)
6. [Rules](#rules)
7. [Contributors ✨](#contributors-)

## Installation

```sh
npm install --save-dev eslint-plugin-typefest typescript
```

> `@typescript-eslint/parser` is loaded automatically by plugin presets.

### Compatibility

- **Supported ESLint versions:** `9.x` and `10.x`
- **Config system:** Flat Config only (`eslint.config.*`)
- **Node.js runtime:** `>=22.0.0`

## Quick start (flat config)

```js
import typefest from "eslint-plugin-typefest";

export default [typefest.configs.recommended];
```

That is enough for TypeScript files (`**/*.{ts,tsx,mts,cts}`).

## Presets

This plugin intentionally exports eight presets:

| Preset                                                                                                                                                                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [🟢](https://nick2bad4u.github.io/eslint-plugin-typefest/docs/rules/presets/minimal) [`typefest.configs.minimal`](https://nick2bad4u.github.io/eslint-plugin-typefest/docs/rules/presets/minimal)                                                       |
| [🟡](https://nick2bad4u.github.io/eslint-plugin-typefest/docs/rules/presets/recommended) [`typefest.configs.recommended`](https://nick2bad4u.github.io/eslint-plugin-typefest/docs/rules/presets/recommended)                                           |
| [🟠](https://nick2bad4u.github.io/eslint-plugin-typefest/docs/rules/presets/recommended-type-checked) [`typefest.configs["recommended-type-checked"]`](https://nick2bad4u.github.io/eslint-plugin-typefest/docs/rules/presets/recommended-type-checked) |
| [🔴](https://nick2bad4u.github.io/eslint-plugin-typefest/docs/rules/presets/strict) [`typefest.configs.strict`](https://nick2bad4u.github.io/eslint-plugin-typefest/docs/rules/presets/strict)                                                          |
| [🟣](https://nick2bad4u.github.io/eslint-plugin-typefest/docs/rules/presets/all) [`typefest.configs.all`](https://nick2bad4u.github.io/eslint-plugin-typefest/docs/rules/presets/all)                                                                   |
| [🧪](https://nick2bad4u.github.io/eslint-plugin-typefest/docs/rules/presets/experimental) [`typefest.configs.experimental`](https://nick2bad4u.github.io/eslint-plugin-typefest/docs/rules/presets/experimental)                                        |
| [💠](https://nick2bad4u.github.io/eslint-plugin-typefest/docs/rules/presets/type-fest-types) [`typefest.configs["type-fest/types"]`](https://nick2bad4u.github.io/eslint-plugin-typefest/docs/rules/presets/type-fest-types)                            |
| [✴️](https://nick2bad4u.github.io/eslint-plugin-typefest/docs/rules/presets/ts-extras-type-guards) [`typefest.configs["ts-extras/type-guards"]`](https://nick2bad4u.github.io/eslint-plugin-typefest/docs/rules/presets/ts-extras-type-guards)          |

## Configuration examples by preset

```js
import typefest from "eslint-plugin-typefest";

export default [
  // Smallest baseline footprint.
  typefest.configs.minimal,

  // Balanced default for most teams.
  // typefest.configs.recommended,

  // Recommended plus type-aware ts-extras helper rules.
  // typefest.configs["recommended-type-checked"],

  // Recommended plus additional stable runtime utilities.
  // typefest.configs.strict,

  // Every stable rule.
  // typefest.configs.all,

  // Every stable rule plus experimental candidate rules.
  // typefest.configs.experimental,

  // Focused subsets:
  // typefest.configs["type-fest/types"],
  // typefest.configs["ts-extras/type-guards"],
];
```

### Parser setup behavior

Each preset already includes:

- `files: ["**/*.{ts,tsx,mts,cts}"]`
- `languageOptions.parser` (`@typescript-eslint/parser`)
- `languageOptions.parserOptions`:
  - `ecmaVersion: "latest"`
  - `projectService: true` (for presets that include typed rules, such as `recommended-type-checked`, `strict`, `all`, and `experimental`)
  - `sourceType: "module"`

End users usually do **not** need to wire parser config manually.

If you need custom parser options (for example `tsconfigRootDir`), extend a preset:

```js
import typefest from "eslint-plugin-typefest";

const recommended = typefest.configs.recommended;

export default [
  {
    ...recommended,
    languageOptions: {
      ...recommended.languageOptions,
      parserOptions: {
        ...recommended.languageOptions?.parserOptions,
        // Add projectService only when you opt into a type-aware preset.
      },
    },
  },
];
```

## Global settings

You can globally disable autofixes that add missing imports while still keeping
rule reports and non-import autofixes enabled.

```js
import typefest from "eslint-plugin-typefest";

export default [
  {
    ...typefest.configs.recommended,
    settings: {
      typefest: {
        // Disable all autofixes while keeping suggestions enabled.
        // disableAllAutofixes: true,

        // Disable only autofixes that add missing imports.
        disableImportInsertionFixes: true,
      },
    },
  },
];
```

When `settings.typefest.disableImportInsertionFixes` is `true`, rules that
would normally add a missing `type-fest` or `ts-extras` import will report
without applying that import-adding autofix. Autofixes that do not require
inserting a new import (for example, when the replacement symbol is already in
scope) still apply.

When `settings.typefest.disableAllAutofixes` is `true`, all rule autofixes are
suppressed, but reports and suggestions remain available.

If both settings are enabled, `disableAllAutofixes` takes precedence for
autofix behavior.

## Rules

- `Fix` legend:
  - `🔧` = autofixable
  - `💡` = suggestions available
  - `—` = report only
- `Preset key` legend:
  - [🟡](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/recommended) — [`tsconfig.configs.recommended`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/recommended)
  - [🔴](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strict) — [`tsconfig.configs.strict`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strict)
  - [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) — [`tsconfig.configs.all`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all)
  - [🔒](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strict-mode) — [`tsconfig.configs["strict-mode"]`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strict-mode)
  - [📦](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/module-resolution) — [`tsconfig.configs["module-resolution"]`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/module-resolution)
  - [📤](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/emit-config) — [`tsconfig.configs["emit-config"]`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/emit-config)
  - [🧹](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/include-hygiene) — [`tsconfig.configs["include-hygiene"]`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/include-hygiene)
  - [🎯](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/lib-target) — [`tsconfig.configs["lib-target"]`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/lib-target)
  - [🔗](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/project-references) — [`tsconfig.configs["project-references"]`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/project-references)

| Rule | Fix | Preset key |
| --- | :-: | :-- |
| [`consistent-incremental-with-tsbuildinfo`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/consistent-incremental-with-tsbuildinfo) | 🔧 | [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [📤](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/emit-config) |
| [`consistent-module-resolution`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/consistent-module-resolution) | — | [🟡](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/recommended) [🔴](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strict) [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [📦](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/module-resolution) |
| [`consistent-target-and-lib`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/consistent-target-and-lib) | — | [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [🎯](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/lib-target) |
| [`no-declaration-only-without-declaration`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-declaration-only-without-declaration) | 🔧 | [🔴](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strict) [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [📤](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/emit-config) |
| [`no-disable-strict-subset`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-disable-strict-subset) | — | [🔴](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strict) [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [🔒](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strict-mode) |
| [`no-emit-in-root-config`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-emit-in-root-config) | 🔧 | [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [📤](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/emit-config) [🔗](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/project-references) |
| [`no-esmoduleinterop-with-verbatim`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-esmoduleinterop-with-verbatim) | 🔧 | [🔴](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strict) [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [📦](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/module-resolution) |
| [`no-esnext-target-in-library`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-esnext-target-in-library) | — | [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [🎯](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/lib-target) |
| [`no-include-dist`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-include-dist) | — | [🔴](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strict) [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [🧹](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/include-hygiene) |
| [`no-include-node-modules`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-include-node-modules) | 🔧 | [🔴](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strict) [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [🧹](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/include-hygiene) |
| [`no-legacy-module-resolution`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-legacy-module-resolution) | — | [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [📦](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/module-resolution) |
| [`no-rootdir-includes-outdir`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-rootdir-includes-outdir) | — | [🔴](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strict) [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [📤](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/emit-config) |
| [`no-skip-lib-check`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/no-skip-lib-check) | — | [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [🧹](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/include-hygiene) |
| [`require-bundler-module-resolution`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-bundler-module-resolution) | 🔧 | [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [📦](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/module-resolution) |
| [`require-composite-for-references`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-composite-for-references) | 🔧 | [🔴](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strict) [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [🔗](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/project-references) |
| [`require-declaration-with-composite`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-declaration-with-composite) | 🔧 | [🔴](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strict) [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [🔗](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/project-references) |
| [`require-downlevel-iteration-with-iterators`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-downlevel-iteration-with-iterators) | 🔧 | [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [🎯](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/lib-target) |
| [`require-exact-optional-property-types`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-exact-optional-property-types) | 🔧 | [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [🔒](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strict-mode) |
| [`require-exclude-common-artifacts`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-exclude-common-artifacts) | 🔧 | [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [🧹](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/include-hygiene) |
| [`require-no-implicit-override`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-no-implicit-override) | 🔧 | [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [🔒](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strict-mode) |
| [`require-no-unchecked-indexed-access`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-no-unchecked-indexed-access) | 🔧 | [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [🔒](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strict-mode) |
| [`require-outdir-when-emitting`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-outdir-when-emitting) | — | [🔴](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strict) [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [📤](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/emit-config) |
| [`require-source-map-in-dev`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-source-map-in-dev) | 🔧 | [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [📤](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/emit-config) |
| [`require-strict-mode`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-strict-mode) | 🔧 | [🟡](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/recommended) [🔴](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strict) [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [🔒](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/strict-mode) |
| [`require-verbatim-module-syntax`](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/require-verbatim-module-syntax) | 🔧 | [🟣](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/all) [📦](https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/presets/module-resolution) |

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
      <td align="center" valign="top" width="25%"><a href="https://github.com/Nick2bad4u"><img src="https://avatars.githubusercontent.com/u/20943337?v=4?s=80" width="80px;" alt="Nick2bad4u"/><br /><sub><b>Nick2bad4u</b></sub></a><br /><a href="https://github.com/Nick2bad4u/eslint-plugin-typefest/issues?q=author%3ANick2bad4u" title="Bug reports">🐛</a> <a href="https://github.com/Nick2bad4u/eslint-plugin-typefest/commits?author=Nick2bad4u" title="Code">💻</a> <a href="https://github.com/Nick2bad4u/eslint-plugin-typefest/commits?author=Nick2bad4u" title="Documentation">📖</a> <a href="#ideas-Nick2bad4u" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-Nick2bad4u" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-Nick2bad4u" title="Maintenance">🚧</a> <a href="https://github.com/Nick2bad4u/eslint-plugin-typefest/pulls?q=is%3Apr+reviewed-by%3ANick2bad4u" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/Nick2bad4u/eslint-plugin-typefest/commits?author=Nick2bad4u" title="Tests">⚠️</a> <a href="#tool-Nick2bad4u" title="Tools">🔧</a></td>
      <td align="center" valign="top" width="25%"><a href="https://snyk.io/"><img src="https://avatars.githubusercontent.com/u/19733683?v=4?s=80" width="80px;" alt="Snyk bot"/><br /><sub><b>Snyk bot</b></sub></a><br /><a href="#security-snyk-bot" title="Security">🛡️</a> <a href="#infra-snyk-bot" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-snyk-bot" title="Maintenance">🚧</a> <a href="https://github.com/Nick2bad4u/eslint-plugin-typefest/pulls?q=is%3Apr+reviewed-by%3Asnyk-bot" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="25%"><a href="https://www.stepsecurity.io/"><img src="https://avatars.githubusercontent.com/u/89328645?v=4?s=80" width="80px;" alt="StepSecurity Bot"/><br /><sub><b>StepSecurity Bot</b></sub></a><br /><a href="#security-step-security-bot" title="Security">🛡️</a> <a href="#infra-step-security-bot" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-step-security-bot" title="Maintenance">🚧</a></td>
      <td align="center" valign="top" width="25%"><a href="https://github.com/apps/dependabot"><img src="https://avatars.githubusercontent.com/in/29110?v=4?s=80" width="80px;" alt="dependabot[bot]"/><br /><sub><b>dependabot[bot]</b></sub></a><br /><a href="#infra-dependabot[bot]" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#security-dependabot[bot]" title="Security">🛡️</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="25%"><a href="https://github.com/apps/github-actions"><img src="https://avatars.githubusercontent.com/in/15368?v=4?s=80" width="80px;" alt="github-actions[bot]"/><br /><sub><b>github-actions[bot]</b></sub></a><br /><a href="https://github.com/Nick2bad4u/eslint-plugin-typefest/commits?author=github-actions[bot]" title="Code">💻</a> <a href="#infra-github-actions[bot]" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->

<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
