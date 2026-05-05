/**
 * @packageDocumentation
 * Rule: no-esmoduleinterop-with-verbatim
 */
import { arrayFirst, isDefined } from "ts-extras";

import type {
    JSONObjectExpression,
    JSONProperty,
} from "../_internal/jsonc-helpers.js";
import type { JsoncRuleModule } from "../_internal/jsonc-rule.js";

import {
    findProperty,
    getBooleanValue,
    getCompilerOptions,
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

                const esModuleInteropProp: JSONProperty | undefined =
                    findProperty(co, "esModuleInterop");
                if (
                    !isDefined(esModuleInteropProp) ||
                    getBooleanValue(esModuleInteropProp) !== true
                )
                    return;

                const verbatimProp: JSONProperty | undefined = findProperty(
                    co,
                    "verbatimModuleSyntax"
                );
                if (
                    !isDefined(verbatimProp) ||
                    getBooleanValue(verbatimProp) !== true
                )
                    return;

                reportViolation(context, {
                    fix(fixer) {
                        const sourceCode = context.sourceCode;
                        const tokenAfter = sourceCode.getTokenAfter(
                            esModuleInteropProp as unknown as Parameters<
                                typeof sourceCode.getTokenAfter
                            >[0]
                        );
                        const tokenBefore = sourceCode.getTokenBefore(
                            esModuleInteropProp as unknown as Parameters<
                                typeof sourceCode.getTokenBefore
                            >[0]
                        );
                        if (tokenAfter?.value === ",") {
                            return fixer.removeRange([
                                arrayFirst(
                                    (
                                        esModuleInteropProp as unknown as {
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
                                    esModuleInteropProp as unknown as {
                                        range: [number, number];
                                    }
                                ).range[1],
                            ]);
                        }
                        return fixer.removeRange(
                            (
                                esModuleInteropProp as unknown as {
                                    range: [number, number];
                                }
                            ).range
                        );
                    },
                    loc: esModuleInteropProp.loc,
                    messageId: "conflictingFlags",
                });
            },
        };
    },
    meta: {
        docs: {
            description:
                "disallow `esModuleInterop: true` combined with `verbatimModuleSyntax: true`.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: [
                "all",
                "module-resolution",
                "strict",
            ],
            url: createRuleDocsUrl("no-esmoduleinterop-with-verbatim"),
        },
        fixable: "code",
        messages: {
            conflictingFlags:
                "`esModuleInterop: true` is unnecessary and can cause confusion when `verbatimModuleSyntax: true` is set. Remove `esModuleInterop` or set it to `false`.",
        },
        schema: [],
        type: "problem",
    },
    name: "no-esmoduleinterop-with-verbatim",
});

export default rule;
