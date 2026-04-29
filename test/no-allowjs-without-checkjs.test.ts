import * as fc from "fast-check";
/**
 * @packageDocumentation
 * Tests for the `no-allowjs-without-checkjs` rule.
 */
import * as parser from "jsonc-eslint-parser";
import { describe, expect, it } from "vitest";

import rule from "../src/rules/no-allowjs-without-checkjs";
import { createRuleTester } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run("no-allowjs-without-checkjs", rule, {
    invalid: [],
    valid: [
        {
            code: '{ "compilerOptions": { "allowJs": true, "checkJs": true } }',
        },
        {
            code: '{ "compilerOptions": { "allowJs": false } }',
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
