/**
 * @packageDocumentation
 * Rule: require-declaration-with-composite
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
                "Require `declaration: true` when `composite: true` is set.",
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
            missingDeclaration:
                '`composite: true` implicitly requires `declaration: true`. Set `"declaration": true` explicitly to avoid confusion.',
        },
        schema: [],
        type: "problem",
    },
    name: "require-declaration-with-composite",
});

export default rule;
