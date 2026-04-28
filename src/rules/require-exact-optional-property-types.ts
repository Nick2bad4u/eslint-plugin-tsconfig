/**
 * @packageDocumentation
 * Rule: require-exact-optional-property-types
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
            description: "Require `exactOptionalPropertyTypes: true` in strict configs.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: ["all", "strict-mode"],
        },
        fixable: "code",
        messages: {
        missingExactOptionalPropertyTypes: "`exactOptionalPropertyTypes: true` makes TypeScript distinguish between `{ x?: number }` (property may be absent) and `{ x: number | undefined }` (property must be present). Add it to `compilerOptions` for stronger type safety.",
        },
        schema: [],
            type: "suggestion",
    },
    name: "require-exact-optional-property-types",
});

export default rule;
