/**
 * @packageDocumentation
 * Derivation helpers for canonical rule docs metadata.
 */
import type { UnknownRecord } from "type-fest";

import {
    arrayIncludes,
    arrayJoin,
    isDefined,
    isEmpty,
    isInteger,
    objectEntries,
} from "ts-extras";

import type { JsoncRuleModule } from "./jsonc-rule.js";

import { createRuleDocsUrl } from "./rule-docs-url.js";
import {
    type TsconfigConfigName,
    tsconfigConfigNames,
} from "./tsconfig-config-references.js";

/** Normalized docs metadata derived for each rule. */
export type RuleDocsMetadata = Readonly<{
    description: string;
    recommended: boolean;
    requiresTypeChecking: boolean;
    ruleId: string;
    ruleNumber: number;
    tsconfigConfigNames: readonly TsconfigConfigName[];
    url: string;
}>;

/** Rule-name keyed metadata map derived from static docs contracts. */
export type RuleDocsMetadataByName = Readonly<Record<string, RuleDocsMetadata>>;

/** Rule-map contract accepted by docs metadata derivation helpers. */
type RuleMap = Readonly<Record<string, JsoncRuleModule>>;

/**
 * Canonical docs contract required on every plugin rule.
 */
type TsconfigRuleDocsContract = Readonly<{
    description: string;
    recommended: boolean;
    requiresTypeChecking: boolean;
    ruleId: string;
    ruleNumber: number;
    tsconfigConfigs: readonly TsconfigConfigName[] | TsconfigConfigName;
    url: string;
}>;

const RULE_ID_PREFIX = "R" as const;
const RULE_ID_LENGTH = 4 as const;
const RULE_ID_DIGIT_START_INDEX = 1 as const;
const RULE_ID_DIGIT_END_INDEX = 4 as const;
const ASCII_ZERO_CODE_POINT = 48 as const;
const ASCII_NINE_CODE_POINT = 57 as const;

/**
 * Guard dynamic rule ids to the canonical `R###` identifier contract.
 */
const isRuleIdInCanonicalFormat = (value: string): boolean => {
    if (value.length !== RULE_ID_LENGTH || !value.startsWith(RULE_ID_PREFIX)) {
        return false;
    }

    for (
        let index = RULE_ID_DIGIT_START_INDEX;
        index < RULE_ID_DIGIT_END_INDEX;
        index += 1
    ) {
        const codePoint = value.codePointAt(index);

        if (!isDefined(codePoint)) {
            return false;
        }

        if (
            codePoint < ASCII_ZERO_CODE_POINT ||
            codePoint > ASCII_NINE_CODE_POINT
        ) {
            return false;
        }
    }

    return true;
};

/**
 * Guard dynamic values to object-shaped records.
 */
const isUnknownRecord = (value: unknown): value is Readonly<UnknownRecord> =>
    typeof value === "object" && value !== null && !Array.isArray(value);

/**
 * Convert rule docs `tsconfigConfigs` into a normalized, deduped config-name
 * list.
 */
const normalizeTsconfigConfigNames = (
    ruleName: string,
    tsconfigConfigs: TsconfigRuleDocsContract["tsconfigConfigs"]
): readonly TsconfigConfigName[] => {
    const candidates =
        typeof tsconfigConfigs === "string"
            ? [tsconfigConfigs]
            : [...tsconfigConfigs];

    const names: TsconfigConfigName[] = [];

    for (const candidate of candidates) {
        if (!arrayIncludes(tsconfigConfigNames, candidate)) {
            throw new TypeError(
                `Rule '${ruleName}' has invalid docs.tsconfigConfigs value '${String(candidate)}'. Must be one of: ${arrayJoin(tsconfigConfigNames, ", ")}.`
            );
        }

        if (arrayIncludes(names, candidate)) {
            continue;
        }

        names.push(candidate);
    }

    if (isEmpty(names)) {
        throw new TypeError(
            `Rule '${ruleName}' must declare at least one docs.tsconfigConfigs value.`
        );
    }

    return names;
};

/**
 * Validate and narrow dynamic `meta.docs` values to the plugin docs contract.
 */
