/**
 * @packageDocumentation
 * Rule: no-esmoduleinterop-with-verbatim
 */
import type { JsoncRuleModule } from "../_internal/jsonc-rule.js";
import { createJsoncRule } from "../_internal/jsonc-rule.js";
import { getCompilerOptions } from "../_internal/jsonc-helpers.js";

const rule: JsoncRuleModule = createJsoncRule({
    name: "no-esmoduleinterop-with-verbatim",
    meta: {
        type: "problem",
        docs: {
            description:
                "Disallow `esModuleInterop: true` combined with `verbatimModuleSyntax: true`.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: [
                "all",
                "module-resolution",
                "strict",
            ],
        },
        messages: {
            conflictingFlags:
                "`esModuleInterop: true` is unnecessary and can cause confusion when `verbatimModuleSyntax: true` is set. Remove `esModuleInterop` or set it to `false`.",
        },
        schema: [],
        fixable: "code",
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
