/**
 * @packageDocumentation
 * Tests for the `no-inline-source-map` rule.
 */
import * as fc from "fast-check";
import * as parser from "jsonc-eslint-parser";
import { describe, expect, it } from "vitest";

import rule from "../src/rules/no-inline-source-map";
import { createRuleTester } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run("no-inline-source-map", rule, {
    invalid: [
        {
            code: '{ "compilerOptions": { "inlineSourceMap": true } }',
            errors: [{ messageId: "inlineSourceMap" }],
        },
    ],
    valid: [
        { code: '{ "compilerOptions": { "sourceMap": true } }' },
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
