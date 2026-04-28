/**
 * @packageDocumentation
 * Rule: no-rootdir-includes-outdir
 */
import type { JsoncRuleModule } from "../_internal/jsonc-rule.js";
import { createJsoncRule } from "../_internal/jsonc-rule.js";
import { getCompilerOptions } from "../_internal/jsonc-helpers.js";

const rule: JsoncRuleModule = createJsoncRule({
    name: "no-rootdir-includes-outdir",
    meta: {
        type: "problem",
        docs: {
            description:
                "Disallow `rootDir` configurations that would include `outDir`.",
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
    },
    create(context) {
        return {
            JSONObjectExpression(node) {
                const compilerOptions = getCompilerOptions(node);
                if (compilerOptions === undefined) {
                    return;
                }

                // TODO: implement rule logic
                void compilerOptions;
                void context;
            },
        };
    },
});

export default rule;
