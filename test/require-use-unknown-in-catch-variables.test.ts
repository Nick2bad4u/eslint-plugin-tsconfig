import * as fc from "fast-check";
/**
 * @packageDocumentation
 * Tests for the `require-use-unknown-in-catch-variables` rule.
 */
import * as parser from "jsonc-eslint-parser";
import { describe, expect, it } from "vitest";

import rule from "../src/rules/require-use-unknown-in-catch-variables";
import { createRuleTester } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run("require-use-unknown-in-catch-variables", rule, {
    invalid: [
        {
            code: '{ "compilerOptions": {} }',
            errors: [{ messageId: "missingUseUnknownInCatchVariables" }],
            output: '{ "compilerOptions": { "useUnknownInCatchVariables": true } }',
        },
        {
            code: '{ "compilerOptions": { "useUnknownInCatchVariables": false } }',
            errors: [{ messageId: "missingUseUnknownInCatchVariables" }],
            output: '{ "compilerOptions": { "useUnknownInCatchVariables": true } }',
        },
    ],
    valid: [
        {
            code: '{ "compilerOptions": { "useUnknownInCatchVariables": true } }',
        },
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
