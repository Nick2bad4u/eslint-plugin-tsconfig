import { isDefined } from "ts-extras";

/**
 * @packageDocumentation
 * Rule: require-no-property-access-from-index-signature
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
                    "noPropertyAccessFromIndexSignature"
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
                            "noPropertyAccessFromIndexSignature",
                            true
                        );
                    },
                    loc: (prop ?? co).loc,
                    messageId: "missingNoPropertyAccessFromIndexSignature",
                });
            },
        };
    },
    meta: {
        docs: {
            description:
                "require `noPropertyAccessFromIndexSignature: true` to enforce consistent bracket notation for index-signature access.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: [
                "all",
                "strict-mode",
                "strictest",
            ],
            url: createRuleDocsUrl(
                "require-no-property-access-from-index-signature"
            ),
        },
        fixable: "code",
        messages: {
            missingNoPropertyAccessFromIndexSignature:
                '`noPropertyAccessFromIndexSignature: true` requires bracket notation (`obj["key"]`) for properties defined by index signatures, distinguishing them visually from known declared properties that can use dot notation (`obj.key`). This makes it clear at the call site that the access may return `undefined`. Add `"noPropertyAccessFromIndexSignature": true` to `compilerOptions`.',
        },
        schema: [],
        type: "suggestion",
    },
    name: "require-no-property-access-from-index-signature",
});

export default rule;
