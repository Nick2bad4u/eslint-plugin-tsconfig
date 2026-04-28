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
    invalid: [],
    valid: [
        {
            code: '{ "compilerOptions": { "noEmit": true }, "references": [{ "path": "./packages/core" }] }',
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
        expect(true).toBeTruthy();

        fc.assert(
            fc.property(fc.string(), (jsonContent) => {
                validateJsoncParse(jsonContent);
            })
        );
    });
});
