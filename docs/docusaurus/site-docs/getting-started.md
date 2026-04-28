---
sidebar_position: 2
---

# Getting Started

Install the plugin:

```bash
npm install --save-dev eslint-plugin-tsconfig
```

Then enable it in your Flat Config:

```ts
import tsconfig from "eslint-plugin-tsconfig";

export default [
    tsconfig.configs.recommended,
];
```

This lints all `tsconfig*.json` files in your project.

## Recommended approach

- Start with `tsconfig.configs.recommended` (two essential rules).
- Expand to `tsconfig.configs.strict` or `tsconfig.configs.all` as your team grows comfortable.
- Use focused presets (`strict-mode`, `module-resolution`, `emit-config`, etc.) to opt in rule-by-rule.

## Rule navigation

Use the sidebar **Rules** section for the full list of rule docs synced from the repository.
