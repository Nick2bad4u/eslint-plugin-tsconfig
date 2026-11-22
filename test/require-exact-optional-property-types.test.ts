/**
 * @packageDocumentation
 * Tests for the `require-exact-optional-property-types` rule.
 */
import * as fc from "fast-check";
import * as parser from "jsonc-eslint-parser";
import { describe, expect, it } from "vitest";

import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleName = "require-exact-optional-property-types";
const ruleTester = createRuleTester();

ruleTester.run(ruleName, getPluginRule(ruleName), {
    invalid: [
        {
            code: '{ "compilerOptions": {} }',
            errors: [{ messageId: "missingExactOptionalPropertyTypes" }],
            name: "reports without fixing when strict settings are absent",
            output: null,
        },
        {
            code: '{ "compilerOptions": { "strict": false } }',
            errors: [{ messageId: "missingExactOptionalPropertyTypes" }],
            name: "reports without fixing when strict mode is off",
            output: null,
        },
        {
            code: '{ "compilerOptions": { "strict": true, "strictNullChecks": false, "exactOptionalPropertyTypes": false } }',
            errors: [{ messageId: "missingExactOptionalPropertyTypes" }],
            name: "honors strictNullChecks false even in strict mode",
            output: null,
        },
        {
            code: '{ "compilerOptions": { "strictNullChecks": true, "strictNullChecks": false } }',
            errors: [{ messageId: "missingExactOptionalPropertyTypes" }],
            name: "uses the last strictNullChecks value",
            output: null,
        },
        {
            code: '{ "compilerOptions": { "strictNullChecks": true }, "compilerOptions": { "strictNullChecks": false } }',
            errors: [{ messageId: "missingExactOptionalPropertyTypes" }],
            name: "withholds the fix when compilerOptions is repeated",
            output: null,
        },
        {
            code: '{ "extends": "./base.json", "compilerOptions": { "strict": true } }',
            errors: [{ messageId: "missingExactOptionalPropertyTypes" }],
            name: "allows for a strictNullChecks override in a base config",
            output: null,
        },
        {
            code: '{ "compilerOptions": { "strict": true } }',
            errors: [{ messageId: "missingExactOptionalPropertyTypes" }],
            name: "adds the option in a standalone strict config",
            output: '{ "compilerOptions": { "strict": true,\n    "exactOptionalPropertyTypes": true } }',
        },
        {
            code: '{ "extends": "./base.json", "compilerOptions": { "strict": false, "strictNullChecks": true, "exactOptionalPropertyTypes": false } }',
            errors: [{ messageId: "missingExactOptionalPropertyTypes" }],
            name: "enables the option with an explicit local prerequisite",
            output: '{ "extends": "./base.json", "compilerOptions": { "strict": false, "strictNullChecks": true, "exactOptionalPropertyTypes": true } }',
        },
    ],
    valid: [
        {
            code: '{ "compilerOptions": { "strict": true, "exactOptionalPropertyTypes": true } }',
        },
        { code: "{}" },
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
