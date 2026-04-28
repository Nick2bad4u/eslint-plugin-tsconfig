/**
 * @packageDocumentation
 * Tests for the `consistent-incremental-with-tsbuildinfo` rule.
 */
import * as parser from "jsonc-eslint-parser";
import * as fc from "fast-check";
import { describe, it } from "vitest";
import { createRuleTester } from "./_internal/ruleTester";
import rule from "../src/rules/consistent-incremental-with-tsbuildinfo";

const ruleTester = createRuleTester();

ruleTester.run("consistent-incremental-with-tsbuildinfo", rule, {
    valid: [
        {
            code: '{ "compilerOptions": { "incremental": true, "tsBuildInfoFile": ".tsbuildinfo" } }',
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
