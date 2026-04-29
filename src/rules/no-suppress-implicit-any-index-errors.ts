/**
 * @packageDocumentation
 * Rule: no-suppress-implicit-any-index-errors
 */
import type { JsoncRuleModule } from "../_internal/jsonc-rule.js";

import { createJsoncRule } from "../_internal/jsonc-rule.js";

/** Rule implementation for this tsconfig lint rule. */
const rule: JsoncRuleModule = createJsoncRule({
    create() {
        return {
            JSONObjectExpression() {},
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
