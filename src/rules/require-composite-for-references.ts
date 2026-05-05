/**
 * @packageDocumentation
 * Rule: require-composite-for-references
 */
import { arrayAt, isDefined } from "ts-extras";

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
                // Check root-level `references` array
                const referencesProp: JSONProperty | undefined = findProperty(
                    node,
                    "references"
                );
                if (referencesProp?.value.type !== "JSONArrayExpression")
                    return;

                const co = getCompilerOptions(node);

                // If compilerOptions is missing entirely, flag and insert it
                if (!co) {
                    reportViolation(context, {
                        fix(fixer) {
                            // Insert compilerOptions with composite: true after last property
                            const lastProp = arrayAt(node.properties, -1);
                            if (!lastProp) return null;
                            return fixer.insertTextAfter(
                                lastProp as unknown as Parameters<
                                    typeof fixer.insertTextAfter
                                >[0],
                                ',\n    "compilerOptions": { "composite": true }'
                            );
                        },
                        loc: referencesProp.loc,
                        messageId: "missingComposite",
                    });
                    return;
                }

                const compositeProp: JSONProperty | undefined = findProperty(
                    co,
                    "composite"
                );
                if (
                    isDefined(compositeProp) &&
                    getBooleanValue(compositeProp) === true
                )
                    return;

                reportViolation(context, {
                    fix(fixer) {
                        if (isDefined(compositeProp)) {
                            return replacePropertyValue(
                                fixer,
                                compositeProp,
                                true
                            );
                        }
                        return insertProperty(fixer, co, "composite", true);
                    },
                    loc: referencesProp.loc,
                    messageId: "missingComposite",
                });
            },
        };
    },
    meta: {
        docs: {
            description:
                "require `composite: true` when `references` is defined.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: [
                "all",
                "project-references",
                "strict",
            ],
            url: createRuleDocsUrl("require-composite-for-references"),
        },
        fixable: "code",
        messages: {
            missingComposite:
                'Projects using `references` must enable `"composite": true` so TypeScript can build the dependency graph correctly. Add `"composite": true` to `compilerOptions`.',
        },
        schema: [],
        type: "problem",
    },
    name: "require-composite-for-references",
});

export default rule;
