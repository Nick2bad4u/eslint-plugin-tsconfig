/**
 * @remarks
 * All rules in this plugin analyze `tsconfig*.json` files using the
 * `jsonc-eslint-parser` AST. These helpers provide type-safe, ergonomic access
 * to compiler-option properties within that AST.
 *
 * @packageDocumentation
 * JSONC AST traversal and accessor helpers for tsconfig rule implementations.
 */
import type { Rule } from "eslint";
import type { AST } from "jsonc-eslint-parser";
import type { JsonPrimitive } from "type-fest";

import { arrayAt, isDefined, isEmpty } from "ts-extras";

/** Convenience alias for a JSONC rule fixer. */
export type Fixer = Rule.RuleFixer;

/** JSON array expression node from the JSONC AST. */
export type JSONArrayExpression = AST.JSONArrayExpression;

/** JSON expression union type from the JSONC AST. */
export type JSONExpression = AST.JSONExpression;

/** JSON literal node from the JSONC AST. */
export type JSONLiteral = AST.JSONLiteral;

/** JSON object expression node from the JSONC AST. */
export type JSONObjectExpression = AST.JSONObjectExpression;

/** Primitive values that can be written into a JSON property. */
export type JSONPrimitive = JsonPrimitive;

/**
 * Rule listener type from jsonc-eslint-parser, enabling JSONC-aware node
 * selectors.
 */

/** JSON property node from the JSONC AST. */
export type JSONProperty = AST.JSONProperty;

/** JSON property key node from the JSONC AST. */
export type JSONPropertyKey =
    | AST.JSONIdentifier
    | AST.JSONNumberLiteral
    | AST.JSONStringLiteral;

// ─── Property access ─────────────────────────────────────────────────────────

/**
 * JSON-encode a primitive value for insertion into source text.
 *
 * @param value - Value to encode.
 *
 * @returns JSON-safe string representation.
 */
export function encodeValue(value: JSONPrimitive): string {
    return JSON.stringify(value);
}

/**
 * Find a named property within a `JSONObjectExpression`.
 *
 * @param obj - JSON object AST node.
 * @param key - Property key to search for.
 *
 * @returns The matching `JSONProperty` when present; otherwise `undefined`.
 */
export function findProperty(
    obj: JSONObjectExpression,
    key: string
): JSONProperty | undefined {
    return obj.properties.find(
        (prop) => prop.type === "JSONProperty" && getKeyText(prop) === key
    );
}

/**
 * Extract a boolean literal value from a `JSONProperty`.
 *
 * @param prop - JSON property to inspect.
 *
 * @returns The boolean value when the property holds a boolean literal;
 *   otherwise `undefined`.
 */
export function getBooleanValue(prop: JSONProperty): boolean | undefined {
    if (
        prop.value.type === "JSONLiteral" &&
        typeof prop.value.value === "boolean"
    ) {
        return prop.value.value;
    }

    return undefined;
}

/**
 * Resolve the `compilerOptions` object from a tsconfig root node.
 *
 * @param root - Root `JSONObjectExpression` of the tsconfig file.
 *
 * @returns The `compilerOptions` `JSONObjectExpression` when present; otherwise
 *   `undefined`.
 */
export function getCompilerOptions(
    root: JSONObjectExpression
): JSONObjectExpression | undefined {
    const prop = findProperty(root, "compilerOptions");

    if (prop?.value.type !== "JSONObjectExpression") {
        return undefined;
    }

    return prop.value;
}

// ─── Value extraction ─────────────────────────────────────────────────────────

/**
 * Extract the string key from a `JSONProperty`.
 *
 * @param prop - JSON property whose key to extract.
 *
 * @returns The resolved key string.
 */
export function getKeyText(prop: JSONProperty): string {
    if (prop.key.type === "JSONIdentifier") {
        return prop.key.name;
    }

    if (prop.key.type === "JSONLiteral" && typeof prop.key.value === "string") {
        return prop.key.value;
    }

    return "";
}

