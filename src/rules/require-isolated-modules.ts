/**
 * @packageDocumentation
 * Rule: require-isolated-modules
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
                "require `isolatedModules: true` for single-file transpiler compatibility.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: ["all", "module-resolution"],
        },
        fixable: "code",
        messages: {
            missingIsolatedModules:
                '`isolatedModules: true` is required when using a bundler or transpiler that processes TypeScript files individually (Vite, esbuild, Parcel, SWC, Babel). Without it, TypeScript features that need cross-file type information — such as `const enum` — will compile but fail at runtime. Add `"isolatedModules": true` to `compilerOptions`.',
        },
        schema: [],
        type: "suggestion",
    },
    name: "require-isolated-modules",
});

export default rule;
