/**
 * @packageDocumentation
 * Rule: require-no-fallthrough-cases-in-switch
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
                "require `noFallthroughCasesInSwitch: true` to catch unintentional switch fall-throughs.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: [
                "all",
                "strict-mode",
                "strictest",
            ],
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
