/**
 * @packageDocumentation
 * Rule: require-no-unused-parameters
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
                "require `noUnusedParameters: true` to report declared but unused function parameters.",
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
            missingNoUnusedParameters:
                '`noUnusedParameters: true` reports an error for function parameters that are declared but never used inside the function body. This prevents accidental parameter drift during refactoring and keeps function signatures accurate. Parameters intentionally ignored can be prefixed with `_` to suppress the error. Add `"noUnusedParameters": true` to `compilerOptions`.',
        },
        schema: [],
        type: "suggestion",
    },
    name: "require-no-unused-parameters",
});

export default rule;
