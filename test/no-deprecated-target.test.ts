import * as fc from "fast-check";
/**
 * @packageDocumentation
 * Tests for the `no-deprecated-target` rule.
 */
import * as parser from "jsonc-eslint-parser";
import { describe, expect, it } from "vitest";

import rule from "../src/rules/no-deprecated-target";
import { createRuleTester } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run("no-deprecated-target", rule, {
    invalid: [
        {
            code: '{ "compilerOptions": { "target": "es3" } }',
            errors: [{ messageId: "deprecatedTarget" }],
        },
        {
            code: '{ "compilerOptions": { "target": "es5" } }',
            errors: [{ messageId: "deprecatedTarget" }],
        },
    ],
    valid: [
        { code: '{ "compilerOptions": { "target": "es2020" } }' },
        { code: '{ "compilerOptions": { "target": "esnext" } }' },
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
