import { isDefined } from "ts-extras";

/**
 * @packageDocumentation
 * Rule: no-declaration-only-without-declaration
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

                const emitDeclOnlyProp: JSONProperty | undefined = findProperty(
                    co,
                    "emitDeclarationOnly"
                );
                if (
                    !isDefined(emitDeclOnlyProp) ||
                    getBooleanValue(emitDeclOnlyProp) !== true
                )
                    return;

                const declarationProp: JSONProperty | undefined = findProperty(
                    co,
                    "declaration"
                );
                if (
                    isDefined(declarationProp) &&
                    getBooleanValue(declarationProp) === true
                )
                    return;

                reportViolation(context, {
                    fix(fixer) {
                        if (isDefined(declarationProp)) {
                            return replacePropertyValue(
                                fixer,
                                declarationProp,
                                true
                            );
                        }
                        return insertProperty(fixer, co, "declaration", true);
                    },
                    loc: emitDeclOnlyProp.loc,
                    messageId: "missingDeclaration",
                });
            },
        };
    },
    meta: {
        docs: {
            description:
                "disallow `emitDeclarationOnly: true` when `declaration` is `false`.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: [
                "all",
                "emit-config",
                "strict",
            ],
            url: createRuleDocsUrl("no-declaration-only-without-declaration"),
        },
        fixable: "code",
        messages: {
            missingDeclaration:
                '`emitDeclarationOnly: true` has no effect when `declaration` is not enabled. Set `"declaration": true` in `compilerOptions`.',
        },
        schema: [],
        type: "problem",
    },
    name: "no-declaration-only-without-declaration",
});

export default rule;
