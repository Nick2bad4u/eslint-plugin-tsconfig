/**
 * @packageDocumentation
 * Rule: no-esmoduleinterop-with-verbatim
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
                "disallow `esModuleInterop: true` combined with `verbatimModuleSyntax: true`.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: [
                "all",
                "module-resolution",
                "strict",
            ],
            url: createRuleDocsUrl("no-esmoduleinterop-with-verbatim"),
        },
        fixable: "code",
        messages: {
            conflictingFlags:
                "`esModuleInterop: true` is unnecessary and can cause confusion when `verbatimModuleSyntax: true` is set. Remove `esModuleInterop` or set it to `false`.",
        },
        schema: [],
        type: "problem",
    },
    name: "no-esmoduleinterop-with-verbatim",
});

export default rule;
