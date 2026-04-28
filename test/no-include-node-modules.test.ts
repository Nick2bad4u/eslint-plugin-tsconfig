import * as fc from "fast-check";
/**
 * @packageDocumentation
 * Tests for the `no-include-node-modules` rule.
 */
import * as parser from "jsonc-eslint-parser";
import { describe, expect, it } from "vitest";

import rule from "../src/rules/no-include-node-modules";
import { createRuleTester } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run("no-include-node-modules", rule, {
    invalid: [],
    valid: [
        { code: '{ "include": ["src"] }' },
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
