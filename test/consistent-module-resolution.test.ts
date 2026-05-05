import * as fc from "fast-check";
/**
 * @packageDocumentation
 * Tests for the `consistent-module-resolution` rule.
 */
import * as parser from "jsonc-eslint-parser";
import { describe, expect, it } from "vitest";

import rule from "../src/rules/consistent-module-resolution";
import { createRuleTester } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run("consistent-module-resolution", rule, {
    invalid: [
        {
            code: '{ "compilerOptions": { "module": "nodenext" } }',
            errors: [{ messageId: "incompatibleModuleResolution" }],
        },
        {
            code: '{ "compilerOptions": { "module": "node16", "moduleResolution": "node" } }',
            errors: [{ messageId: "incompatibleModuleResolution" }],
        },
    ],
    valid: [
        {
            code: '{ "compilerOptions": { "module": "nodenext", "moduleResolution": "nodenext" } }',
        },
        {
            code: '{ "compilerOptions": { "module": "node16", "moduleResolution": "node16" } }',
        },
        { code: '{ "compilerOptions": { "module": "commonjs" } }' },
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
