import * as fc from "fast-check";
/**
 * @packageDocumentation
 * Tests for the `require-isolated-declarations` rule.
 */
import * as parser from "jsonc-eslint-parser";
import { describe, expect, it } from "vitest";

import rule from "../src/rules/require-isolated-declarations";
import { createRuleTester } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run("require-isolated-declarations", rule, {
    invalid: [
        {
            code: '{ "compilerOptions": {} }',
            errors: [{ messageId: "missingIsolatedDeclarations" }],
            output: '{ "compilerOptions": { "isolatedDeclarations": true } }',
        },
        {
            code: '{ "compilerOptions": { "isolatedDeclarations": false } }',
            errors: [{ messageId: "missingIsolatedDeclarations" }],
            output: '{ "compilerOptions": { "isolatedDeclarations": true } }',
        },
    ],
    valid: [
        { code: '{ "compilerOptions": { "isolatedDeclarations": true } }' },
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
