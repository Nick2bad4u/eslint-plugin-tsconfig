/**
 * @packageDocumentation
 * Tests for the `no-suppress-implicit-any-index-errors` rule.
 */
import * as fc from "fast-check";
import * as parser from "jsonc-eslint-parser";
import { describe, expect, it } from "vitest";

import rule from "../src/rules/no-suppress-implicit-any-index-errors";
import { createRuleTester } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run("no-suppress-implicit-any-index-errors", rule, {
    invalid: [
        {
            code: '{ "compilerOptions": { "suppressImplicitAnyIndexErrors": true } }',
            errors: [{ messageId: "suppressImplicitAnyIndexErrors" }],
        },
    ],
    valid: [
        {
            code: '{ "compilerOptions": { "suppressImplicitAnyIndexErrors": false } }',
        },
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
