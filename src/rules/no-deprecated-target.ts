/**
 * @packageDocumentation
 * Rule: no-deprecated-target
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
                "disallow obsolete `target` values below ES2015 in compiler options.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: ["all", "lib-target"],
            url: createRuleDocsUrl("no-deprecated-target"),
        },
        messages: {
            deprecatedTarget:
                '`target: "{{target}}"` compiles to an obsolete JavaScript version. All modern runtimes support ES2015 (Chrome 51+, Node.js 6+, Edge 14+, Firefox 54+, Safari 10+). Use `target: "ES2015"` or higher to take advantage of native language features and smaller output.',
        },
        schema: [],
        type: "suggestion",
    },
    name: "no-deprecated-target",
});

export default rule;
