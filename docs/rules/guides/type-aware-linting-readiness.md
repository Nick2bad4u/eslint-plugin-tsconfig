---
title: Parser and scope readiness
description: Checklist for configuring eslint-plugin-tsconfig parser scope and file targeting correctly.
---

# Parser and scope readiness

Use this guide before enabling `eslint-plugin-tsconfig` rules to ensure the parser and file-targeting are
configured correctly.

> **No type-aware rules.** `eslint-plugin-tsconfig` rules operate on `tsconfig.json` file structure using
> `jsonc-eslint-parser`. None of them require TypeScript type services. You do not need `projectService`
> or `@typescript-eslint/parser` wired for typed linting just to use this plugin.

## When this guide applies

Use this checklist when:

- Adding `eslint-plugin-tsconfig` to an existing ESLint setup for the first time.
- Linting runs are not reporting on `tsconfig.json` files even though the plugin is installed.
- You want to confirm file targeting is scoped correctly in a monorepo.

## Readiness checklist

### 1) Parser assignment

Rules in this plugin require `jsonc-eslint-parser` to be active for `tsconfig*.json` files.
Confirm your flat config applies it to the right files:

```ts
import tsconfig from "eslint-plugin-tsconfig";

export default [
  // The plugin's preset configs already configure the parser and files scope.
  tsconfig.configs.recommended,
];
```

If you are applying rules manually rather than through a preset, wire the parser explicitly:

```ts
import tsconfig from "eslint-plugin-tsconfig";
import jsoncParser from "jsonc-eslint-parser";

export default [
  {
    files: ["**/tsconfig*.json"],
    languageOptions: { parser: jsoncParser },
    plugins: { tsconfig },
    rules: {
      "tsconfig/require-strict-mode": "error",
    },
  },
];
```

### 2) File glob coverage

Confirm the files glob includes every `tsconfig*.json` file you intend to lint:

- Root: `tsconfig.json`, `tsconfig.build.json`, `tsconfig.test.json`, etc.
- Monorepo: `packages/*/tsconfig*.json`, `apps/*/tsconfig*.json`.

Check which files ESLint is actually processing:

```bash
npx eslint "tsconfig*.json" --debug 2>&1 | grep "Processing"
```

### 3) Preset configuration sanity check

Run a quick targeted lint to confirm rules fire correctly:

```bash
npx eslint tsconfig.json
```

An empty output (no errors/warnings) means the tsconfig is compliant with the active preset.
An `"All files matched by ... are ignored"` message means the file glob or parser wiring needs adjustment.

### 4) CI gate ordering

In CI pipelines, these checks complement each other but are independent:

```text
typecheck  →  (TypeScript compiler checks types)
lint       →  (ESLint lints tsconfig*.json files via this plugin + other source files)
test       →  (Vitest/Jest runs unit and integration tests)
```

Lint failures from this plugin indicate tsconfig configuration problems, not type errors.

## Monorepo considerations

In monorepos, run the lint check from each package root, or scope the file glob to cover all packages:

```ts
{
  files: ["tsconfig*.json", "packages/*/tsconfig*.json"],
}
```

Some monorepo configs extend a root `tsconfig.base.json`. Rules apply per-file, so the root base config
is linted independently from each package's extending config.

## Fast validation commands

```bash
# Lint all tsconfig files in the repo
npx eslint "tsconfig*.json" "packages/*/tsconfig*.json"

# Full lint + typecheck + test cycle
npm run lint
npm run typecheck
npm run test
```

## Common failure modes

### Rules not reporting on tsconfig.json

Likely causes:

- `jsonc-eslint-parser` is not configured for the file pattern.
- The file is matched by an ESLint `ignores` glob.
- The plugin is loaded but no preset or rule config is active.

**Fix:** Confirm the flat config has a matching `files` pattern with `jsonc-eslint-parser` assigned, and
that the plugin rules are explicitly enabled or a preset is applied.

### "All files matched by ... are ignored"

Likely causes:

- `tsconfig.json` is listed in `.eslintignore` or an `ignores` array.
- The file is outside the directory scope where ESLint is run.

**Fix:** Remove the file from the ignore list, or run ESLint from the correct working directory.

## Related docs

- [Rollout and fix safety](./rollout-and-fix-safety.md)
- [Rule adoption checklist](./adoption-checklist.md)
- [Preset selection strategy](./preset-selection-strategy.md)
