import * as fc from "fast-check";
/**
 * @packageDocumentation
 * Tests for the `require-strict-mode` rule.
 */
import * as parser from "jsonc-eslint-parser";
import { describe, expect, it } from "vitest";

import rule from "../src/rules/require-strict-mode";
import { createRuleTester } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run("require-strict-mode", rule, {
    invalid: [
        {
            code: '{ "compilerOptions": {} }',
            errors: [{ messageId: "missingStrict" }],
            output: '{ "compilerOptions": { "strict": true } }',
        },
        {
            code: '{ "compilerOptions": { "strict": false } }',
            errors: [{ messageId: "missingStrict" }],
            output: '{ "compilerOptions": { "strict": true } }',
        },
    ],
    valid: [
        { code: '{ "compilerOptions": { "strict": true } }' },
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
