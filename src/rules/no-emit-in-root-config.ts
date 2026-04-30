/**
 * @packageDocumentation
 * Rule: no-emit-in-root-config
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
                "require `noEmit: true` in root `tsconfig.json` files.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: [
                "all",
                "project-references",
                "emit-config",
            ],
            url: createRuleDocsUrl("no-emit-in-root-config"),
        },
        fixable: "code",
        messages: {
            missingNoEmit:
                'Root `tsconfig.json` should set `"noEmit": true` and delegate compilation to project-reference configs. Add `"noEmit": true` to `compilerOptions`.',
        },
        schema: [],
        type: "suggestion",
    },
    name: "no-emit-in-root-config",
});

export default rule;
