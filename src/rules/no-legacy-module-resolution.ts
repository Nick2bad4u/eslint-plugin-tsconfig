/**
 * @packageDocumentation
 * Rule: no-legacy-module-resolution
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
                'disallow the legacy `"node"` `moduleResolution` is used.',
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: ["all", "module-resolution"],
            url: createRuleDocsUrl("no-legacy-module-resolution"),
        },
        messages: {
            legacyModuleResolution:
                '`moduleResolution: "node"` is the legacy Node.js resolution algorithm and does not support modern package.json `exports`. Use `"node16"`, `"nodenext"`, or `"bundler"` instead.',
        },
        schema: [],
        type: "suggestion",
    },
    name: "no-legacy-module-resolution",
});

export default rule;
