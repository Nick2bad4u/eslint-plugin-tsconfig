/**
 * @packageDocumentation
 * Rule: require-strict-mode
 */
import type { JsoncRuleModule } from "../_internal/jsonc-rule.js";
import { createJsoncRule } from "../_internal/jsonc-rule.js";
import { getCompilerOptions } from "../_internal/jsonc-helpers.js";

const rule: JsoncRuleModule = createJsoncRule({
    name: "require-strict-mode",
    meta: {
        type: "suggestion",
        docs: {
            description: "Require `strict: true` in `compilerOptions`.",
            recommended: true,
            requiresTypeChecking: false,
            tsconfigConfigs: [
                "all",
                "strict-mode",
                "recommended",
                "strict",
            ],
        },
        messages: {
            missingStrict:
                '`strict: true` enables a collection of important type-safety checks (`noImplicitAny`, `strictNullChecks`, etc.). Add `"strict": true` to `compilerOptions`.',
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
