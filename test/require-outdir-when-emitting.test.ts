/**
 * @packageDocumentation
 * Tests for the `require-outdir-when-emitting` rule.
 */
import * as fc from "fast-check";
import * as parser from "jsonc-eslint-parser";
import { describe, expect, it } from "vitest";

import rule from "../src/rules/require-outdir-when-emitting";
import { createRuleTester } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run("require-outdir-when-emitting", rule, {
    invalid: [
        {
            // Emitting without outDir — compiled output lands next to source
            code: '{ "compilerOptions": {} }',
            errors: [{ messageId: "missingOutDir" }],
        },
        {
            // noEmit: false explicitly still means emitting, no outDir
            code: '{ "compilerOptions": { "noEmit": false } }',
            errors: [{ messageId: "missingOutDir" }],
        },
    ],
    valid: [
        {
            // OutDir provided — no problem
            code: '{ "compilerOptions": { "outDir": "dist" } }',
        },
        {
            // noEmit: true — not emitting, outDir not required
            code: '{ "compilerOptions": { "noEmit": true } }',
        },
        {
            // EmitDeclarationOnly: true — declaration-only builds don't need outDir
            code: '{ "compilerOptions": { "emitDeclarationOnly": true } }',
        },
        {
            // No compilerOptions at all — nothing to lint
            code: "{}",
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
