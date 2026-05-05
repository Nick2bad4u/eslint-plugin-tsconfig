import * as fc from "fast-check";
/**
 * @packageDocumentation
 * Tests for the `require-verbatim-module-syntax` rule.
 */
import * as parser from "jsonc-eslint-parser";
import { describe, expect, it } from "vitest";

import rule from "../src/rules/require-verbatim-module-syntax";
import { createRuleTester } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run("require-verbatim-module-syntax", rule, {
    invalid: [
        {
            code: '{ "compilerOptions": { "module": "NodeNext" } }',
            errors: [{ messageId: "missingVerbatimModuleSyntax" }],
            output: '{ "compilerOptions": { "module": "NodeNext",\n    "verbatimModuleSyntax": true } }',
        },
        {
            code: '{ "compilerOptions": { "module": "NodeNext", "verbatimModuleSyntax": false } }',
            errors: [{ messageId: "missingVerbatimModuleSyntax" }],
            output: '{ "compilerOptions": { "module": "NodeNext", "verbatimModuleSyntax": true } }',
        },
    ],
    valid: [
        {
            code: '{ "compilerOptions": { "module": "NodeNext", "verbatimModuleSyntax": true } }',
        },
        { code: '{ "compilerOptions": { "module": "CommonJS" } }' },
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
