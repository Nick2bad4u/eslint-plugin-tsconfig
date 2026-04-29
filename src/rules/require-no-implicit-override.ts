/**
 * @packageDocumentation
 * Rule: require-no-implicit-override
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
            description: "require `noImplicitOverride: true`.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: ["all", "strict-mode"],
        },
        fixable: "code",
        messages: {
            missingNoImplicitOverride:
                "`noImplicitOverride: true` forces the `override` keyword on methods that override base-class members, preventing silent shadowing bugs. Add it to `compilerOptions`.",
        },
        schema: [],
        type: "suggestion",
    },
    name: "require-no-implicit-override",
});

export default rule;
