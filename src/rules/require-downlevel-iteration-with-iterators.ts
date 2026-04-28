/**
 * @packageDocumentation
 * Rule: require-downlevel-iteration-with-iterators
 */
import type { JsoncRuleModule } from "../_internal/jsonc-rule.js";

import { createJsoncRule } from "../_internal/jsonc-rule.js";

const rule: JsoncRuleModule = createJsoncRule({
    create() {
        return {
            JSONObjectExpression(_node) {            },
        };
    },
    meta: {
        docs: {
            description: "Require `downlevelIteration` when targeting pre-ES2015 with iterators.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: ["all", "lib-target"],
        },
        fixable: "code",
        messages: {
        missingDownlevelIteration: "Iterators and generators require `\"downlevelIteration\": true` when targeting environments older than ES2015 to emit correct iteration polyfills.",
        },
        schema: [],
            type: "suggestion",
    },
    name: "require-downlevel-iteration-with-iterators",
});

export default rule;
