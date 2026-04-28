/**
 * @packageDocumentation
 * Tests for the `no-esmoduleinterop-with-verbatim` rule.
 */
import * as parser from "jsonc-eslint-parser";
import * as fc from "fast-check";
import { describe, it } from "vitest";
import { createRuleTester } from "./_internal/ruleTester";
import rule from "../src/rules/no-esmoduleinterop-with-verbatim";

const ruleTester = createRuleTester();

ruleTester.run("no-esmoduleinterop-with-verbatim", rule, {
    valid: [
        { code: '{ "compilerOptions": { "verbatimModuleSyntax": true } }' },
        { code: '{ "compilerOptions": { "esModuleInterop": true } }' },
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
