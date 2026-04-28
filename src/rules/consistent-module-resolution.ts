/**
 * @packageDocumentation
 * Rule: consistent-module-resolution
 */
import type { JsoncRuleModule } from "../_internal/jsonc-rule.js";
import { createJsoncRule } from "../_internal/jsonc-rule.js";
import { getCompilerOptions } from "../_internal/jsonc-helpers.js";

const rule: JsoncRuleModule = createJsoncRule({
    name: "consistent-module-resolution",
    meta: {
        type: "problem",
        docs: {
            description:
                "Enforce compatible `module` and `moduleResolution` settings.",
            recommended: true,
            requiresTypeChecking: false,
            tsconfigConfigs: [
                "all",
                "module-resolution",
                "recommended",
                "strict",
            ],
        },
        messages: {
            incompatibleModuleResolution:
                '`moduleResolution: "{{moduleResolution}}"` is incompatible with `module: "{{module}}"`. Update `moduleResolution` to a compatible value.',
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
