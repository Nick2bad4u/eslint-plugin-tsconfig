/**
 * @packageDocumentation
 * Rule: require-verbatim-module-syntax
 */
import type { JsoncRuleModule } from "../_internal/jsonc-rule.js";
import { createJsoncRule } from "../_internal/jsonc-rule.js";
import {
    getCompilerOptions,
} from "../_internal/jsonc-helpers.js";

const rule: JsoncRuleModule = createJsoncRule({
    name: "require-verbatim-module-syntax",
    meta: {
        type: "suggestion",
        docs: {
            description: "Require `verbatimModuleSyntax: true` in library configurations.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: ["all", "module-resolution"],
        },
        messages: {
        missingVerbatimModuleSyntax: "`verbatimModuleSyntax: true` ensures TypeScript emits `import`/`export` statements verbatim, making output predictable for bundlers and module systems. Add it to `compilerOptions`.",
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
