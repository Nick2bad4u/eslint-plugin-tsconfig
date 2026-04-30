/**
 * @packageDocumentation
 * Rule: no-rootdir-includes-outdir
 */
import type { JsoncRuleModule } from "../_internal/jsonc-rule.js";

import { createJsoncRule } from "../_internal/jsonc-rule.js";
import { createRuleDocsUrl } from "../_internal/rule-docs-url.js";

/** Rule implementation for this tsconfig lint rule. */
const rule: JsoncRuleModule = createJsoncRule({
    create() {
        return {};
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
            url: createRuleDocsUrl("no-rootdir-includes-outdir"),
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
