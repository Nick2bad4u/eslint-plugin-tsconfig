/**
 * @packageDocumentation
 * Rule: no-include-node-modules
 */
import { arrayFirst, isDefined } from "ts-extras";

import type {
    JSONObjectExpression,
    JSONProperty,
} from "../_internal/jsonc-helpers.js";
import type { JsoncRuleModule } from "../_internal/jsonc-rule.js";

import {
    findProperty,
    getStringFromExpression,
    reportViolation,
} from "../_internal/jsonc-helpers.js";
import { createJsoncRule } from "../_internal/jsonc-rule.js";
import { createRuleDocsUrl } from "../_internal/rule-docs-url.js";

/** Rule implementation for this tsconfig lint rule. */
const rule: JsoncRuleModule = createJsoncRule({
    create(context) {
        const NODE_MODULES_PATTERN = /node_modules/i;

        return {
            JSONObjectExpression(node: Readonly<JSONObjectExpression>) {
                if (node.parent?.type !== "JSONExpressionStatement") return;
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
                            const sourceCode = context.sourceCode;
                            const tokenAfter = sourceCode.getTokenAfter(
                                element as unknown as Parameters<
                                    typeof sourceCode.getTokenAfter
                                >[0]
                            );
                            const tokenBefore = sourceCode.getTokenBefore(
                                element as unknown as Parameters<
                                    typeof sourceCode.getTokenBefore
                                >[0]
                            );
                            if (tokenAfter?.value === ",") {
                                return fixer.removeRange([
                                    arrayFirst(
                                        (
                                            element as unknown as {
                                                range: [number, number];
                                            }
                                        ).range
                                    ),
                                    (
                                        tokenAfter as unknown as {
                                            range: [number, number];
                                        }
                                    ).range[1],
                                ]);
                            }
                            if (tokenBefore?.value === ",") {
                                return fixer.removeRange([
                                    arrayFirst(
                                        (
                                            tokenBefore as unknown as {
                                                range: [number, number];
                                            }
                                        ).range
                                    ),
                                    (
                                        element as unknown as {
                                            range: [number, number];
                                        }
                                    ).range[1],
                                ]);
                            }
                            return fixer.removeRange(
                                (
                                    element as unknown as {
                                        range: [number, number];
                                    }
                                ).range
                            );
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
