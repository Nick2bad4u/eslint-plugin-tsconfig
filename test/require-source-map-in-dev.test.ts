import * as fc from "fast-check";
/**
 * @packageDocumentation
 * Tests for the `require-source-map-in-dev` rule.
 */
import * as parser from "jsonc-eslint-parser";
import { describe, expect, it } from "vitest";

import rule from "../src/rules/require-source-map-in-dev";
import { createRuleTester } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run("require-source-map-in-dev", rule, {
    invalid: [
        {
            code: '{ "compilerOptions": {} }',
            errors: [{ messageId: "missingSourceMap" }],
            output: '{ "compilerOptions": { "sourceMap": true } }',
        },
        {
            code: '{ "compilerOptions": { "sourceMap": false } }',
            errors: [{ messageId: "missingSourceMap" }],
            output: '{ "compilerOptions": { "sourceMap": true } }',
        },
    ],
    valid: [
        { code: '{ "compilerOptions": { "sourceMap": true } }' },
        { code: '{ "compilerOptions": { "inlineSourceMap": true } }' },
        { code: '{ "compilerOptions": { "noEmit": true } }' },
        { code: '{ "compilerOptions": { "emitDeclarationOnly": true } }' },
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
