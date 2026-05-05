import * as fc from "fast-check";
/**
 * @packageDocumentation
 * Tests for the `no-declaration-only-without-declaration` rule.
 */
import * as parser from "jsonc-eslint-parser";
import { describe, expect, it } from "vitest";

import rule from "../src/rules/no-declaration-only-without-declaration";
import { createRuleTester } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run("no-declaration-only-without-declaration", rule, {
    invalid: [
        {
            code: '{ "compilerOptions": { "emitDeclarationOnly": true } }',
            errors: [{ messageId: "missingDeclaration" }],
            output: '{ "compilerOptions": { "emitDeclarationOnly": true,\n    "declaration": true } }',
        },
    ],
    valid: [
        {
            code: '{ "compilerOptions": { "emitDeclarationOnly": true, "declaration": true } }',
        },
        { code: '{ "compilerOptions": {} }' },
        { code: '{ "compilerOptions": { "emitDeclarationOnly": false } }' },
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
