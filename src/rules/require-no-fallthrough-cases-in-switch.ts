import { isDefined } from "ts-extras";

/**
 * @packageDocumentation
 * Rule: require-no-fallthrough-cases-in-switch
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
                    "noFallthroughCasesInSwitch"
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
                            "noFallthroughCasesInSwitch",
                            true
                        );
                    },
                    loc: (prop ?? co).loc,
                    messageId: "missingNoFallthroughCasesInSwitch",
                });
            },
        };
    },
    meta: {
        docs: {
            description:
                "require `noFallthroughCasesInSwitch: true` to catch unintentional switch fall-throughs.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: [
                "all",
                "strict-mode",
                "strictest",
            ],
            url: createRuleDocsUrl("require-no-fallthrough-cases-in-switch"),
        },
        fixable: "code",
        messages: {
            missingNoFallthroughCasesInSwitch:
                '`noFallthroughCasesInSwitch: true` reports an error for any `switch` case that does not end with a `break`, `return`, or `throw`. Accidental fall-through is one of the most common sources of switch-statement bugs. Add `"noFallthroughCasesInSwitch": true` to `compilerOptions`.',
        },
        schema: [],
        type: "suggestion",
    },
    name: "require-no-fallthrough-cases-in-switch",
});

export default rule;
