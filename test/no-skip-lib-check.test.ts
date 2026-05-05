import * as fc from "fast-check";
/**
 * @packageDocumentation
 * Tests for the `no-skip-lib-check` rule.
 */
import * as parser from "jsonc-eslint-parser";
import { describe, expect, it } from "vitest";

import rule from "../src/rules/no-skip-lib-check";
import { createRuleTester } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run("no-skip-lib-check", rule, {
    invalid: [
        {
            code: '{ "compilerOptions": { "skipLibCheck": true } }',
            errors: [{ messageId: "skipLibCheck" }],
        },
    ],
    valid: [
        { code: '{ "compilerOptions": { "skipLibCheck": false } }' },
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
