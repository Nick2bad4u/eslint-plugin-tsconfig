import { isDefined } from "ts-extras";

/**
 * @packageDocumentation
 * Rule: require-declaration-map
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

                const declarationProp: JSONProperty | undefined = findProperty(
                    co,
                    "declaration"
                );
                if (
                    !isDefined(declarationProp) ||
                    getBooleanValue(declarationProp) !== true
                )
                    return;

                const declarationMapProp: JSONProperty | undefined =
                    findProperty(co, "declarationMap");
                if (
                    isDefined(declarationMapProp) &&
                    getBooleanValue(declarationMapProp) === true
                )
                    return;

                reportViolation(context, {
                    fix(fixer) {
                        if (isDefined(declarationMapProp)) {
                            return replacePropertyValue(
                                fixer,
                                declarationMapProp,
                                true
                            );
                        }
                        return insertProperty(
                            fixer,
                            co,
                            "declarationMap",
                            true
                        );
                    },
                    loc: declarationProp.loc,
                    messageId: "missingDeclarationMap",
                });
            },
        };
    },
    meta: {
        docs: {
            description:
                "require `declarationMap: true` alongside `declaration: true` for library source navigation.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: ["all", "emit-config"],
            url: createRuleDocsUrl("require-declaration-map"),
        },
        fixable: "code",
        messages: {
            missingDeclarationMap:
                '`declarationMap: true` generates `.d.ts.map` files that map declaration files back to their original TypeScript sources. Without it, "go to definition" in editors jumps to the emitted `.d.ts` file instead of the original `.ts` source, degrading the developer experience for consumers of the library. Add `"declarationMap": true` to `compilerOptions`.',
        },
        schema: [],
        type: "suggestion",
    },
    name: "require-declaration-map",
});

export default rule;
