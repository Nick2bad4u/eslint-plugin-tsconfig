/**
 * @packageDocumentation
 * Rule: no-include-dist
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
            description:
                "Disallow `include` patterns that capture the `dist` output folder.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: [
                "all",
                "include-hygiene",
                "strict",
            ],
        },
        messages: {
            distInInclude:
                '`include` pattern "{{pattern}}" matches the `dist` output folder. This causes TypeScript to process compiled output, leading to duplicate declarations. Remove the pattern or add `dist` to `exclude`.',
        },
        schema: [],
        type: "problem",
    },
    name: "no-include-dist",
});

export default rule;
