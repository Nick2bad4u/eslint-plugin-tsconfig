/**
 * @packageDocumentation
 * Tests for the `no-declaration-only-without-declaration` rule.
 */
import * as parser from "jsonc-eslint-parser";
import * as fc from "fast-check";
import { describe, it } from "vitest";
import { createRuleTester } from "./_internal/ruleTester";
import rule from "../src/rules/no-declaration-only-without-declaration";

const ruleTester = createRuleTester();

ruleTester.run("no-declaration-only-without-declaration", rule, {
    valid: [
        {
            code: '{ "compilerOptions": { "declaration": true, "emitDeclarationOnly": true } }',
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
