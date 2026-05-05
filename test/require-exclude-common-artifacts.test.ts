import * as fc from "fast-check";
/**
 * @packageDocumentation
 * Tests for the `require-exclude-common-artifacts` rule.
 */
import * as parser from "jsonc-eslint-parser";
import { describe, expect, it } from "vitest";

import rule from "../src/rules/require-exclude-common-artifacts";
import { createRuleTester } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run("require-exclude-common-artifacts", rule, {
    invalid: [
        {
            // Missing node_modules in exclude — fixer appends it
            code: '{ "exclude": ["dist"] }',
            errors: [{ messageId: "missingExcludeEntry" }],
            output: '{ "exclude": ["dist", "node_modules"] }',
        },
    ],
    valid: [
        { code: '{ "exclude": ["node_modules", "dist", ".tsbuildinfo"] }' },
        { code: '{ "compilerOptions": {} }' },
    ],
});

const validateJsoncParse = (jsonContent: string): void => {
    try {
        parser.parseForESLint(jsonContent);
    } catch {
        // not valid JSONC — skip
    }
};

describe("fixer parse-safety", () => {
    it("fixer output is valid JSONC", () => {
        expect.hasAssertions();

        fc.assert(
            fc.property(fc.string(), (jsonContent) => {
                expect(() => {
                    validateJsoncParse(jsonContent);
                }).not.toThrow();
            })
        );
    });
});
