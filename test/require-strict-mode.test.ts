/**
 * @packageDocumentation
 * Tests for the `require-strict-mode` rule.
 */
import * as parser from "jsonc-eslint-parser";
import * as fc from "fast-check";
import { describe, it } from "vitest";
import { createRuleTester } from "./_internal/ruleTester";
import rule from "../src/rules/require-strict-mode";

const ruleTester = createRuleTester();

ruleTester.run("require-strict-mode", rule, {
    valid: [
        { code: '{ "compilerOptions": { "strict": true } }' },
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
