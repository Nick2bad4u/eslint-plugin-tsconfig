import { isDefined } from "ts-extras";

/**
 * @packageDocumentation
 * Rule: require-declaration-with-composite
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

                const compositeProp: JSONProperty | undefined = findProperty(
                    co,
                    "composite"
                );
                if (
                    !isDefined(compositeProp) ||
                    getBooleanValue(compositeProp) !== true
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
                    loc: compositeProp.loc,
                    messageId: "missingDeclaration",
                });
            },
        };
    },
    meta: {
        docs: {
            description:
                "require `declaration: true` when `composite: true` is set.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: [
                "all",
                "project-references",
                "strict",
            ],
            url: createRuleDocsUrl("require-declaration-with-composite"),
        },
        fixable: "code",
        messages: {
            missingDeclaration:
                '`composite: true` implicitly requires `declaration: true`. Set `"declaration": true` explicitly to avoid confusion.',
        },
        schema: [],
        type: "problem",
    },
    name: "require-declaration-with-composite",
});

export default rule;
