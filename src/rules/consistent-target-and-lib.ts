/**
 * @packageDocumentation
 * Rule: consistent-target-and-lib
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
            description: "Warn when `lib` entries are inconsistent with `target`.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: ["all", "lib-target"],
        },
        messages: {
        inconsistentTargetAndLib: "`lib` contains \"{{libEntry}}\" which is newer than `target: \"{{target}}\"`. Consider aligning `lib` with the target or upgrading `target`.",
        },
        schema: [],
        type: "suggestion",
    },
    name: "consistent-target-and-lib",
});

export default rule;
