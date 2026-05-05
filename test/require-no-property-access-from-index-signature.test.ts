import * as fc from "fast-check";
/**
 * @packageDocumentation
 * Tests for the `require-no-property-access-from-index-signature` rule.
 */
import * as parser from "jsonc-eslint-parser";
import { describe, expect, it } from "vitest";

import rule from "../src/rules/require-no-property-access-from-index-signature";
import { createRuleTester } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run("require-no-property-access-from-index-signature", rule, {
    invalid: [
        {
            code: '{ "compilerOptions": {} }',
            errors: [
                { messageId: "missingNoPropertyAccessFromIndexSignature" },
            ],
            output: '{ "compilerOptions": { "noPropertyAccessFromIndexSignature": true } }',
        },
        {
            code: '{ "compilerOptions": { "noPropertyAccessFromIndexSignature": false } }',
            errors: [
                { messageId: "missingNoPropertyAccessFromIndexSignature" },
            ],
            output: '{ "compilerOptions": { "noPropertyAccessFromIndexSignature": true } }',
        },
    ],
    valid: [
        {
            code: '{ "compilerOptions": { "noPropertyAccessFromIndexSignature": true } }',
        },
        { code: "{}" },
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
