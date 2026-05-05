import { isDefined } from "ts-extras";

/**
 * @packageDocumentation
 * Rule: require-source-map-in-dev
 */
import type {
    JSONObjectExpression,
    JSONProperty,
} from "../_internal/jsonc-helpers.js";
import type { JsoncRuleModule } from "../_internal/jsonc-rule.js";

import {
    findProperty,
    getBooleanValue,
    getCompilerOptions,
    insertProperty,
    replacePropertyValue,
    reportViolation,
} from "../_internal/jsonc-helpers.js";
import { createJsoncRule } from "../_internal/jsonc-rule.js";
import { createRuleDocsUrl } from "../_internal/rule-docs-url.js";

/** Rule implementation for this tsconfig lint rule. */
const rule: JsoncRuleModule = createJsoncRule({
    create(context) {
        return {
            JSONObjectExpression(node: Readonly<JSONObjectExpression>) {
                if (node.parent?.type !== "JSONExpressionStatement") return;
                const co = getCompilerOptions(node);
                if (!co) return;

                // Skip library builds (noEmit: true) — no JS output to source-map
                const noEmitProp: JSONProperty | undefined = findProperty(
                    co,
                    "noEmit"
                );
                if (
                    isDefined(noEmitProp) &&
                    getBooleanValue(noEmitProp) === true
                )
                    return;

                // Skip declaration-only builds
                const emitDeclOnlyProp: JSONProperty | undefined = findProperty(
                    co,
                    "emitDeclarationOnly"
                );
                if (
                    isDefined(emitDeclOnlyProp) &&
                    getBooleanValue(emitDeclOnlyProp) === true
                )
                    return;

                const inlineSourceMapProp: JSONProperty | undefined =
                    findProperty(co, "inlineSourceMap");
                if (
                    isDefined(inlineSourceMapProp) &&
                    getBooleanValue(inlineSourceMapProp) === true
                )
                    return;

                const prop: JSONProperty | undefined = findProperty(
                    co,
                    "sourceMap"
                );
                if (isDefined(prop) && getBooleanValue(prop) === true) return;

                reportViolation(context, {
                    fix(fixer) {
                        if (isDefined(prop)) {
                            return replacePropertyValue(fixer, prop, true);
                        }
                        return insertProperty(fixer, co, "sourceMap", true);
                    },
                    loc: (prop ?? inlineSourceMapProp ?? co).loc,
                    messageId: "missingSourceMap",
                });
            },
        };
    },
    meta: {
        docs: {
            description:
                "require `sourceMap: true` in development and watch configurations.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: ["all", "emit-config"],
            url: createRuleDocsUrl("require-source-map-in-dev"),
        },
        fixable: "code",
        messages: {
            missingSourceMap:
                'Development and watch configurations should enable `"sourceMap": true` to allow debuggers to map compiled output back to source. Add it to `compilerOptions`.',
        },
        schema: [],
        type: "suggestion",
    },
    name: "require-source-map-in-dev",
});

export default rule;
