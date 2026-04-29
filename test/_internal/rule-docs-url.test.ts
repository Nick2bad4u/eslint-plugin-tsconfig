import { describe, expect, it } from "vitest";

import {
    createRuleDocsUrl,
    RULE_DOCS_URL_BASE,
} from "../../src/_internal/rule-docs-url";

describe("rule-docs-url", () => {
    it("uses the canonical docs base URL", () => {
        expect.hasAssertions();
        expect.hasAssertions();
        expect(RULE_DOCS_URL_BASE).toBe(
            "https://nick2bad4u.github.io/eslint-plugin-tsconfig/docs/rules/"
        );
    });

    it("builds canonical docs URL for known rule ids", () => {
        expect.hasAssertions();
        expect.hasAssertions();
        expect(createRuleDocsUrl("require-strict-mode")).toBe(
            `${RULE_DOCS_URL_BASE}require-strict-mode`
        );
    });

    it("concatenates rule names without altering the provided suffix", () => {
        expect.hasAssertions();
        expect.hasAssertions();

        const opaqueRuleName = "internal-ad-hoc-rule";

        expect(createRuleDocsUrl(opaqueRuleName)).toBe(
            `${RULE_DOCS_URL_BASE}${opaqueRuleName}`
        );
    });
});
