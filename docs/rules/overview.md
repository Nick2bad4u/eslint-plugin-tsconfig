---
title: Overview
description: README-style overview for eslint-plugin-tsconfig.
---

# eslint-plugin-tsconfig

ESLint plugin for teams that want consistent `tsconfig.json` configurations enforced as linting rules.

Uses [`jsonc-eslint-parser`](https://github.com/ota-meshi/jsonc-eslint-parser) to statically analyze your `tsconfig*.json` files.

## Installation

```bash
npm install --save-dev eslint-plugin-tsconfig
```

## Quick start (Flat Config)

```ts
import tsconfig from "eslint-plugin-tsconfig";

export default [tsconfig.configs.recommended];
```

That is enough to start linting your `tsconfig*.json` files.

## Presets

| Preset                                      | Preset page                                           |
| ------------------------------------------- | ----------------------------------------------------- |
| 🟡 `tsconfig.configs.recommended`           | [Recommended](./presets/recommended.md)               |
| 🔴 `tsconfig.configs.strict`                | [Strict](./presets/strict.md)                         |
| 🟣 `tsconfig.configs.all`                   | [All](./presets/all.md)                               |
| 🔒 `tsconfig.configs["strict-mode"]`        | [Strict Mode](./presets/strict-mode.md)               |
| 📦 `tsconfig.configs["module-resolution"]`  | [Module Resolution](./presets/module-resolution.md)   |
| 📤 `tsconfig.configs["emit-config"]`        | [Emit Config](./presets/emit-config.md)               |
| 🧹 `tsconfig.configs["include-hygiene"]`    | [Include Hygiene](./presets/include-hygiene.md)       |
| 🎯 `tsconfig.configs["lib-target"]`         | [Lib Target](./presets/lib-target.md)                 |
| 🔗 `tsconfig.configs["project-references"]` | [Project References](./presets/project-references.md) |

## Next steps

- Open **Getting Started** in this sidebar.
- Browse [**Presets**](./presets/index.md) for preset-by-preset guidance.
- Use **Rules** to review every rule with examples.
