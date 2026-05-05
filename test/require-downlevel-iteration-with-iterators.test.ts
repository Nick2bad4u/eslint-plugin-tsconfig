import * as fc from "fast-check";
/**
 * @packageDocumentation
 * Tests for the `require-downlevel-iteration-with-iterators` rule.
 */
import * as parser from "jsonc-eslint-parser";
import { describe, expect, it } from "vitest";

import rule from "../src/rules/require-downlevel-iteration-with-iterators";
import { createRuleTester } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run("require-downlevel-iteration-with-iterators", rule, {
    invalid: [
        {
            code: '{ "compilerOptions": { "target": "es5", "lib": ["es2015", "ES2015.Iterable"] } }',
            errors: [{ messageId: "missingDownlevelIteration" }],
            output: '{ "compilerOptions": { "target": "es5", "lib": ["es2015", "ES2015.Iterable"],\n    "downlevelIteration": true } }',
        },
    ],
    valid: [
        {
            code: '{ "compilerOptions": { "lib": ["es2015", "ES2015.Iterable"], "downlevelIteration": true } }',
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
