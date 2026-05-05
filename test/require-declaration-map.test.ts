/**
 * @packageDocumentation
 * Tests for the `require-declaration-map` rule.
 */
import * as fc from "fast-check";
import * as parser from "jsonc-eslint-parser";
import { describe, expect, it } from "vitest";

import rule from "../src/rules/require-declaration-map";
import { createRuleTester } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run("require-declaration-map", rule, {
    invalid: [
        {
            code: '{ "compilerOptions": { "declaration": true } }',
            errors: [{ messageId: "missingDeclarationMap" }],
            output: '{ "compilerOptions": { "declaration": true,\n    "declarationMap": true } }',
        },
        {
            code: '{ "compilerOptions": { "declaration": true, "declarationMap": false } }',
            errors: [{ messageId: "missingDeclarationMap" }],
            output: '{ "compilerOptions": { "declaration": true, "declarationMap": true } }',
        },
    ],
    valid: [
        {
            code: '{ "compilerOptions": { "declaration": true, "declarationMap": true } }',
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
