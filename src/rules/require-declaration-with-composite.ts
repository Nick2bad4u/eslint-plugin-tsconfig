/**
 * @packageDocumentation
 * Rule: require-declaration-with-composite
 */
import type { JsoncRuleModule } from "../_internal/jsonc-rule.js";
import { createJsoncRule } from "../_internal/jsonc-rule.js";
import { getCompilerOptions } from "../_internal/jsonc-helpers.js";

const rule: JsoncRuleModule = createJsoncRule({
    name: "require-declaration-with-composite",
    meta: {
        type: "problem",
        docs: {
            description:
                "Require `declaration: true` when `composite: true` is set.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: [
                "all",
                "project-references",
                "strict",
            ],
        },
        messages: {
            missingDeclaration:
                '`composite: true` implicitly requires `declaration: true`. Set `"declaration": true` explicitly to avoid confusion.',
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
