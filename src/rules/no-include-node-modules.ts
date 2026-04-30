/**
 * @packageDocumentation
 * Rule: no-include-node-modules
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
                "disallow `include` patterns that match `node_modules`.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: [
                "all",
                "include-hygiene",
                "strict",
            ],
            url: createRuleDocsUrl("no-include-node-modules"),
        },
        fixable: "code",
        messages: {
            nodeModulesInInclude:
                '`include` pattern "{{pattern}}" can match `node_modules`. This forces TypeScript to type-check all dependencies, degrading performance significantly. Remove the pattern.',
        },
        schema: [],
        type: "problem",
    },
    name: "no-include-node-modules",
});

export default rule;
