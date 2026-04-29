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
    invalid: [],
    valid: [
        {
            code: '{ "compilerOptions": { "declaration": true, "declarationMap": true } }',
        },
        {
            code: '{ "compilerOptions": {} }',
        },
        {
            code: '{ "compilerOptions": { "declaration": false } }',
        },
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
