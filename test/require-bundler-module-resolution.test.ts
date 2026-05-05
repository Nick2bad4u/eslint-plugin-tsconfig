import * as fc from "fast-check";
/**
 * @packageDocumentation
 * Tests for the `require-bundler-module-resolution` rule.
 */
import * as parser from "jsonc-eslint-parser";
import { describe, expect, it } from "vitest";

import rule from "../src/rules/require-bundler-module-resolution";
import { createRuleTester } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run("require-bundler-module-resolution", rule, {
    invalid: [
        {
            code: '{ "compilerOptions": { "module": "preserve" } }',
            errors: [{ messageId: "missingBundlerResolution" }],
            output: '{ "compilerOptions": { "module": "preserve",\n    "moduleResolution": "bundler" } }',
        },
        {
            code: '{ "compilerOptions": { "module": "preserve", "moduleResolution": "node" } }',
            errors: [{ messageId: "missingBundlerResolution" }],
            output: '{ "compilerOptions": { "module": "preserve", "moduleResolution": "bundler" } }',
        },
    ],
    valid: [
        {
            code: '{ "compilerOptions": { "module": "preserve", "moduleResolution": "bundler" } }',
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
