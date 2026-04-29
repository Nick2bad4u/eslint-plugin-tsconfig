/**
 * @packageDocumentation
 * Rule: require-source-map-in-dev
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
                "require `sourceMap: true` in development and watch configurations.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: ["all", "emit-config"],
        },
        fixable: "code",
        messages: {
            missingSourceMap:
                'Development and watch configurations should enable `"sourceMap": true` to allow debuggers to map compiled output back to source. Add it to `compilerOptions`.',
        },
        schema: [],
        type: "suggestion",
    },
    name: "require-source-map-in-dev",
});

export default rule;
