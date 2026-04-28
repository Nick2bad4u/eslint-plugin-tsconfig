/**
 * @packageDocumentation
 * Rule: consistent-module-resolution
 */
import type { JsoncRuleModule } from "../_internal/jsonc-rule.js";

import { createJsoncRule } from "../_internal/jsonc-rule.js";

const rule: JsoncRuleModule = createJsoncRule({
    create() {
        return {
            JSONObjectExpression(_node) {            },
        };
    },
    meta: {
        docs: {
            description:
                "Enforce compatible `module` and `moduleResolution` settings.",
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
