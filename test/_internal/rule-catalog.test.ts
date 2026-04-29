import { arrayAt, assertDefined, objectKeys } from "ts-extras";
import { describe, expect, it } from "vitest";

import {
    getRuleCatalogEntryForRuleId,
    getRuleCatalogEntryForRuleName,
    getRuleCatalogEntryForRuleNameOrNull,
    tsconfigRuleCatalogEntries,
    validateRuleCatalogIntegrity,
} from "../../src/_internal/rule-catalog";
import tsconfigRules from "../../src/_internal/rules-registry";

interface MutableRuleCatalogEntry {
    ruleId: `R${string}`;
    ruleName: string;
    ruleNumber: number;
}

const withMutatedCatalogEntry = (
    index: number,
    patch: Readonly<Partial<MutableRuleCatalogEntry>>,
    assertion: () => void
): void => {
    const mutableEntries =
        tsconfigRuleCatalogEntries as unknown as MutableRuleCatalogEntry[];
    const originalEntry = arrayAt(mutableEntries, index);
    assertDefined(originalEntry);

    mutableEntries[index] = {
        ...originalEntry,
        ...patch,
    };

    try {
        assertion();
    } finally {
        mutableEntries[index] = originalEntry;
    }
};

describe("rule-catalog", () => {
    it("contains every runtime rule", () => {
        expect.hasAssertions();
        expect.hasAssertions();

        const catalogRuleNames = tsconfigRuleCatalogEntries
            .map((entry) => entry.ruleName)
            .toSorted((left, right) => left.localeCompare(right));
        const registryRuleNames = objectKeys(tsconfigRules).toSorted(
            (left, right) => left.localeCompare(right)
        );

        expect(catalogRuleNames).toStrictEqual(
            expect.arrayContaining(registryRuleNames)
        );
        expect(tsconfigRuleCatalogEntries).toHaveLength(
            registryRuleNames.length
        );
    });

    it("resolves known entries by rule name and id", () => {
        expect.hasAssertions();
        expect.hasAssertions();

        const byName = getRuleCatalogEntryForRuleName(
            "consistent-incremental-with-tsbuildinfo"
        );
        const byId = getRuleCatalogEntryForRuleId("R001");

        expect(byName.ruleId).toBe("R001");
        expect(byName.ruleNumber).toBe(1);
        expect(byName.ruleName).toBe("consistent-incremental-with-tsbuildinfo");
        expect(byId).toStrictEqual(byName);
    });

    it("returns null for non-catalog rule names", () => {
        expect.hasAssertions();
        expect.hasAssertions();
        expect(getRuleCatalogEntryForRuleNameOrNull("unknown-rule")).toBeNull();
    });

    it("throws for unknown rule names in strict lookup", () => {
        expect.hasAssertions();
        expect.hasAssertions();
        expect(() => getRuleCatalogEntryForRuleName("unknown-rule")).toThrow(
            /missing from the stable rule catalog/v
        );
    });

    it("returns undefined for unknown rule ids", () => {
        expect.hasAssertions();
        expect.hasAssertions();
        expect(getRuleCatalogEntryForRuleId("R999")).toBeUndefined();
    });

    it("reports valid baseline catalog integrity", () => {
        expect.hasAssertions();
        expect.hasAssertions();
        expect(validateRuleCatalogIntegrity()).toBeTruthy();
    });

    it("detects duplicate rule ids", () => {
        expect.hasAssertions();
        expect.hasAssertions();

        const firstEntry = arrayAt(tsconfigRuleCatalogEntries, 0);
        assertDefined(firstEntry);

        withMutatedCatalogEntry(
            1,
            {
                ruleId: firstEntry.ruleId,
            },
            () => {
                expect(validateRuleCatalogIntegrity()).toBeFalsy();
            }
        );
    });

    it("detects out-of-sequence rule numbers", () => {
        expect.hasAssertions();
        expect.hasAssertions();

        withMutatedCatalogEntry(
            0,
            {
                ruleNumber: 99,
            },
            () => {
                expect(validateRuleCatalogIntegrity()).toBeFalsy();
            }
        );
    });

    it("detects mismatched rule ids for a valid index", () => {
        expect.hasAssertions();
        expect.hasAssertions();

        withMutatedCatalogEntry(
            0,
            {
                ruleId: "R999",
            },
            () => {
                expect(validateRuleCatalogIntegrity()).toBeFalsy();
            }
        );
    });
});
