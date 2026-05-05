import { isDefined } from "ts-extras";

/**
 * @packageDocumentation
 * Rule: no-disable-strict-subset
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
    reportViolation,
} from "../_internal/jsonc-helpers.js";
import { createJsoncRule } from "../_internal/jsonc-rule.js";
import { createRuleDocsUrl } from "../_internal/rule-docs-url.js";

/** Rule implementation for this tsconfig lint rule. */
const rule: JsoncRuleModule = createJsoncRule({
    create(context) {
        const STRICT_SUBSET_FLAGS: readonly string[] = [
            "alwaysStrict",
            "noImplicitAny",
            "noImplicitThis",
            "strictBindCallApply",
            "strictBuiltinIteratorReturn",
            "strictFunctionTypes",
            "strictNullChecks",
            "strictPropertyInitialization",
            "useUnknownInCatchVariables",
        ];

        return {
            JSONObjectExpression(node: Readonly<JSONObjectExpression>) {
                if (node.parent?.type !== "JSONExpressionStatement") return;
                const co = getCompilerOptions(node);
                if (!co) return;

                const strictProp: JSONProperty | undefined = findProperty(
                    co,
                    "strict"
                );
                if (
                    !isDefined(strictProp) ||
                    getBooleanValue(strictProp) !== true
                )
                    return;

                for (const flag of STRICT_SUBSET_FLAGS) {
                    const flagProp: JSONProperty | undefined = findProperty(
                        co,
                        flag
                    );
                    if (!isDefined(flagProp)) continue;
                    if (getBooleanValue(flagProp) !== false) continue;

                    reportViolation(context, {
                        data: { flag },
                        loc: flagProp.loc,
                        messageId: "disabledStrictSubflag",
                    });
                }
            },
        };
    },
    meta: {
        docs: {
            description:
                "disallow disabling individual strict-mode sub-flags when `strict: true` is set.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: [
                "all",
                "strict-mode",
                "strict",
            ],
            url: createRuleDocsUrl("no-disable-strict-subset"),
        },
        messages: {
            disabledStrictSubflag:
                'Setting `"{{flag}}": false` undoes part of `strict: true`. Remove this override or disable `strict` explicitly.',
        },
        schema: [],
        type: "problem",
    },
    name: "no-disable-strict-subset",
});

export default rule;
