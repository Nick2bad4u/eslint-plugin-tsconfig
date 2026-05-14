/**
 * @remarks
 * Unlike TypeScript-AST rules that use `@typescript-eslint/utils`, these rules
 * analyze `tsconfig*.json` files via the `jsonc-eslint-parser` JSONC AST. This
 * factory injects canonical `docs.url`, `docs.ruleId`, and `docs.ruleNumber`
 * from the rule catalog, and validates the `tsconfigConfigs` preset membership
 * field.
 *
 * @packageDocumentation
 * Typed factory for JSONC-based ESLint rules in eslint-plugin-tsconfig.
 */
import type { Rule } from "eslint";
import type { RuleListener as JsoncRuleListener } from "jsonc-eslint-parser";
import type { Except } from "type-fest";

import { objectEntries } from "ts-extras";

import type { TsconfigConfigName } from "./tsconfig-config-references.js";

import { getRuleCatalogEntryForRuleNameOrNull } from "./rule-catalog.js";
import { createRuleDocsUrl } from "./rule-docs-url.js";

/**
 * Input definition passed to `createJsoncRule`.
 */
export interface JsoncRuleDefinition {
    /**
     * Rule factory function receiving the ESLint rule context and returning a
     * JSONC-aware node listener map.
     */
    create: (
        context: Readonly<Rule.RuleContext>
    ) => JsoncRuleListener | Rule.RuleListener;

    /** ESLint rule metadata. */
    meta: JsoncRuleMeta;

    /** Rule name matching the key in `rules-registry.ts`. */
    name: string;
}

/**
 * Typed `meta.docs` block required on every JSONC rule in this plugin.
 */
export interface JsoncRuleDocs {
    /**
     * Short, imperative description of what the rule checks.
     *
     * @remarks
     * Must be unique across all rules in the plugin and written in imperative
     * mood (e.g. "Require `strict: true` in `compilerOptions`").
     */
    description: string;

    /**
     * Whether the rule is included in the `recommended` preset.
     */
    recommended: boolean;

    /**
     * Always `false` for JSONC rules — they do not use the TypeScript type
     * checker.
     */
    requiresTypeChecking: false;

    /**
     * Catalog rule identifier in the `R###` format (injected automatically when
     * the rule is present in the rule catalog).
     */
    ruleId?: string;

    /**
     * Catalog ordinal for this rule (injected automatically when present in the
     * rule catalog).
     */
    ruleNumber?: number;

    /**
     * One or more tsconfig preset names this rule belongs to.
     *
     * @remarks
     * Every rule must declare at least one preset. Use the `all` preset for
     * rules that should appear in every preset, plus the specific category
     * preset for categorized membership.
     */
    tsconfigConfigs: readonly TsconfigConfigName[] | TsconfigConfigName;

    /**
     * Canonical docs page URL (injected automatically by `createJsoncRule`).
     *
     * @remarks
     * Do not set this manually; it will be overwritten with the canonical value
     * derived from `meta.name`.
     */
    url?: string;
}

/**
 * The public module type for a JSONC-based tsconfig ESLint rule.
 *
 * @remarks
 * Using `any` for TOptions, TRuleContext, and TRuleListener bypasses generic
 * constraint checks and ensures structural compatibility with both
 * `@typescript-eslint/rule-tester`'s `RuleTester.run()` (which expects
 * `RuleModule<string, any[], unknown, RuleListener>`) and ESLint's plugin
 * shape.
 */

/**
 * Concrete ESLint rule module type returned by {@link createJsoncRule}.
 */
export type JsoncRuleModule = Rule.RuleModule;

/**
 * Full rule meta block expected by `createJsoncRule`.
 */
type JsoncRuleMeta = Except<Rule.RuleMetaData, "docs"> & {
    docs: JsoncRuleDocs;
};

const toEslintRuleListener = (
    listener: Readonly<JsoncRuleListener | Rule.RuleListener>
): Rule.RuleListener => {
    const normalized: Rule.RuleListener = {};

    for (const [selector, maybeHandler] of objectEntries(listener)) {
        if (typeof maybeHandler !== "function") {
            continue;
        }

        normalized[selector] = (
            node: Readonly<
                Parameters<NonNullable<Rule.RuleListener[string]>>[0]
            >
        ): void => {
            Reflect.apply(maybeHandler, undefined, [node]);
        };
    }

    return normalized;
};

/**
 * Create a fully assembled JSONC-based tsconfig ESLint rule.
 *
 * @param definition - Rule input definition.
 *
 * @returns A ready-to-register ESLint rule module with injected catalog
 *   metadata, typed as `JsoncRuleModule` for compatibility with
 *   `@typescript-eslint/rule-tester`.
 */
export function createJsoncRule(
    definition: Readonly<JsoncRuleDefinition>
): JsoncRuleModule {
    const { create, meta, name } = definition;

    const catalogEntry = getRuleCatalogEntryForRuleNameOrNull(name);
    const docsUrl = createRuleDocsUrl(name);

    const catalogMetadata =
        catalogEntry === null
            ? {}
            : {
                  ruleId: catalogEntry.ruleId,
                  ruleNumber: catalogEntry.ruleNumber,
              };

    const docs: JsoncRuleDocs = {
        ...meta.docs,
        ...catalogMetadata,
        url: docsUrl,
    };

    const normalizedMeta: Rule.RuleMetaData = {
        ...meta,
        docs,
    };

    return {
        create: (context) => toEslintRuleListener(create(context)),
        meta: normalizedMeta,
    };
}
