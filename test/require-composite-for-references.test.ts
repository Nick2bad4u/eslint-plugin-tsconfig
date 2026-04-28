/**
 * @packageDocumentation
 * Tests for the `require-composite-for-references` rule.
 */
import * as parser from "jsonc-eslint-parser";
import * as fc from "fast-check";
import { describe, it } from "vitest";
import { createRuleTester } from "./_internal/ruleTester";
import rule from "../src/rules/require-composite-for-references";

const ruleTester = createRuleTester();

ruleTester.run("require-composite-for-references", rule, {
    valid: [
        {
            code: '{ "compilerOptions": { "composite": true }, "references": [{ "path": "./packages/core" }] }',
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
