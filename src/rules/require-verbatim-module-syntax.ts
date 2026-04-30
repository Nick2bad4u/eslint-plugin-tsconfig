/**
 * @packageDocumentation
 * Rule: require-verbatim-module-syntax
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
                "require `verbatimModuleSyntax: true` in library configurations.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: ["all", "module-resolution"],
            url: createRuleDocsUrl("require-verbatim-module-syntax"),
        },
        fixable: "code",
        messages: {
            missingVerbatimModuleSyntax:
                "`verbatimModuleSyntax: true` ensures TypeScript emits `import`/`export` statements verbatim, making output predictable for bundlers and module systems. Add it to `compilerOptions`.",
        },
        schema: [],
        type: "suggestion",
    },
    name: "require-verbatim-module-syntax",
});

export default rule;
