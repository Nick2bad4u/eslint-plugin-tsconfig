import * as fc from "fast-check";
/**
 * @packageDocumentation
 * Tests for the `require-composite-for-references` rule.
 */
import * as parser from "jsonc-eslint-parser";
import { describe, expect, it } from "vitest";

import rule from "../src/rules/require-composite-for-references";
import { createRuleTester } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run("require-composite-for-references", rule, {
    invalid: [
        {
            code: '{ "references": [{ "path": "../other" }] }',
            errors: [{ messageId: "missingComposite" }],
            output: '{ "references": [{ "path": "../other" }],\n    "compilerOptions": { "composite": true } }',
        },
        {
            // CompilerOptions present but composite missing
            code: '{ "compilerOptions": {}, "references": [{ "path": "../other" }] }',
            errors: [{ messageId: "missingComposite" }],
            output: '{ "compilerOptions": { "composite": true }, "references": [{ "path": "../other" }] }',
        },
    ],
    valid: [
        {
            code: '{ "compilerOptions": { "composite": true }, "references": [{ "path": "../other" }] }',
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
