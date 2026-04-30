/**
 * @packageDocumentation
 * Rule: require-declaration-with-composite
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
                "require `declaration: true` when `composite: true` is set.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: [
                "all",
                "project-references",
                "strict",
            ],
            url: createRuleDocsUrl("require-declaration-with-composite"),
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
