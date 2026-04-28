/**
 * @packageDocumentation
 * Rule: require-strict-mode
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
            description: "Require `strict: true` in `compilerOptions`.",
            recommended: true,
            requiresTypeChecking: false,
            tsconfigConfigs: [
                "all",
                "strict-mode",
                "recommended",
                "strict",
            ],
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
