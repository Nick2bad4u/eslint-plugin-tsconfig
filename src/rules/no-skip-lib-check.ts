/**
 * @packageDocumentation
 * Rule: no-skip-lib-check
 */
import type { JsoncRuleModule } from "../_internal/jsonc-rule.js";
import { createJsoncRule } from "../_internal/jsonc-rule.js";
import {
    getCompilerOptions,
} from "../_internal/jsonc-helpers.js";

const rule: JsoncRuleModule = createJsoncRule({
    name: "no-skip-lib-check",
    meta: {
        type: "suggestion",
        docs: {
            description: "Warn when `skipLibCheck: true` is used.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: ["all", "include-hygiene"],
        },
        messages: {
        skipLibCheck: "`skipLibCheck: true` silences type errors in `.d.ts` files, masking real problems in dependencies. Remove this option or accept the type errors it was hiding.",
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
