/**
 * @packageDocumentation
 * Rule: no-declaration-only-without-declaration
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
                "Disallow `emitDeclarationOnly: true` when `declaration` is `false`.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: [
                "all",
                "emit-config",
                "strict",
            ],
        },
        fixable: "code",
        messages: {
            missingDeclaration:
                '`emitDeclarationOnly: true` has no effect when `declaration` is not enabled. Set `"declaration": true` in `compilerOptions`.',
        },
        schema: [],
        type: "problem",
    },
    name: "no-declaration-only-without-declaration",
});

export default rule;
