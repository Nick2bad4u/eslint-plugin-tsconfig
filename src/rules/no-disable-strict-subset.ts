/**
 * @packageDocumentation
 * Rule: no-disable-strict-subset
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
                "disallow disabling individual strict-mode sub-flags when `strict: true` is set.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: [
                "all",
                "strict-mode",
                "strict",
            ],
        },
        messages: {
            disabledStrictSubflag:
                'Setting `"{{flag}}": false` undoes part of `strict: true`. Remove this override or disable `strict` explicitly.',
        },
        schema: [],
        type: "problem",
    },
    name: "no-disable-strict-subset",
});

export default rule;
