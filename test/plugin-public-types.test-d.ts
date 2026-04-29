/**
 * @packageDocumentation
 * Type-level contract tests for public plugin exports.
 */
import type { ESLint } from "eslint";

import { assertType } from "vitest";

import type {
    TsconfigConfigName,
    TsconfigRuleId,
    TsconfigRuleName,
} from "../src/plugin";
import type tsconfigPlugin from "../src/plugin";

const validConfigName = "recommended" satisfies TsconfigConfigName;

assertType<TsconfigConfigName>(validConfigName);
// @ts-expect-error Invalid preset key must not satisfy TsconfigConfigName.
assertType<TsconfigConfigName>("recommendedTypeChecked");

const validRuleId = "tsconfig/require-strict-mode" satisfies TsconfigRuleId;

assertType<TsconfigRuleId>(validRuleId);
// @ts-expect-error Rule ids must include the `tsconfig/` namespace prefix.
assertType<TsconfigRuleId>("require-strict-mode");

type RuleNameFromRuleId = TsconfigRuleId extends `tsconfig/${infer RuleName}`
    ? RuleName
    : never;

assertType<TsconfigRuleName>(
    "require-strict-mode" satisfies RuleNameFromRuleId
);

/**
 * Validate that the default plugin export satisfies the ESLint.Plugin contract.
 */
declare const pluginExport: typeof tsconfigPlugin;

assertType<ESLint.Plugin>(pluginExport);
assertType<string | undefined>(pluginExport.meta?.name);
assertType<string | undefined>(pluginExport.meta?.version);
assertType<ESLint.Plugin["configs"] | undefined>(pluginExport.configs);
assertType<ESLint.Plugin["rules"] | undefined>(pluginExport.rules);
