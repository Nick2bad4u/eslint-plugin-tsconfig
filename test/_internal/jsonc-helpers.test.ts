/**
 * @packageDocumentation
 * Unit tests for JSONC helper utilities used by tsconfig rules.
 */
import type { AST } from "jsonc-eslint-parser";

import * as parser from "jsonc-eslint-parser";
import {
    arrayFirst,
    assertDefined,
    assertPresent,
    safeCastTo,
} from "ts-extras";
import { describe, expect, it } from "vitest";

import {
    encodeValue,
    findProperty,
    getBooleanValue,
    getCompilerOptions,
    getStringArrayElements,
    getStringFromExpression,
    getStringValue,
    hasProperty,
    insertProperty,
    replacePropertyValue,
} from "../../src/_internal/jsonc-helpers";

function asArrayExpression(
    expression: Readonly<AST.JSONExpression>
): AST.JSONArrayExpression {
    if (expression.type === "JSONArrayExpression") {
        return expression;
    }

    throw new TypeError("Expected a JSON array expression");
}

function asJsonExpression(
    expression:
        | Readonly<AST.JSONArrayExpression["elements"][number]>
        | undefined
): AST.JSONExpression {
    assertPresent(expression);

    return expression;
}

function asObjectExpression(
    expression: Readonly<AST.JSONExpression>
): AST.JSONObjectExpression {
    if (expression.type === "JSONObjectExpression") {
        return expression;
    }

    throw new TypeError("Expected a JSON object expression");
}

const parseRootObject = (jsonText: string): AST.JSONObjectExpression => {
    const parsed = parser.parseForESLint(jsonText);
    const expressionStatement = safeCastTo<AST.JSONExpressionStatement>(
        arrayFirst(parsed.ast.body)
    );

    return asObjectExpression(expressionStatement.expression);
};

describe("jsonc-helpers", () => {
    it("encodes primitive values as JSON text", () => {
        expect.hasAssertions();

        expect(encodeValue(true)).toBe("true");
        expect(encodeValue("value")).toBe('"value"');
        expect(encodeValue(42)).toBe("42");
    });

    it("finds and inspects properties in parsed objects", () => {
        expect.hasAssertions();

        const root = parseRootObject(
            '{ "compilerOptions": { "strict": true }, "name": "demo" }'
        );

        const compilerOptionsProperty = findProperty(root, "compilerOptions");
        const nameProperty = findProperty(root, "name");

        expect(compilerOptionsProperty).toBeDefined();
        expect(nameProperty).toBeDefined();
        expect(hasProperty(root, "name")).toBeTruthy();
        expect(hasProperty(root, "missing")).toBeFalsy();
        expect(getCompilerOptions(root)).toBeDefined();

        assertDefined(compilerOptionsProperty);
        assertDefined(nameProperty);

        const strictProperty = findProperty(
            asObjectExpression(compilerOptionsProperty.value),
            "strict"
        );

        expect(strictProperty).toBeDefined();

        assertDefined(strictProperty);

        expect(getBooleanValue(strictProperty)).toBeTruthy();

        expect(getStringValue(nameProperty)).toBe("demo");
    });

    it("extracts strings from expression and arrays", () => {
        expect.hasAssertions();

        const root = parseRootObject('{ "include": ["src", true, "test"] }');
        const includeProperty = findProperty(root, "include");

        expect(includeProperty).toBeDefined();

        assertDefined(includeProperty);

        const includeValue = asArrayExpression(includeProperty.value);

        expect(getStringArrayElements(includeValue)).toStrictEqual([
            "src",
            "test",
        ]);

        const firstElement = asJsonExpression(
            arrayFirst(includeValue.elements)
        );

        expect(firstElement).toBeDefined();

        expect(getStringFromExpression(firstElement)).toBe("src");
    });

    it("builds fixer operations for insertion and replacement", () => {
        expect.hasAssertions();

        const calls: string[] = [];
        const mockFixer = {
            insertTextAfter(...args: readonly [unknown, string]) {
                const text = args[1];
                calls.push(`insert:${text}`);

                return text;
            },
            replaceText(...args: readonly [unknown, string]) {
                const text = args[1];
                calls.push(`replace:${text}`);

                return text;
            },
        } as unknown as Parameters<typeof insertProperty>[0];

        const emptyRoot = parseRootObject("{}");
        const nonEmptyRoot = parseRootObject('{ "compilerOptions": {} }');

        const insertedIntoEmpty = insertProperty(
            mockFixer,
            emptyRoot,
            "strict",
            true
        );
        const insertedIntoNonEmpty = insertProperty(
            mockFixer,
            nonEmptyRoot,
            "noEmit",
            true
        );

        const compilerOptionsProperty = findProperty(
            nonEmptyRoot,
            "compilerOptions"
        );

        expect(compilerOptionsProperty).toBeDefined();

        assertDefined(compilerOptionsProperty);

        const replacedValue = replacePropertyValue(
            mockFixer,
            compilerOptionsProperty,
            false
        );

        expect(insertedIntoEmpty).toBe('{ "strict": true }');
        expect(insertedIntoNonEmpty).toBe(',\n    "noEmit": true');
        expect(replacedValue).toBe("false");

        expect(calls).toStrictEqual([
            'replace:{ "strict": true }',
            'insert:,\n    "noEmit": true',
            "replace:false",
        ]);
    });
});
