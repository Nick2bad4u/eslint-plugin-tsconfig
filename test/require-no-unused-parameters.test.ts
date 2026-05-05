/**
 * @packageDocumentation
 * Tests for the `require-no-unused-parameters` rule.
 */
import * as fc from "fast-check";
import * as parser from "jsonc-eslint-parser";
import { describe, expect, it } from "vitest";

import rule from "../src/rules/require-no-unused-parameters";
import { createRuleTester } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run("require-no-unused-parameters", rule, {
    invalid: [
        {
            code: '{ "compilerOptions": {} }',
            errors: [{ messageId: "missingNoUnusedParameters" }],
            output: '{ "compilerOptions": { "noUnusedParameters": true } }',
        },
        {
            code: '{ "compilerOptions": { "noUnusedParameters": false } }',
            errors: [{ messageId: "missingNoUnusedParameters" }],
            output: '{ "compilerOptions": { "noUnusedParameters": true } }',
        },
    ],
    valid: [
        { code: '{ "compilerOptions": { "noUnusedParameters": true } }' },
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
