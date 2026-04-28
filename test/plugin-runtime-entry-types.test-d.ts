/**
 * @packageDocumentation
 * Type-level contract tests for runtime entrypoint declarations.
 */
import type { ESLint } from "eslint";

import { assertType } from "vitest";

import tsconfigPlugin from "../src/plugin";

assertType<ESLint.Plugin>(tsconfigPlugin);

assertType<ESLint.Plugin["configs"] | undefined>(tsconfigPlugin.configs);
assertType<string | undefined>(tsconfigPlugin.meta?.name);
assertType<string | undefined>(tsconfigPlugin.meta?.version);
assertType<ESLint.Plugin["rules"] | undefined>(tsconfigPlugin.rules);
