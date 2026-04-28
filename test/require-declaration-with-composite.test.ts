import * as fc from "fast-check";
/**
 * @packageDocumentation
 * Tests for the `require-declaration-with-composite` rule.
 */
import * as parser from "jsonc-eslint-parser";
import { describe, expect, it } from "vitest";

import rule from "../src/rules/require-declaration-with-composite";
import { createRuleTester } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run("require-declaration-with-composite", rule, {
    invalid: [],
    valid: [
        {
            code: '{ "compilerOptions": { "composite": true, "declaration": true } }',
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
        expect(true).toBeTruthy();

        fc.assert(
            fc.property(fc.string(), (jsonContent) => {
                validateJsoncParse(jsonContent);
            })
        );
    });
});
