/**
 * @packageDocumentation
 * Rule: no-include-dist
 */
import type { JsoncRuleModule } from "../_internal/jsonc-rule.js";

import { createJsoncRule } from "../_internal/jsonc-rule.js";
import { createRuleDocsUrl } from "../_internal/rule-docs-url.js";

/** Rule implementation for this tsconfig lint rule. */
const rule: JsoncRuleModule = createJsoncRule({
    create() {
        return {};
    },
    meta: {
        docs: {
            description:
                "disallow `include` patterns that capture the `dist` output folder.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: [
                "all",
                "include-hygiene",
                "strict",
            ],
            url: createRuleDocsUrl("no-include-dist"),
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
