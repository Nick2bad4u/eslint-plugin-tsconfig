/**
 * @packageDocumentation
 * Stable catalog IDs for all plugin rules.
 */
import { setHas } from "ts-extras";

/**
 * Catalog metadata for a single rule.
 */
export type TsconfigRuleCatalogEntry = Readonly<{
    ruleId: TsconfigRuleCatalogId;
    ruleName: string;
    ruleNumber: number;
}>;

/**
 * Stable machine-friendly rule id format (for example: `R001`).
 */
export type TsconfigRuleCatalogId = `R${string}`;

/**
 * Stable global ordering used for rule catalog IDs.
 *
 * @remarks
 * Append new rules to preserve existing IDs.
 */
const orderedRuleNames = [
    "consistent-incremental-with-tsbuildinfo",
    "consistent-module-resolution",
    "consistent-target-and-lib",
    "no-allowjs-without-checkjs",
    "no-declaration-only-without-declaration",
    "no-deprecated-target",
    "no-disable-strict-subset",
    "no-emit-in-root-config",
    "no-esmoduleinterop-with-verbatim",
    "no-esnext-target-in-library",
    "no-include-dist",
    "no-include-node-modules",
    "no-inline-source-map",
    "no-legacy-module-detection",
    "no-legacy-module-resolution",
    "no-rootdir-includes-outdir",
    "no-skip-lib-check",
    "no-suppress-implicit-any-index-errors",
    "require-bundler-module-resolution",
    "require-composite-for-references",
    "require-declaration-map",
    "require-declaration-with-composite",
    "require-downlevel-iteration-with-iterators",
    "require-exact-optional-property-types",
    "require-exclude-common-artifacts",
    "require-force-consistent-casing-in-file-names",
    "require-isolated-declarations",
    "require-isolated-modules",
    "require-no-fallthrough-cases-in-switch",
    "require-no-implicit-override",
    "require-no-implicit-returns",
    "require-no-property-access-from-index-signature",
    "require-no-unchecked-indexed-access",
    "require-no-unused-locals",
    "require-no-unused-parameters",
    "require-outdir-when-emitting",
    "require-source-map-in-dev",
    "require-strict-mode",
    "require-use-unknown-in-catch-variables",
    "require-verbatim-module-syntax",
] as const satisfies readonly string[];

const toRuleCatalogId = (ruleNumber: number): TsconfigRuleCatalogId =>
    `R${String(ruleNumber).padStart(3, "0")}`;

/**
 * Canonical catalog metadata entries in stable display/order form.
 */
export const tsconfigRuleCatalogEntries: readonly TsconfigRuleCatalogEntry[] =
    orderedRuleNames.map((ruleName, index) => {
        const ruleNumber = index + 1;

        return {
            ruleId: toRuleCatalogId(ruleNumber),
            ruleName,
            ruleNumber,
        };
    });

/**
 * Fast lookup map for rule catalog metadata by rule name.
 */
export const tsconfigRuleCatalogByRuleName: Readonly<
    Record<string, TsconfigRuleCatalogEntry>
> = (() => {
    const byRuleName: Record<string, TsconfigRuleCatalogEntry> = {};

    for (const entry of tsconfigRuleCatalogEntries) {
        byRuleName[entry.ruleName] = entry;
    }

    return byRuleName;
})();

/**
 * Resolve stable catalog metadata for a rule name when available.
 *
 * @param ruleName - Rule name to look up.
 *
 * @returns Catalog entry or `null` when not found.
 */
export const getRuleCatalogEntryForRuleNameOrNull = (
    ruleName: string
): null | TsconfigRuleCatalogEntry =>
    tsconfigRuleCatalogByRuleName[ruleName] ?? null;

/**
 * Resolve stable catalog metadata for a rule name.
 *
 * @param ruleName - Rule name to look up.
 *
 * @throws When the rule is missing from the catalog.
 */
export const getRuleCatalogEntryForRuleName = (
    ruleName: string
): TsconfigRuleCatalogEntry => {
    const catalogEntry = getRuleCatalogEntryForRuleNameOrNull(ruleName);

    if (catalogEntry === null) {
        throw new TypeError(
            `Rule '${ruleName}' is missing from the stable rule catalog.`
        );
    }

    return catalogEntry;
};

/**
 * Resolve stable catalog metadata by rule id.
 */
export const tsconfigRuleCatalogByRuleId: ReadonlyMap<
    TsconfigRuleCatalogId,
    TsconfigRuleCatalogEntry
> = new Map(tsconfigRuleCatalogEntries.map((entry) => [entry.ruleId, entry]));

/**
 * Resolve stable catalog metadata for a catalog id.
 */
export const getRuleCatalogEntryForRuleId = (
    ruleId: TsconfigRuleCatalogId
): TsconfigRuleCatalogEntry | undefined =>
    tsconfigRuleCatalogByRuleId.get(ruleId);

/**
 * Validate that catalog IDs are unique and sequential.
 */
export const validateRuleCatalogIntegrity = (): boolean => {
    const entries = tsconfigRuleCatalogEntries;
    const seenRuleIds = new Set<TsconfigRuleCatalogId>();

    for (const [index, entry] of entries.entries()) {
        if (setHas(seenRuleIds, entry.ruleId)) {
            return false;
        }

        seenRuleIds.add(entry.ruleId);

        const expectedRuleNumber = index + 1;
        if (entry.ruleNumber !== expectedRuleNumber) {
            return false;
        }

        if (entry.ruleId !== toRuleCatalogId(expectedRuleNumber)) {
            return false;
        }
    }

    return true;
};
