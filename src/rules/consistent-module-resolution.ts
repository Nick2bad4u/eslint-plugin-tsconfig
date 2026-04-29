/**
 * @packageDocumentation
 * Rule: consistent-module-resolution
 */
import type { JsoncRuleModule } from "../_internal/jsonc-rule.js";

import { createJsoncRule } from "../_internal/jsonc-rule.js";

/** Rule implementation for this tsconfig lint rule. */
const rule: JsoncRuleModule = createJsoncRule({
    create() {
        return {
            JSONObjectExpression() {},
        };
    },
    meta: {
        docs: {
            description:
                "enforce compatible `module` and `moduleResolution` settings.",
            recommended: true,
            requiresTypeChecking: false,
            tsconfigConfigs: [
                "all",
                "module-resolution",
                "recommended",
                "strict",
            ],
        },
        messages: {
            incompatibleModuleResolution:
                '`moduleResolution: "{{moduleResolution}}"` is incompatible with `module: "{{module}}"`. Update `moduleResolution` to a compatible value.',
        },
        schema: [],
        type: "problem",
    },
    name: "consistent-module-resolution",
});

export default rule;
