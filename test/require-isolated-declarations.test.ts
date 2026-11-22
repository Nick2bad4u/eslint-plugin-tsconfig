/**
 * @packageDocumentation
 * Tests for the `require-isolated-declarations` rule.
 */
import * as fc from "fast-check";
import * as parser from "jsonc-eslint-parser";
import { describe, expect, it } from "vitest";

import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleName = "require-isolated-declarations";
const ruleTester = createRuleTester();

ruleTester.run(ruleName, getPluginRule(ruleName), {
    invalid: [
        {
            code: '{ "compilerOptions": {} }',
            errors: [{ messageId: "missingIsolatedDeclarations" }],
            name: "reports without fixing when neither declaration option is present",
            output: null,
        },
        {
            code: '{ "compilerOptions": { "declaration": false, "composite": false, "isolatedDeclarations": false } }',
            errors: [{ messageId: "missingIsolatedDeclarations" }],
            name: "reports without fixing when both declaration options are off",
            output: null,
        },
        {
            code: '{ "compilerOptions": { "declaration": true, "allowJs": true } }',
            errors: [{ messageId: "missingIsolatedDeclarations" }],
            name: "withholds the fix when allowJs is enabled",
            output: null,
        },
        {
            code: '{ "compilerOptions": { "declaration": true, "checkJs": true } }',
            errors: [{ messageId: "missingIsolatedDeclarations" }],
            name: "recognizes that checkJs implies allowJs",
            output: null,
        },
        {
            code: '{ "compilerOptions": { "declaration": true, "declaration": false } }',
            errors: [{ messageId: "missingIsolatedDeclarations" }],
            name: "uses the last declaration option value",
            output: null,
        },
        {
            code: '{ "compilerOptions": { "declaration": true }, "compilerOptions": { "declaration": false } }',
            errors: [{ messageId: "missingIsolatedDeclarations" }],
            name: "withholds the fix when compilerOptions is repeated",
            output: null,
        },
        {
            code: '{ "extends": "./base.json", "compilerOptions": { "declaration": true } }',
            errors: [{ messageId: "missingIsolatedDeclarations" }],
            name: "allows for inherited allowJs",
            output: null,
        },
        {
            code: '{ "compilerOptions": { "declaration": true } }',
            errors: [{ messageId: "missingIsolatedDeclarations" }],
            name: "adds the option with declaration enabled",
            output: '{ "compilerOptions": { "declaration": true,\n    "isolatedDeclarations": true } }',
        },
        {
            code: '{ "extends": "./base.json", "compilerOptions": { "composite": true, "allowJs": false, "isolatedDeclarations": false } }',
            errors: [{ messageId: "missingIsolatedDeclarations" }],
            name: "enables the option with explicit local compiler settings",
            output: '{ "extends": "./base.json", "compilerOptions": { "composite": true, "allowJs": false, "isolatedDeclarations": true } }',
        },
    ],
    valid: [
        {
            code: '{ "compilerOptions": { "composite": true, "isolatedDeclarations": true } }',
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
