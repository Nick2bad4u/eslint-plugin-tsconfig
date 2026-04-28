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
import type { TSESLint } from "@typescript-eslint/utils";
import type { RuleListener } from "jsonc-eslint-parser";

/**
 * The public module type for a JSONC-based tsconfig ESLint rule.
 *
 * @remarks
 * Using `TSESLint.RuleModule` ensures structural compatibility with
 * `@typescript-eslint/rule-tester`'s `RuleTester.run()` method while staying
 * compatible with ESLint's plugin shape.
 */
export type JsoncRuleModule = TSESLint.RuleModule<string, readonly unknown[]>;

import type { TsconfigConfigName } from "./tsconfig-config-references.js";

import { getRuleCatalogEntryForRuleNameOrNull } from "./rule-catalog.js";
import { createRuleDocsUrl } from "./rule-docs-url.js";

/**
 * Typed `meta.docs` block required on every JSONC rule in this plugin.
 */
export type JsoncRuleDocs = {
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
     * Canonical docs page URL (injected automatically by `createJsoncRule`).
     *
     * @remarks
     * Do not set this manually; it will be overwritten with the canonical value
     * derived from `meta.name`.
     */
    url?: string;

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
};

/**
 * Full rule meta block expected by `createJsoncRule`.
 */
type JsoncRuleMeta = Omit<Rule.RuleMetaData, "docs"> & {
    docs: JsoncRuleDocs;
};

/**
 * Input definition passed to `createJsoncRule`.
 */
export type JsoncRuleDefinition = {
    /** Rule name matching the key in `rules-registry.ts`. */
    name: string;

    /** ESLint rule metadata. */
    meta: JsoncRuleMeta;

    /**
     * Rule factory function receiving the ESLint rule context and returning a
     * JSONC-aware node listener map.
     */
    create: (context: Rule.RuleContext) => RuleListener;
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
    definition: JsoncRuleDefinition
): JsoncRuleModule {
    const { name, meta, create } = definition;

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

    // Cast through unknown: the eslint Rule.RuleModule shape is structurally
    // compatible at runtime, but the @typescript-eslint/utils generic
    // RuleModule type uses a different RuleContext generic signature.
    return {
        meta: {
            ...meta,
            docs,
        },
        create: (context: Rule.RuleContext) =>
            create(context) as unknown as Rule.RuleListener,
    } as unknown as JsoncRuleModule;
}
