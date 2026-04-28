---
title: Getting Started
description: Enable eslint-plugin-tsconfig quickly in Flat Config.
---

# Getting Started

Install the plugin:

```bash
npm install --save-dev eslint-plugin-tsconfig
```

Enable one preset in your Flat Config:

```ts
import tsconfig from "eslint-plugin-tsconfig";

export default [
    tsconfig.configs.recommended,
];
```

Each preset automatically sets:
- `files: ["**/*.{json,jsonc}"]` (targeting `tsconfig*.json` files)
- `languageOptions.parser` set to `jsonc-eslint-parser`

## Alternative: manual scoped setup

If you prefer full control, spread the preset rules manually:

```ts
import * as jsoncParser from "jsonc-eslint-parser";
import tsconfig from "eslint-plugin-tsconfig";

export default [
    {
        files: ["**/tsconfig*.json"],
        languageOptions: {
            parser: jsoncParser,
        },
        plugins: {
            tsconfig,
        },
        rules: {
            ...tsconfig.configs.recommended.rules,
        },
    },
];
```

## Recommended rollout

1. Start with `recommended` (two essential rules).
2. Fix violations, then move to `strict` for stronger conventions.
3. Add focused presets (`strict-mode`, `module-resolution`, `emit-config`, etc.) to opt in to focused rule subsets.
4. Use `all` when you want every available rule.

## Focused subsets

- 🔒 `tsconfig.configs["strict-mode"]`
- 📦 `tsconfig.configs["module-resolution"]`
- 📤 `tsconfig.configs["emit-config"]`
- 🧹 `tsconfig.configs["include-hygiene"]`
- 🎯 `tsconfig.configs["lib-target"]`
- 🔗 `tsconfig.configs["project-references"]`

See the **Presets** section in this sidebar for details and examples.