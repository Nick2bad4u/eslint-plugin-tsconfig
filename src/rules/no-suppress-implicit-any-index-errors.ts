import { isDefined } from "ts-extras";

/**
 * @packageDocumentation
 * Rule: no-suppress-implicit-any-index-errors
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
        return {
            JSONObjectExpression(node: Readonly<JSONObjectExpression>) {
                if (node.parent?.type !== "JSONExpressionStatement") return;
                const co = getCompilerOptions(node);
                if (!co) return;

                const prop: JSONProperty | undefined = findProperty(
                    co,
                    "suppressImplicitAnyIndexErrors"
                );

                if (!isDefined(prop)) return;
                if (getBooleanValue(prop) !== true) return;

                reportViolation(context, {
                    loc: prop.loc,
                    messageId: "suppressImplicitAnyIndexErrors",
                });
            },
        };
    },
    meta: {
        docs: {
            description:
                "disallow `suppressImplicitAnyIndexErrors: true` in compiler options.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: [
                "all",
                "strict-mode",
                "strictest",
            ],
            url: createRuleDocsUrl("no-suppress-implicit-any-index-errors"),
        },
        messages: {
            suppressImplicitAnyIndexErrors:
                "`suppressImplicitAnyIndexErrors: true` silences `noImplicitAny` errors that arise from index-signature access, creating a hole in strict-mode coverage. Remove this option and explicitly type index-signature accesses instead.",
        },
        schema: [],
        type: "problem",
    },
    name: "no-suppress-implicit-any-index-errors",
});

export default rule;
