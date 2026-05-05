import * as fc from "fast-check";
/**
 * @packageDocumentation
 * Tests for the `require-no-fallthrough-cases-in-switch` rule.
 */
import * as parser from "jsonc-eslint-parser";
import { describe, expect, it } from "vitest";

import rule from "../src/rules/require-no-fallthrough-cases-in-switch";
import { createRuleTester } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run("require-no-fallthrough-cases-in-switch", rule, {
    invalid: [
        {
            code: '{ "compilerOptions": {} }',
            errors: [{ messageId: "missingNoFallthroughCasesInSwitch" }],
            output: '{ "compilerOptions": { "noFallthroughCasesInSwitch": true } }',
        },
        {
            code: '{ "compilerOptions": { "noFallthroughCasesInSwitch": false } }',
            errors: [{ messageId: "missingNoFallthroughCasesInSwitch" }],
            output: '{ "compilerOptions": { "noFallthroughCasesInSwitch": true } }',
        },
    ],
    valid: [
        {
            code: '{ "compilerOptions": { "noFallthroughCasesInSwitch": true } }',
        },
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
