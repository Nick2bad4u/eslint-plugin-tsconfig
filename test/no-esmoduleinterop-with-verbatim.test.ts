import * as fc from "fast-check";
/**
 * @packageDocumentation
 * Tests for the `no-esmoduleinterop-with-verbatim` rule.
 */
import * as parser from "jsonc-eslint-parser";
import { describe, expect, it } from "vitest";

import rule from "../src/rules/no-esmoduleinterop-with-verbatim";
import { createRuleTester } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run("no-esmoduleinterop-with-verbatim", rule, {
    invalid: [
        {
            code: '{ "compilerOptions": { "esModuleInterop": true, "verbatimModuleSyntax": true } }',
            errors: [{ messageId: "conflictingFlags" }],
            output: '{ "compilerOptions": {  "verbatimModuleSyntax": true } }',
        },
    ],
    valid: [
        { code: '{ "compilerOptions": { "verbatimModuleSyntax": true } }' },
        { code: '{ "compilerOptions": { "esModuleInterop": true } }' },
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
