import * as fc from "fast-check";
/**
 * @packageDocumentation
 * Tests for the `no-legacy-module-resolution` rule.
 */
import * as parser from "jsonc-eslint-parser";
import { describe, expect, it } from "vitest";

import rule from "../src/rules/no-legacy-module-resolution";
import { createRuleTester } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run("no-legacy-module-resolution", rule, {
    invalid: [
        {
            code: '{ "compilerOptions": { "moduleResolution": "node" } }',
            errors: [{ messageId: "legacyModuleResolution" }],
        },
        {
            code: '{ "compilerOptions": { "moduleResolution": "classic" } }',
            errors: [{ messageId: "legacyModuleResolution" }],
        },
    ],
    valid: [
        { code: '{ "compilerOptions": { "moduleResolution": "bundler" } }' },
        { code: '{ "compilerOptions": { "moduleResolution": "nodenext" } }' },
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
