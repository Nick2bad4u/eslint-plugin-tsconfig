/**
 * @packageDocumentation
 * Rule: no-declaration-only-without-declaration
 */
import type { JsoncRuleModule } from "../_internal/jsonc-rule.js";
import { createJsoncRule } from "../_internal/jsonc-rule.js";
import { getCompilerOptions } from "../_internal/jsonc-helpers.js";

const rule: JsoncRuleModule = createJsoncRule({
    name: "no-declaration-only-without-declaration",
    meta: {
        type: "problem",
        docs: {
            description:
                "Disallow `emitDeclarationOnly: true` when `declaration` is `false`.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: [
                "all",
                "emit-config",
                "strict",
            ],
        },
        messages: {
            missingDeclaration:
                '`emitDeclarationOnly: true` has no effect when `declaration` is not enabled. Set `"declaration": true` in `compilerOptions`.',
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
