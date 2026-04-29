/**
 * @packageDocumentation
 * Rule: require-use-unknown-in-catch-variables
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
                "require `useUnknownInCatchVariables: true` in compiler options.",
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
            missingUseUnknownInCatchVariables:
                '`useUnknownInCatchVariables: true` types catch-clause variables as `unknown` instead of `any`, forcing you to narrow the type before accessing properties. Add `"useUnknownInCatchVariables": true` to `compilerOptions`.',
        },
        schema: [],
        type: "suggestion",
    },
    name: "require-use-unknown-in-catch-variables",
});

export default rule;