/**
 * Collect the string elements from a `JSONArrayExpression`.
 *
 * @param arr - Array node to iterate.
 *
 * @returns Array of string values found among the array elements.
 */
export function getStringArrayElements(arr: JSONArrayExpression): string[] {
    const result: string[] = [];

    for (const element of arr.elements) {
        if (
            element !== null &&
            element.type === "JSONLiteral" &&
            typeof element.value === "string"
        ) {
            result.push(element.value);
        }
    }

    return result;
}

/**
 * Extract a string literal value from a `JSONExpression`.
 *
 * @param expr - JSON expression to inspect.
 *
 * @returns The string value when the expression is a string literal; otherwise
 *   `undefined`.
 */
export function getStringFromExpression(
    expr: JSONExpression
): string | undefined {
    if (expr.type === "JSONLiteral" && typeof expr.value === "string") {
        return expr.value;
    }

    return undefined;
}

// ─── Fixer helpers ────────────────────────────────────────────────────────────

/**
 * Extract a string literal value from a `JSONProperty`.
 *
 * @param prop - JSON property to inspect.
 *
 * @returns The string value when the property holds a string literal; otherwise
 *   `undefined`.
 */
export function getStringValue(prop: JSONProperty): string | undefined {
    if (
        prop.value.type === "JSONLiteral" &&
        typeof prop.value.value === "string"
    ) {
        return prop.value.value;
    }

    return undefined;
}

/**
 * Determine whether a named property exists in a `JSONObjectExpression`.
 *
 * @param obj - JSON object AST node.
 * @param key - Property key to look up.
 *
 * @returns `true` when the property is present.
 */
export function hasProperty(obj: JSONObjectExpression, key: string): boolean {
    return isDefined(findProperty(obj, key));
}

/**
 * Build fixer text for inserting a new property into an existing object.
 *
 * @remarks
 * Appends the property after the last existing property in the object, or
 * creates a simple `{ "key": value }` when the object is empty.
 *
 * @param fixer - ESLint rule fixer.
 * @param obj - Target JSON object to insert into.
 * @param key - Property name to insert.
 * @param value - Property value to insert.
 * @param indent - Indentation string for the new line (default: `" "`).
 *
 * @returns An ESLint fix object.
 */
export function insertProperty(
    fixer: Fixer,
    obj: JSONObjectExpression,
    key: string,
    value: JSONPrimitive,
    indent = "    "
): ReturnType<Fixer["insertTextAfter"]> {
    const encodedValue = encodeValue(value);
    const propertyText = `"${key}": ${encodedValue}`;

    if (isEmpty(obj.properties)) {
        return fixer.replaceText(
            obj as unknown as Parameters<Fixer["replaceText"]>[0],
            `{ ${propertyText} }`
        );
    }

    const lastProp = arrayAt(obj.properties, -1);

    if (!isDefined(lastProp)) {
        return fixer.replaceText(
            obj as unknown as Parameters<Fixer["replaceText"]>[0],
            `{ ${propertyText} }`
        );
    }

    return fixer.insertTextAfter(
        lastProp as unknown as Parameters<Fixer["insertTextAfter"]>[0],
        `,\n${indent}${propertyText}`
    );
}

// ─── Array helpers ────────────────────────────────────────────────────────────

/**
 * Build fixer text for replacing a property's value within a JSON object.
 *
 * @param fixer - ESLint rule fixer.
 * @param prop - Property whose value will be replaced.
 * @param value - New value to write.
 *
 * @returns An ESLint fix object.
 */
export function replacePropertyValue(
    fixer: Fixer,
    prop: JSONProperty,
    value: JSONPrimitive
): ReturnType<Fixer["replaceText"]> {
    return fixer.replaceText(
        prop.value as unknown as Parameters<Fixer["replaceText"]>[0],
        encodeValue(value)
    );
}
