import { isDefined } from "ts-extras";

/**
 * @packageDocumentation
 * Rule: require-use-unknown-in-catch-variables
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

                // `strict: true` implicitly enables `useUnknownInCatchVariables`.
                const strictProp = findProperty(co, "strict");
                if (
                    isDefined(strictProp) &&
                    getBooleanValue(strictProp) === true
                )
                    return;

                const prop: JSONProperty | undefined = findProperty(
                    co,
                    "useUnknownInCatchVariables"
                );
                if (isDefined(prop) && getBooleanValue(prop) === true) return;

                reportViolation(context, {
                    fix(fixer) {
                        if (isDefined(prop)) {
                            return replacePropertyValue(fixer, prop, true);
                        }
                        return insertProperty(
                            fixer,
                            co,
                            "useUnknownInCatchVariables",
                            true
                        );
                    },
                    loc: (prop ?? co).loc,
                    messageId: "missingUseUnknownInCatchVariables",
                });
            },
        };
    },
    meta: {
        docs: {
            description:
                "require `useUnknownInCatchVariables: true` in compiler options.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: [
                "all",
                "strict-mode",
                "strictest",
            ],
            url: createRuleDocsUrl("require-use-unknown-in-catch-variables"),
        },
        fixable: "code",
        messages: {
            missingUseUnknownInCatchVariables:
                '`useUnknownInCatchVariables: true` types catch-clause variables as `unknown` instead of `any`, forcing you to narrow the type before accessing properties. Add `"useUnknownInCatchVariables": true` to `compilerOptions`.',
        },
        schema: [],
        type: "suggestion",
    },
    name: "require-use-unknown-in-catch-variables",
});

export default rule;
