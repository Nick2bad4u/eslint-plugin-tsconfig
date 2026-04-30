/**
 * @packageDocumentation
 * Rule: no-legacy-module-detection
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
                'disallow `moduleDetection: "legacy"` in compiler options.',
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: ["all", "module-resolution"],
            url: createRuleDocsUrl("no-legacy-module-detection"),
        },
        messages: {
            legacyModuleDetection:
                '`moduleDetection: "legacy"` uses the pre-TypeScript-4.7 behavior of treating a `.ts` file as a script (rather than a module) when it has no top-level `import` or `export`. Modern TypeScript and bundlers expect all `.ts` files to be modules. Use `"auto"` (TypeScript decides) or `"force"` (treat all files as modules) instead.',
        },
        schema: [],
        type: "suggestion",
    },
    name: "no-legacy-module-detection",
});

export default rule;
