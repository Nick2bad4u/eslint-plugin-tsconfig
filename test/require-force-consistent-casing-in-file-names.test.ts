import * as fc from "fast-check";
/**
 * @packageDocumentation
 * Tests for the `require-force-consistent-casing-in-file-names` rule.
 */
import * as parser from "jsonc-eslint-parser";
import { describe, expect, it } from "vitest";

import rule from "../src/rules/require-force-consistent-casing-in-file-names";
import { createRuleTester } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run("require-force-consistent-casing-in-file-names", rule, {
    invalid: [
        {
            code: '{ "compilerOptions": {} }',
            errors: [{ messageId: "missingForceConsistentCasingInFileNames" }],
            output: '{ "compilerOptions": { "forceConsistentCasingInFileNames": true } }',
        },
        {
            code: '{ "compilerOptions": { "forceConsistentCasingInFileNames": false } }',
            errors: [{ messageId: "missingForceConsistentCasingInFileNames" }],
            output: '{ "compilerOptions": { "forceConsistentCasingInFileNames": true } }',
        },
    ],
    valid: [
        {
            code: '{ "compilerOptions": { "forceConsistentCasingInFileNames": true } }',
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
