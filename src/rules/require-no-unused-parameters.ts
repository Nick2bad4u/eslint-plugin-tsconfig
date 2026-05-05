import { isDefined } from "ts-extras";

/**
 * @packageDocumentation
 * Rule: require-no-unused-parameters
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
                    "noUnusedParameters"
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
                            "noUnusedParameters",
                            true
                        );
                    },
                    loc: (prop ?? co).loc,
                    messageId: "missingNoUnusedParameters",
                });
            },
        };
    },
    meta: {
        docs: {
            description:
                "require `noUnusedParameters: true` to report declared but unused function parameters.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: [
                "all",
                "strict-mode",
                "strictest",
            ],
            url: createRuleDocsUrl("require-no-unused-parameters"),
        },
        fixable: "code",
        messages: {
            missingNoUnusedParameters:
                '`noUnusedParameters: true` reports an error for function parameters that are declared but never used inside the function body. This prevents accidental parameter drift during refactoring and keeps function signatures accurate. Parameters intentionally ignored can be prefixed with `_` to suppress the error. Add `"noUnusedParameters": true` to `compilerOptions`.',
        },
        schema: [],
        type: "suggestion",
    },
    name: "require-no-unused-parameters",
});

export default rule;
