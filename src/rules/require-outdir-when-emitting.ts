/**
 * @packageDocumentation
 * Rule: require-outdir-when-emitting
 */
import type { JsoncRuleModule } from "../_internal/jsonc-rule.js";
import { createJsoncRule } from "../_internal/jsonc-rule.js";
import { getCompilerOptions } from "../_internal/jsonc-helpers.js";

const rule: JsoncRuleModule = createJsoncRule({
    name: "require-outdir-when-emitting",
    meta: {
        type: "problem",
        docs: {
            description:
                "Require `outDir` when TypeScript is configured to emit files.",
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
