/**
 * @packageDocumentation
 * Rule: no-rootdir-includes-outdir
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
                "disallow `rootDir` configurations that would include `outDir`.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: [
                "all",
                "emit-config",
                "strict",
            ],
        },
        messages: {
            rootDirIncludesOutDir:
                '`outDir: "{{outDir}}"` is inside `rootDir: "{{rootDir}}"`, which causes TypeScript to include compiled output in the next build. Set `outDir` outside `rootDir` or add it to `exclude`.',
        },
        schema: [],
        type: "problem",
    },
    name: "no-rootdir-includes-outdir",
});

export default rule;
