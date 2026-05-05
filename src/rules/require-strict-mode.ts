import { isDefined } from "ts-extras";

/**
 * @packageDocumentation
 * Rule: require-strict-mode
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

                const prop: JSONProperty | undefined = findProperty(
                    co,
                    "strict"
                );

                if (isDefined(prop) && getBooleanValue(prop) === true) return;

                reportViolation(context, {
                    fix(fixer) {
                        if (isDefined(prop)) {
                            return replacePropertyValue(fixer, prop, true);
                        }
                        return insertProperty(fixer, co, "strict", true);
                    },
                    loc: (prop ?? co).loc,
                    messageId: "missingStrict",
                });
            },
        };
    },
    meta: {
        docs: {
            description: "require `strict: true` in `compilerOptions`.",
            recommended: true,
            requiresTypeChecking: false,
            tsconfigConfigs: [
                "all",
                "strict-mode",
                "recommended",
                "strict",
            ],
            url: createRuleDocsUrl("require-strict-mode"),
        },
        fixable: "code",
        messages: {
            missingStrict:
                '`strict: true` enables a collection of important type-safety checks (`noImplicitAny`, `strictNullChecks`, etc.). Add `"strict": true` to `compilerOptions`.',
        },
        schema: [],
        type: "suggestion",
    },
    name: "require-strict-mode",
});

export default rule;
