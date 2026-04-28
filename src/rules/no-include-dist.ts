/**
 * @packageDocumentation
 * Rule: no-include-dist
 */
import type { JsoncRuleModule } from "../_internal/jsonc-rule.js";
import { createJsoncRule } from "../_internal/jsonc-rule.js";
import { getCompilerOptions } from "../_internal/jsonc-helpers.js";

const rule: JsoncRuleModule = createJsoncRule({
    name: "no-include-dist",
    meta: {
        type: "problem",
        docs: {
            description:
                "Disallow `include` patterns that capture the `dist` output folder.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: [
                "all",
                "include-hygiene",
                "strict",
            ],
        },
        messages: {
            distInInclude:
                '`include` pattern "{{pattern}}" matches the `dist` output folder. This causes TypeScript to process compiled output, leading to duplicate declarations. Remove the pattern or add `dist` to `exclude`.',
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
