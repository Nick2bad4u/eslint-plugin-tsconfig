/**
 * @packageDocumentation
 * Rule: consistent-incremental-with-tsbuildinfo
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
                "require `tsBuildInfoFile` when `incremental: true` is set.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: ["all", "emit-config"],
        },
        fixable: "code",
        messages: {
            missingTsBuildInfoFile:
                'When `incremental: true` is set, `tsBuildInfoFile` should also be specified to control the incremental cache location. Add `"tsBuildInfoFile": ".tsbuildinfo"` to `compilerOptions`.',
        },
        schema: [],
        type: "suggestion",
    },
    name: "consistent-incremental-with-tsbuildinfo",
});

export default rule;