const getRuleDocsContract = (
    ruleName: string,
    docs: unknown
): TsconfigRuleDocsContract => {
    if (!isUnknownRecord(docs)) {
        throw new TypeError(`Rule '${ruleName}' must declare meta.docs.`);
    }

    const description = docs["description"];
    const recommended = docs["recommended"];
    const requiresTypeChecking = docs["requiresTypeChecking"];
    const ruleId = docs["ruleId"];
    const ruleNumber = docs["ruleNumber"];
    const tsconfigConfigs = docs["tsconfigConfigs"];
    const url = docs["url"];

    if (typeof description !== "string" || description.trim().length === 0) {
        throw new TypeError(
            `Rule '${ruleName}' must declare a non-empty docs.description.`
        );
    }

    if (typeof url !== "string" || url.trim().length === 0) {
        throw new TypeError(
            `Rule '${ruleName}' must declare a non-empty docs.url.`
        );
    }

    const expectedRuleDocsUrl = createRuleDocsUrl(ruleName);
    if (url !== expectedRuleDocsUrl) {
        throw new TypeError(
            `Rule '${ruleName}' must declare docs.url as '${expectedRuleDocsUrl}'.`
        );
    }

    if (typeof recommended !== "boolean") {
        throw new TypeError(
            `Rule '${ruleName}' must declare boolean docs.recommended.`
        );
    }

    if (typeof requiresTypeChecking !== "boolean") {
        throw new TypeError(
            `Rule '${ruleName}' must declare boolean docs.requiresTypeChecking.`
        );
    }

    if (
        typeof ruleId !== "string" ||
        !isRuleIdInCanonicalFormat(ruleId) ||
        ruleId.trim().length === 0
    ) {
        throw new TypeError(
            `Rule '${ruleName}' must declare docs.ruleId using the 'R###' format.`
        );
    }

    if (
        typeof ruleNumber !== "number" ||
        !isInteger(ruleNumber) ||
        ruleNumber < 1
    ) {
        throw new TypeError(
            `Rule '${ruleName}' must declare positive integer docs.ruleNumber.`
        );
    }

    if (typeof tsconfigConfigs === "string") {
        if (!arrayIncludes(tsconfigConfigNames, tsconfigConfigs)) {
            throw new TypeError(
                `Rule '${ruleName}' has invalid docs.tsconfigConfigs value '${tsconfigConfigs}'. Must be one of: ${arrayJoin(tsconfigConfigNames, ", ")}.`
            );
        }

        return {
            description,
            recommended,
            requiresTypeChecking,
            ruleId,
            ruleNumber,
            tsconfigConfigs,
            url,
        };
    }

    if (!Array.isArray(tsconfigConfigs)) {
        throw new TypeError(
            `Rule '${ruleName}' must declare docs.tsconfigConfigs as a config name or array.`
        );
    }

    const normalizedTsconfigConfigs: TsconfigConfigName[] = [];

    for (const candidate of tsconfigConfigs) {
        if (
            typeof candidate !== "string" ||
            !arrayIncludes(tsconfigConfigNames, candidate)
        ) {
            throw new TypeError(
                `Rule '${ruleName}' has invalid docs.tsconfigConfigs value '${String(candidate)}'. Must be one of: ${arrayJoin(tsconfigConfigNames, ", ")}.`
            );
        }

        normalizedTsconfigConfigs.push(candidate);
    }

    return {
        description,
        recommended,
        requiresTypeChecking,
        ruleId,
        ruleNumber,
        tsconfigConfigs: normalizedTsconfigConfigs,
        url,
    };
};

/**
 * Derive normalized docs metadata for all plugin rules.
 */
export const deriveRuleDocsMetadataByName = (
    rules: RuleMap
): RuleDocsMetadataByName => {
    const metadataByRuleName: Record<string, RuleDocsMetadata> = {};

    for (const [ruleName, ruleModule] of objectEntries(rules)) {
        const ruleDocs = getRuleDocsContract(ruleName, ruleModule.meta?.docs);
        const configNames = normalizeTsconfigConfigNames(
            ruleName,
            ruleDocs.tsconfigConfigs
        );

        metadataByRuleName[ruleName] = {
            description: ruleDocs.description,
            recommended: ruleDocs.recommended,
            requiresTypeChecking: ruleDocs.requiresTypeChecking,
            ruleId: ruleDocs.ruleId,
            ruleNumber: ruleDocs.ruleNumber,
            tsconfigConfigNames: configNames,
            url: ruleDocs.url,
        };
    }

    return metadataByRuleName;
};

/**
 * Derive a typed-rule set from normalized docs metadata.
 */
export const deriveTypeCheckedRuleNameSet = (
    ruleDocsMetadataByName: RuleDocsMetadataByName
): ReadonlySet<string> => {
    const ruleNames: string[] = [];

    for (const [ruleName, metadata] of objectEntries(ruleDocsMetadataByName)) {
        if (!metadata.requiresTypeChecking) {
            continue;
        }

        ruleNames.push(ruleName);
    }

    return new Set(ruleNames);
};

/**
 * Derive canonical preset-membership map from normalized docs metadata.
 */
export const deriveRulePresetMembershipByRuleName = (
    ruleDocsMetadataByName: RuleDocsMetadataByName
): Readonly<Record<string, readonly TsconfigConfigName[]>> => {
    const membershipByRuleName: Record<string, readonly TsconfigConfigName[]> =
        {};

    for (const [ruleName, metadata] of objectEntries(ruleDocsMetadataByName)) {
        membershipByRuleName[ruleName] = metadata.tsconfigConfigNames;
    }

    if (isEmpty(objectEntries(membershipByRuleName))) {
        throw new TypeError(
            "Rule metadata derivation produced no membership entries."
        );
    }

    return membershipByRuleName;
};
