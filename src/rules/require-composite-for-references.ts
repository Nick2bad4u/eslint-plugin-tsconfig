/**
 * @packageDocumentation
 * Rule: require-composite-for-references
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
                "require `composite: true` when `references` is defined.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: [
                "all",
                "project-references",
                "strict",
            ],
            url: createRuleDocsUrl("require-composite-for-references"),
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
