/**
 * @packageDocumentation
 * Rule: require-no-unchecked-indexed-access
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
            description: "Require `noUncheckedIndexedAccess: true` in strict configs.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: ["all", "strict-mode"],
        },
        fixable: "code",
        messages: {
        missingNoUncheckedIndexedAccess: "`noUncheckedIndexedAccess: true` adds `undefined` to array index signatures and index-signature types, preventing runtime errors from out-of-bounds access. Add it to `compilerOptions`.",
        },
        schema: [],
            type: "suggestion",
    },
    name: "require-no-unchecked-indexed-access",
});

export default rule;
