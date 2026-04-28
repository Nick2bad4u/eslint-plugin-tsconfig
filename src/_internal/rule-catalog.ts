/**
 * @packageDocumentation
 * Stable catalog IDs for all plugin rules.
 */
import { objectFromEntries, setHas } from "ts-extras";

/**
 * Catalog metadata for a single rule.
 */
export type TsconfigRuleCatalogEntry = Readonly<{
    ruleId: TsconfigRuleCatalogId;
    ruleName: TsconfigRuleNamePattern;
    ruleNumber: number;
}>;

/**
 * Stable machine-friendly rule id format (for example: `R001`).
 */
export type TsconfigRuleCatalogId = `R${string}`;

/** Pattern for unqualified rule names supported by eslint-plugin-tsconfig. */
export type TsconfigRuleNamePattern = string;

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
    "no-declaration-only-without-declaration",
    "no-disable-strict-subset",
    "no-emit-in-root-config",
    "no-esmoduleinterop-with-verbatim",
    "no-esnext-target-in-library",
    "no-include-dist",
    "no-include-node-modules",
    "no-legacy-module-resolution",
    "no-rootdir-includes-outdir",
    "no-skip-lib-check",
    "require-bundler-module-resolution",
    "require-composite-for-references",
    "require-declaration-with-composite",
    "require-downlevel-iteration-with-iterators",
    "require-exact-optional-property-types",
    "require-exclude-common-artifacts",
    "require-no-implicit-override",
    "require-no-unchecked-indexed-access",
    "require-outdir-when-emitting",
    "require-source-map-in-dev",
    "require-strict-mode",
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
    Partial<Record<string, TsconfigRuleCatalogEntry>>
> = objectFromEntries(
    tsconfigRuleCatalogEntries.map((entry) => [entry.ruleName, entry])
);

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
