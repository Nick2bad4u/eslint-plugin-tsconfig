/**
 * @packageDocumentation
 * Rule: require-composite-for-references
 */
import type { JsoncRuleModule } from "../_internal/jsonc-rule.js";
import { createJsoncRule } from "../_internal/jsonc-rule.js";
import { getCompilerOptions } from "../_internal/jsonc-helpers.js";

const rule: JsoncRuleModule = createJsoncRule({
    name: "require-composite-for-references",
    meta: {
        type: "problem",
        docs: {
            description:
                "Require `composite: true` when `references` is defined.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: [
                "all",
                "project-references",
                "strict",
            ],
        },
        messages: {
            missingComposite:
                'Projects using `references` must enable `"composite": true` so TypeScript can build the dependency graph correctly. Add `"composite": true` to `compilerOptions`.',
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
