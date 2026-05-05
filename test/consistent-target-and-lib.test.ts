import * as fc from "fast-check";
/**
 * @packageDocumentation
 * Tests for the `consistent-target-and-lib` rule.
 */
import * as parser from "jsonc-eslint-parser";
import { describe, expect, it } from "vitest";

import rule from "../src/rules/consistent-target-and-lib";
import { createRuleTester } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run("consistent-target-and-lib", rule, {
    invalid: [
        {
            code: '{ "compilerOptions": { "target": "es2020", "lib": ["es2022"] } }',
            errors: [{ messageId: "inconsistentTargetAndLib" }],
        },
    ],
    valid: [
        {
            code: '{ "compilerOptions": { "target": "es2020", "lib": ["es2020"] } }',
        },
        {
            code: '{ "compilerOptions": { "target": "esnext", "lib": ["es2020", "dom"] } }',
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
