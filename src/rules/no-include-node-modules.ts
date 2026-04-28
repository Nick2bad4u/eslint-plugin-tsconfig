/**
 * @packageDocumentation
 * Rule: no-include-node-modules
 */
import type { JsoncRuleModule } from "../_internal/jsonc-rule.js";
import { createJsoncRule } from "../_internal/jsonc-rule.js";
import { getCompilerOptions } from "../_internal/jsonc-helpers.js";

const rule: JsoncRuleModule = createJsoncRule({
    name: "no-include-node-modules",
    meta: {
        type: "problem",
        docs: {
            description:
                "Disallow `include` patterns that match `node_modules`.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: [
                "all",
                "include-hygiene",
                "strict",
            ],
        },
        messages: {
            nodeModulesInInclude:
                '`include` pattern "{{pattern}}" can match `node_modules`. This forces TypeScript to type-check all dependencies, degrading performance significantly. Remove the pattern.',
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
