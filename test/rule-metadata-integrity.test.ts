/**
 * @packageDocumentation
 * Strong contract tests for required rule metadata across all registered rules.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { arrayIncludes, objectEntries } from "ts-extras";
import { describe, expect, it } from "vitest";

import { getRuleCatalogEntryForRuleName } from "../src/_internal/rule-catalog";
import { createRuleDocsUrl } from "../src/_internal/rule-docs-url";
import { tsconfigConfigNames } from "../src/_internal/tsconfig-config-references";
import tsconfigPlugin from "../src/plugin";

/** Allowed ESLint `meta.type` values for plugin rules. */
const expectedRuleTypes = new Set(["layout", "problem", "suggestion"]);

/** Stable rule-catalog id format used in docs metadata. */
const ruleCatalogIdPattern = /^R\d{3}$/v;

/** Check whether a value is a non-empty trimmed string. */
const isNonEmptyString = (value: unknown): value is string =>
    typeof value === "string" && value.trim().length > 0;

/** Guard unknown values to object-shaped records. */
const isRecord = (value: unknown): value is Readonly<Record<string, unknown>> =>
    typeof value === "object" && value !== null;

/**
 * Read all rule source file names from `src/rules`.
 */
const getRuleSourceFileNames = (): readonly string[] => {
    const rulesDirectory = path.join(process.cwd(), "src", "rules");
    return fs
        .readdirSync(rulesDirectory)
        .filter((entry) => entry.endsWith(".ts"))
        .map((entry) => entry.replace(/\.ts$/v, ""))
        .toSorted((left, right) => left.localeCompare(right));
};

/**
 * Normalize `meta.docs.tsconfigConfigs` into a string array for assertions.
 */
const normalizeTsconfigConfigNames = (
    tsconfigConfigs: unknown
): readonly string[] => {
    if (typeof tsconfigConfigs === "string") {
        return [tsconfigConfigs];
    }

    if (!Array.isArray(tsconfigConfigs)) {
        return [];
    }

    const names: string[] = [];
    for (const name of tsconfigConfigs) {
        if (typeof name === "string") {
            names.push(name);
        }
    }
    return names;
};

/**
 * Convert a rule-number set into an ascending numeric list.
 */
const getSortedRuleNumberValues = (
    values: ReadonlySet<number>
): readonly number[] => {
    const sortedValues: number[] = [];
    for (const value of values) {
        sortedValues.push(value);
    }
    sortedValues.sort((left, right) => left - right);
    return sortedValues;
};

/**
 * Read canonical catalog numbers for the currently registered rules.
 */
const getExpectedRegisteredRuleNumbers = (
    ruleNames: readonly string[]
): readonly number[] =>
    ruleNames
        .map((ruleName) => getRuleCatalogEntryForRuleName(ruleName).ruleNumber)
        .toSorted((left, right) => left - right);

/**
 * Read and validate one rule module as an object record.
 */
const getRuleRecord = (
    ruleName: string,
    ruleModule: unknown
): Readonly<Record<string, unknown>> => {
    expect(
        isRecord(ruleModule),
        `Rule '${ruleName}' must export an object`
    ).toBeTruthy();
    return isRecord(ruleModule) ? ruleModule : {};
};

/**
 * Read and validate one rule's `meta` object.
 */
const getRuleMetaRecord = (
    ruleName: string,
    ruleRecord: Readonly<Record<string, unknown>>
): Readonly<Record<string, unknown>> => {
    const meta = ruleRecord["meta"];
    expect(isRecord(meta), `Rule '${ruleName}' must define meta`).toBeTruthy();
    return isRecord(meta) ? meta : {};
};

/**
 * Read and validate one rule's docs metadata contract.
 */
const getRuleDocsRecord = (
    ruleName: string,
    metaRecord: Readonly<Record<string, unknown>>
): Readonly<Record<string, unknown>> => {
    const docs = metaRecord["docs"];
    expect(
        isRecord(docs),
        `Rule '${ruleName}' must define meta.docs`
    ).toBeTruthy();
    return isRecord(docs) ? docs : {};
};

/**
 * Assert docs metadata and preset-membership invariants for one rule.
 */
