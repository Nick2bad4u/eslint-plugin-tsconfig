---
title: Preset selection strategy
description: Choose the right eslint-plugin-tsconfig preset and roll it out with minimal migration risk.
---

# Preset selection strategy

This guide helps teams pick a preset based on migration tolerance, strictness goals, and rollout velocity.

> **No type-aware rules.** All `eslint-plugin-tsconfig` rules operate on the `tsconfig.json` file structure
> using `jsonc-eslint-parser`. None of the rules require TypeScript type services at lint time.

## Decision checkpoints

Use these checkpoints before choosing a preset:

1. **Migration bandwidth**: Can the team handle broad replacement churn this quarter?
2. **Runtime sensitivity**: Do you need to review behavior-sensitive changes manually before broad adoption?
3. **Convergence target**: Do you intend to land on `strict`/`all`, or stay at a stable baseline?
4. **Specialization**: Does the codebase have a particular focus — module resolution, emit, project references — that warrants a domain preset?

## Baseline presets

Choose one baseline preset as the foundation. These are ordered from least to most churn.

### `recommended`

Choose this when:

- You want a pragmatic starting point for most TypeScript codebases.
- You want to pick up the highest-impact rules with minimal configuration effort.
- You can absorb moderate migration churn.

### `strict`

Choose this when:

- Your codebase already enforces strong lint and type discipline.
- You prefer broader consistency constraints and can absorb more churn.

### `strictest`

Choose this when:

- You want the highest confidence in tsconfig correctness.
- You are comfortable with every rule the plugin offers in the strict tier.

### `all`

Choose this when:

- You want full plugin coverage across every domain and strictness level.
- You actively maintain migration and suppression hygiene.
- You are evaluating the complete rule set before narrowing down.

### `jsconfig`

Choose this when:

- The project uses JavaScript with `allowJs: true` / `checkJs: true`.
- You want rules tuned for JS-first workflows rather than strict TypeScript projects.

## Domain presets

Layer one or more domain presets on top of a baseline when they match your codebase goals. These are additive — you can combine multiple domain presets in a single config.

### `strict-mode`

Choose this when:

- You want to enforce all TypeScript strict-mode flags as a group.
- You are converging on `"strict": true` as a team standard.

### `emit-config`

Choose this when:

- Your project emits declarations, source maps, or build artifacts.
- You want rules that catch common emit misconfiguration.

### `module-resolution`

Choose this when:

- The project uses modern module resolution (`Bundler`, `NodeNext`, etc.).
- You want to catch legacy resolution patterns before they cause runtime surprises.

### `lib-target`

Choose this when:

- You want to enforce consistent `target` and `lib` choices.
- You want to prevent deprecated or overly broad target values.

### `include-hygiene`

Choose this when:

- You want to keep `include`, `exclude`, and `rootDir` clean.
- You want to catch common file-scoping mistakes that affect coverage or IDE behavior.

### `project-references`

Choose this when:

- The project uses TypeScript project references (`references` array, `composite: true`).
- You want rules that enforce correct reference and build configuration.

## Rollout playbook

1. Start with `warn` for one target folder/package.
2. Record baseline violations and identify high-churn rule families.
3. Run autofix in scoped batches, then run full tests/typecheck.
4. Promote to `error` after each batch reaches zero violations.
5. Repeat until all target folders are converged.

## Validation gates

- `npm run lint`
- `npm run typecheck`
- `npm run test`

For monorepos, run package-level gates first, then full-repo gates.

## Escalation policy

If a rule creates migration risk or noisy output:

1. Keep the preset enabled.
2. Temporarily lower that single rule to `warn` or `off` with a tracking note.
3. Re-enable after targeted remediation.

This preserves preset consistency while avoiding long-lived blind spots.
