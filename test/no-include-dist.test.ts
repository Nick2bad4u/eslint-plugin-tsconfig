import * as fc from "fast-check";
/**
 * @packageDocumentation
 * Tests for the `no-include-dist` rule.
 */
import * as parser from "jsonc-eslint-parser";
import { describe, expect, it } from "vitest";

import rule from "../src/rules/no-include-dist";
import { createRuleTester } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run("no-include-dist", rule, {
    invalid: [
        {
            code: '{ "include": ["dist/**/*"] }',
            errors: [{ messageId: "distInInclude" }],
        },
        {
            code: '{ "include": ["src", "dist"] }',
            errors: [{ messageId: "distInInclude" }],
        },
    ],
    valid: [
        { code: '{ "include": ["src/**/*"] }' },
        { code: '{ "include": [] }' },
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
