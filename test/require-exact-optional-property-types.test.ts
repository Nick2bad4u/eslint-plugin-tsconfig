/**
 * @packageDocumentation
 * Tests for the `require-exact-optional-property-types` rule.
 */
import * as parser from "jsonc-eslint-parser";
import * as fc from "fast-check";
import { describe, it } from "vitest";
import { createRuleTester } from "./_internal/ruleTester";
import rule from "../src/rules/require-exact-optional-property-types";

const ruleTester = createRuleTester();

ruleTester.run("require-exact-optional-property-types", rule, {
    valid: [
        {
            code: '{ "compilerOptions": { "exactOptionalPropertyTypes": true } }',
        },
        { code: '{ "compilerOptions": {} }' },
    ],
    invalid: [],
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
        fc.assert(
            fc.property(fc.string(), (jsonContent) => {
                validateJsoncParse(jsonContent);
            })
        );
    });
});
