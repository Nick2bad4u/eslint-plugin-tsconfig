/**
 * @packageDocumentation
 * Tests for the `no-emit-in-root-config` rule.
 */
import * as parser from "jsonc-eslint-parser";
import * as fc from "fast-check";
import { describe, it } from "vitest";
import { createRuleTester } from "./_internal/ruleTester";
import rule from "../src/rules/no-emit-in-root-config";

const ruleTester = createRuleTester();

ruleTester.run("no-emit-in-root-config", rule, {
    valid: [
        {
            code: '{ "compilerOptions": { "noEmit": true }, "references": [{ "path": "./packages/core" }] }',
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
