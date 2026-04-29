/**
 * @packageDocumentation
 * Rule: require-outdir-when-emitting
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
                "require `outDir` when TypeScript is configured to emit files.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: [
                "all",
                "emit-config",
                "strict",
            ],
        },
        messages: {
            missingOutDir:
                "When emitting JavaScript files (`noEmit` is not set), `outDir` should be specified to prevent output files from being written alongside source files.",
        },
        schema: [],
        type: "problem",
    },
    name: "require-outdir-when-emitting",
});

export default rule;
