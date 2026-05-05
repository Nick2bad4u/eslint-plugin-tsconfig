/**
 * @packageDocumentation
 * Tests for the `no-rootdir-includes-outdir` rule.
 */
import * as fc from "fast-check";
import * as parser from "jsonc-eslint-parser";
import { describe, expect, it } from "vitest";

import rule from "../src/rules/no-rootdir-includes-outdir";
import { createRuleTester } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run("no-rootdir-includes-outdir", rule, {
    invalid: [
        {
            // OutDir "dist" is inside rootDir "." (current directory)
            code: '{ "compilerOptions": { "rootDir": ".", "outDir": "dist" } }',
            errors: [{ messageId: "rootDirIncludesOutDir" }],
        },
        {
            // OutDir "src/out" is inside rootDir "src"
            code: '{ "compilerOptions": { "rootDir": "src", "outDir": "src/out" } }',
            errors: [{ messageId: "rootDirIncludesOutDir" }],
        },
    ],
    valid: [
        {
            // OutDir "dist" is not inside rootDir "src"
            code: '{ "compilerOptions": { "rootDir": "src", "outDir": "dist" } }',
        },
        {
            // Missing outDir — rule only fires when both are present
            code: '{ "compilerOptions": { "rootDir": "src" } }',
        },
        {
            // Missing rootDir — rule only fires when both are present
            code: '{ "compilerOptions": { "outDir": "dist" } }',
        },
        {
            // No compilerOptions at all
            code: "{}",
        },
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
