/**
 * @packageDocumentation
 * Rule: require-composite-for-references
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
                "Require `composite: true` when `references` is defined.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: [
                "all",
                "project-references",
                "strict",
            ],
        },
        fixable: "code",
        messages: {
            missingComposite:
                'Projects using `references` must enable `"composite": true` so TypeScript can build the dependency graph correctly. Add `"composite": true` to `compilerOptions`.',
        },
        schema: [],
        type: "problem",
    },
    name: "require-composite-for-references",
});

export default rule;
