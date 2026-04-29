/**
 * @packageDocumentation
 * Rule: require-bundler-module-resolution
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
                'require `moduleResolution: "bundler"` for projects using a bundler.',
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: ["all", "module-resolution"],
        },
        fixable: "code",
        messages: {
            missingBundlerResolution:
                'Projects using a bundler (Vite, esbuild, webpack, etc.) should set `"moduleResolution": "bundler"` to correctly resolve package `exports` and `imports` fields.',
        },
        schema: [],
        type: "suggestion",
    },
    name: "require-bundler-module-resolution",
});

export default rule;