const assertDocsContract = ({
    docsRecord,
    ruleName,
}: Readonly<{
    docsRecord: Readonly<Record<string, unknown>>;
    ruleName: string;
}>): void => {
    const description = docsRecord["description"];
    const recommended = docsRecord["recommended"];
    const requiresTypeChecking = docsRecord["requiresTypeChecking"];
    const ruleId = docsRecord["ruleId"];
    const ruleNumber = docsRecord["ruleNumber"];
    const tsconfigConfigs = docsRecord["tsconfigConfigs"];
    const url = docsRecord["url"];

    expect(
        isNonEmptyString(description),
        `Rule '${ruleName}' must provide a non-empty docs.description`
    ).toBeTruthy();
    expect(
        typeof recommended === "boolean",
        `Rule '${ruleName}' must provide boolean docs.recommended`
    ).toBeTruthy();
    expect(
        requiresTypeChecking === false,
        `Rule '${ruleName}' must have docs.requiresTypeChecking: false (JSONC rules never need type checking)`
    ).toBeTruthy();
    expect(
        typeof ruleId === "string" && ruleCatalogIdPattern.test(ruleId),
        `Rule '${ruleName}' must provide docs.ruleId in 'R###' format`
    ).toBeTruthy();
    expect(
        Number.isInteger(ruleNumber) &&
            typeof ruleNumber === "number" &&
            ruleNumber > 0,
        `Rule '${ruleName}' must provide positive integer docs.ruleNumber`
    ).toBeTruthy();
    expect(
        isNonEmptyString(url),
        `Rule '${ruleName}' must provide a non-empty docs.url`
    ).toBeTruthy();

    if (
        !isNonEmptyString(url) ||
        typeof recommended !== "boolean" ||
        typeof ruleId !== "string" ||
        typeof ruleNumber !== "number"
    ) {
        return;
    }

    expect(ruleId).toBe(`R${String(ruleNumber).padStart(3, "0")}`);

    const expectedRuleUrl = createRuleDocsUrl(ruleName);
    expect(url).toBe(expectedRuleUrl);

    const docsPath = path.join(
        process.cwd(),
        "docs",
        "rules",
        `${ruleName}.md`
    );
    expect(fs.existsSync(docsPath)).toBeTruthy();

    const configNames = normalizeTsconfigConfigNames(tsconfigConfigs);

    expect(
        configNames.length > 0,
        `Rule '${ruleName}' must declare at least one docs.tsconfigConfigs entry`
    ).toBeTruthy();
    expect(configNames).toHaveLength(new Set(configNames).size);

    for (const configName of configNames) {
        expect(
            arrayIncludes(tsconfigConfigNames, configName),
            `Rule '${ruleName}' has invalid docs.tsconfigConfigs value '${configName}'`
        ).toBeTruthy();
    }

    const includesRecommended = configNames.includes("recommended");
    expect(recommended).toBe(includesRecommended);
};

/**
 * Assert base rule metadata contract shared by every plugin rule.
 */
const assertBaseRuleMetadataContract = ({
    metaRecord,
    ruleName,
}: Readonly<{
    metaRecord: Readonly<Record<string, unknown>>;
    ruleName: string;
}>): void => {
    const type = metaRecord["type"];
    const schema = metaRecord["schema"];

    expect(
        isNonEmptyString(type) && expectedRuleTypes.has(type),
        `Rule '${ruleName}' has unsupported meta.type '${String(type)}'`
    ).toBeTruthy();
    expect(
        Array.isArray(schema),
        `Rule '${ruleName}' must declare a schema array`
    ).toBeTruthy();
};

/**
 * Assert message and fix/suggestion metadata consistency.
 */
const assertMessageAndFixContract = ({
    metaRecord,
    ruleName,
}: Readonly<{
    metaRecord: Readonly<Record<string, unknown>>;
    ruleName: string;
}>): void => {
    const messages = metaRecord["messages"];

    expect(
        isRecord(messages),
        `Rule '${ruleName}' must define a messages record`
    ).toBeTruthy();

    if (!isRecord(messages)) {
        return;
    }

    const messageEntries = objectEntries(messages);

    expect(
        messageEntries.length,
        `Rule '${ruleName}' must define at least one message`
    ).toBeGreaterThan(0);

    for (const [messageId, messageTemplate] of messageEntries) {
        expect(
            isNonEmptyString(messageTemplate),
            `Rule '${ruleName}' message '${messageId}' must be a non-empty string`
        ).toBeTruthy();
    }

    const fixable = metaRecord["fixable"];
    if (fixable !== undefined) {
        expect(fixable).toBe("code");
    }
};

describe("rule metadata integrity", () => {
    it("exports processors for plugin shape parity", () => {
        expect.hasAssertions();
        expect(tsconfigPlugin).toHaveProperty("processors");
        expect(tsconfigPlugin.processors).toStrictEqual({});
    });

    it("keeps src/rules file names in sync with registered rule names", () => {
        expect.hasAssertions();

        const registeredRuleNames = Object.keys(tsconfigPlugin.rules).toSorted(
            (left, right) => left.localeCompare(right)
        );

        expect(getRuleSourceFileNames()).toStrictEqual(registeredRuleNames);
    });

    it("enforces required metadata invariants for every rule", () => {
        expect.hasAssertions();

        const ruleEntries = objectEntries(tsconfigPlugin.rules);
        const seenRuleIds = new Set<string>();
        const seenRuleNumbers = new Set<number>();

        expect(ruleEntries.length).toBeGreaterThan(0);

        for (const [ruleName, ruleModule] of ruleEntries) {
            const ruleRecord = getRuleRecord(ruleName, ruleModule);
            const metaRecord = getRuleMetaRecord(ruleName, ruleRecord);
            const docsRecord = getRuleDocsRecord(ruleName, metaRecord);

            assertBaseRuleMetadataContract({ metaRecord, ruleName });
            assertDocsContract({ docsRecord, ruleName });
            assertMessageAndFixContract({ metaRecord, ruleName });

            const docsRuleId = docsRecord["ruleId"];
            const docsRuleNumber = docsRecord["ruleNumber"];

            if (typeof docsRuleId === "string") {
                seenRuleIds.add(docsRuleId);
            }
            if (typeof docsRuleNumber === "number") {
                seenRuleNumbers.add(docsRuleNumber);
            }
        }

        expect(seenRuleIds.size).toBe(ruleEntries.length);
        expect(seenRuleNumbers.size).toBe(ruleEntries.length);
        expect(getSortedRuleNumberValues(seenRuleNumbers)).toStrictEqual(
            getExpectedRegisteredRuleNumbers(
                ruleEntries.map(([ruleName]) => ruleName)
            )
        );
    });
});
