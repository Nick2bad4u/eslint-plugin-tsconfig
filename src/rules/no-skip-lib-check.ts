/**
 * @packageDocumentation
 * Rule: no-skip-lib-check
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
            description: "Warn when `skipLibCheck: true` is used.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: ["all", "include-hygiene"],
        },
        messages: {
        skipLibCheck: "`skipLibCheck: true` silences type errors in `.d.ts` files, masking real problems in dependencies. Remove this option or accept the type errors it was hiding.",
        },
        schema: [],
        type: "suggestion",
    },
    name: "no-skip-lib-check",
});

export default rule;
