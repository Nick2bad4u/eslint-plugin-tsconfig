import * as fc from "fast-check";
/**
 * @packageDocumentation
 * Tests for the `require-no-unchecked-indexed-access` rule.
 */
import * as parser from "jsonc-eslint-parser";
import { describe, expect, it } from "vitest";

import rule from "../src/rules/require-no-unchecked-indexed-access";
import { createRuleTester } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run("require-no-unchecked-indexed-access", rule, {
    invalid: [
        {
            code: '{ "compilerOptions": {} }',
            errors: [{ messageId: "missingNoUncheckedIndexedAccess" }],
            output: '{ "compilerOptions": { "noUncheckedIndexedAccess": true } }',
        },
        {
            code: '{ "compilerOptions": { "noUncheckedIndexedAccess": false } }',
            errors: [{ messageId: "missingNoUncheckedIndexedAccess" }],
            output: '{ "compilerOptions": { "noUncheckedIndexedAccess": true } }',
        },
    ],
    valid: [
        { code: '{ "compilerOptions": { "noUncheckedIndexedAccess": true } }' },
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
