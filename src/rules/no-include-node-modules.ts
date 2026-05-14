/**
 * @packageDocumentation
 * Rule: no-include-node-modules
 */
import { isDefined } from "ts-extras";

import type {
    JSONObjectExpression,
    JSONProperty,
} from "../_internal/jsonc-helpers.js";
import type { JsoncRuleModule } from "../_internal/jsonc-rule.js";

import {
    findProperty,
    getStringFromExpression,
    rangeWithAdjacentComma,
    reportViolation,
} from "../_internal/jsonc-helpers.js";
import { createJsoncRule } from "../_internal/jsonc-rule.js";
import { createRuleDocsUrl } from "../_internal/rule-docs-url.js";

/** Rule implementation for this tsconfig lint rule. */
const rule: JsoncRuleModule = createJsoncRule({
    create(context) {
        const NODE_MODULES_PATTERN = /node_modules/iv;

        return {
            JSONObjectExpression(node: Readonly<JSONObjectExpression>) {
                if (node.parent.type !== "JSONExpressionStatement") return;
                // Check root-level `include` (not inside compilerOptions)
                const includeProp: JSONProperty | undefined = findProperty(
                    node,
                    "include"
                );
                if (includeProp?.value.type !== "JSONArrayExpression") return;

                const elements = includeProp.value.elements;
                for (const element of elements) {
                    if (element === null) continue;
                    const value = getStringFromExpression(element);
                    if (!isDefined(value) || !NODE_MODULES_PATTERN.test(value))
                        continue;

                    reportViolation(context, {
                        data: { pattern: value },
                        fix(fixer) {
                            const removalRange = rangeWithAdjacentComma(
                                context.sourceCode.text,
                                element.range
                            );

                            return fixer.removeRange(removalRange);
                        },
                        loc: element.loc,
                        messageId: "nodeModulesInInclude",
                    });
                }
            },
        };
    },
    meta: {
        docs: {
            description:
                "disallow `include` patterns that match `node_modules`.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: [
                "all",
                "include-hygiene",
                "strict",
            ],
            url: createRuleDocsUrl("no-include-node-modules"),
        },
        fixable: "code",
        messages: {
            nodeModulesInInclude:
                '`include` pattern "{{pattern}}" can match `node_modules`. This forces TypeScript to type-check all dependencies, degrading performance significantly. Remove the pattern.',
        },
        schema: [],
        type: "problem",
    },
    name: "no-include-node-modules",
});

export default rule;
