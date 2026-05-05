/**
 * @packageDocumentation
 * Rule: require-exclude-common-artifacts
 */

import { arrayAt, isDefined, isEmpty } from "ts-extras";

import type {
    JSONObjectExpression,
    JSONProperty,
} from "../_internal/jsonc-helpers.js";
import type { JsoncRuleModule } from "../_internal/jsonc-rule.js";

import {
    findProperty,
    getStringArrayElements,
    reportViolation,
} from "../_internal/jsonc-helpers.js";
import { createJsoncRule } from "../_internal/jsonc-rule.js";
import { createRuleDocsUrl } from "../_internal/rule-docs-url.js";

/** Rule implementation for this tsconfig lint rule. */
const rule: JsoncRuleModule = createJsoncRule({
    create(context) {
        const REQUIRED_EXCLUDES = ["node_modules", "dist"] as const;

        return {
            JSONObjectExpression(node: Readonly<JSONObjectExpression>) {
                if (node.parent?.type !== "JSONExpressionStatement") return;

                const excludeProp: JSONProperty | undefined = findProperty(
                    node,
                    "exclude"
                );

                // Only check when `exclude` is explicitly present — the config may
                // inherit exclusions from a base config when the key is absent.
                if (!isDefined(excludeProp)) return;

                let existingExcludes: string[] = [];
                if (excludeProp.value.type === "JSONArrayExpression") {
                    existingExcludes = getStringArrayElements(
                        excludeProp.value
                    );
                }

                for (const entry of REQUIRED_EXCLUDES) {
                    // eslint-disable-next-line typefest/prefer-ts-extras-array-includes -- existingExcludes is string[], not a union literal array; no narrowing benefit here
                    if (existingExcludes.includes(entry)) continue;

                    reportViolation(context, {
                        data: { entry },
                        fix(fixer) {
                            if (
                                excludeProp.value.type === "JSONArrayExpression"
                            ) {
                                const arr = excludeProp.value;
                                if (isEmpty(arr.elements)) {
                                    return fixer.replaceTextRange(
                                        (
                                            arr as unknown as {
                                                range: [number, number];
                                            }
                                        ).range,
                                        `["${entry}"]`
                                    );
                                }
                                const lastEl = arrayAt(arr.elements, -1);
                                if (lastEl === null) return null;
                                return fixer.insertTextAfterRange(
                                    (
                                        lastEl as unknown as {
                                            range: [number, number];
                                        }
                                    ).range,
                                    `, "${entry}"`
                                );
                            }
                            return null;
                        },
                        loc: excludeProp.loc,
                        messageId: "missingExcludeEntry",
                    });
                }
            },
        };
    },
    meta: {
        docs: {
            description:
                "require common build-artifact directories in `exclude`.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: ["all", "include-hygiene"],
            url: createRuleDocsUrl("require-exclude-common-artifacts"),
        },
        fixable: "code",
        messages: {
            missingExcludeEntry:
                'The `exclude` array should contain "{{entry}}" to prevent TypeScript from processing build artifacts and installed packages.',
        },
        schema: [],
        type: "suggestion",
    },
    name: "require-exclude-common-artifacts",
});

export default rule;
