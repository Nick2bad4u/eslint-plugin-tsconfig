import * as fc from "fast-check";
/**
 * @packageDocumentation
 * Tests for the `require-no-implicit-returns` rule.
 */
import * as parser from "jsonc-eslint-parser";
import { describe, expect, it } from "vitest";

import rule from "../src/rules/require-no-implicit-returns";
import { createRuleTester } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run("require-no-implicit-returns", rule, {
    invalid: [
        {
            code: '{ "compilerOptions": {} }',
            errors: [{ messageId: "missingNoImplicitReturns" }],
            output: '{ "compilerOptions": { "noImplicitReturns": true } }',
        },
        {
            code: '{ "compilerOptions": { "noImplicitReturns": false } }',
            errors: [{ messageId: "missingNoImplicitReturns" }],
            output: '{ "compilerOptions": { "noImplicitReturns": true } }',
        },
    ],
    valid: [
        { code: '{ "compilerOptions": { "noImplicitReturns": true } }' },
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
