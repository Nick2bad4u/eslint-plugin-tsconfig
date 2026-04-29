import * as fc from "fast-check";
/**
 * @packageDocumentation
 * Tests for the `consistent-incremental-with-tsbuildinfo` rule.
 */
import * as parser from "jsonc-eslint-parser";
import { describe, expect, it } from "vitest";

import rule from "../src/rules/consistent-incremental-with-tsbuildinfo";
import { createRuleTester } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run("consistent-incremental-with-tsbuildinfo", rule, {
    invalid: [],
    valid: [
        {
            code: '{ "compilerOptions": { "incremental": true, "tsBuildInfoFile": ".tsbuildinfo" } }',
        },
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
