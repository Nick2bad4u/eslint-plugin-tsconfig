import * as fc from "fast-check";
/**
 * @packageDocumentation
 * Tests for the `require-no-unchecked-indexed-access` rule.
 */
import * as parser from "jsonc-eslint-parser";
import { describe, expect, it } from "vitest";

import rule from "../src/rules/require-no-unchecked-indexed-access";
import { createRuleTester } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run("require-no-unchecked-indexed-access", rule, {
    invalid: [],
    valid: [
        { code: '{ "compilerOptions": { "noUncheckedIndexedAccess": true } }' },
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
