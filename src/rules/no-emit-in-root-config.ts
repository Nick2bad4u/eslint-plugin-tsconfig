/**
 * @packageDocumentation
 * Rule: no-emit-in-root-config
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
                "require `noEmit: true` in root `tsconfig.json` files.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: [
                "all",
                "project-references",
                "emit-config",
            ],
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
