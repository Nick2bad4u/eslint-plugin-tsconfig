import { isDefined } from "ts-extras";

/**
 * @packageDocumentation
 * Rule: require-no-unused-locals
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
                    "noUnusedLocals"
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
                            "noUnusedLocals",
                            true
                        );
                    },
                    loc: (prop ?? co).loc,
                    messageId: "missingNoUnusedLocals",
                });
            },
        };
    },
    meta: {
        docs: {
            description:
                "require `noUnusedLocals: true` to report declared but unused local variables.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: [
                "all",
                "strict-mode",
                "strictest",
            ],
            url: createRuleDocsUrl("require-no-unused-locals"),
        },
        fixable: "code",
        messages: {
            missingNoUnusedLocals:
                '`noUnusedLocals: true` reports an error for any local variable, import, or destructured binding that is declared but never read. This prevents dead code accumulation and clarifies intent. Add `"noUnusedLocals": true` to `compilerOptions`.',
        },
        schema: [],
        type: "suggestion",
    },
    name: "require-no-unused-locals",
});

export default rule;
