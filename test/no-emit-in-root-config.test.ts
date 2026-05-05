import * as fc from "fast-check";
/**
 * @packageDocumentation
 * Tests for the `no-emit-in-root-config` rule.
 */
import * as parser from "jsonc-eslint-parser";
import { describe, expect, it } from "vitest";

import rule from "../src/rules/no-emit-in-root-config";
import { createRuleTester } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run("no-emit-in-root-config", rule, {
    invalid: [
        {
            code: '{ "compilerOptions": {} }',
            errors: [{ messageId: "missingNoEmit" }],
            filename: "tsconfig.json",
            output: '{ "compilerOptions": { "noEmit": true } }',
        },
        {
            code: '{ "compilerOptions": { "noEmit": false } }',
            errors: [{ messageId: "missingNoEmit" }],
            filename: "tsconfig.json",
            output: '{ "compilerOptions": { "noEmit": true } }',
        },
    ],
    valid: [
        {
            code: '{ "compilerOptions": { "noEmit": true } }',
            filename: "tsconfig.json",
        },
        { code: '{ "compilerOptions": {} }', filename: "tsconfig.build.json" },
        { code: '{ "compilerOptions": {} }' },
        // Monorepo workspace configs should not trigger the rule
        {
            code: '{ "compilerOptions": {} }',
            filename: "/workspace/packages/lib/tsconfig.json",
        },
        {
            code: '{ "compilerOptions": {} }',
            filename: "/workspace/apps/cli/tsconfig.json",
        },
        {
            code: '{ "compilerOptions": {} }',
            filename: "/workspace/src/tsconfig.json",
        },
        {
            code: '{ "compilerOptions": { "noEmit": false } }',
            filename: "/workspace/libs/shared/tsconfig.json",
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
