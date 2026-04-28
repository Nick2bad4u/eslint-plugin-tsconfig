/**
 * @packageDocumentation
 * Rule: no-esnext-target-in-library
 */
import type { JsoncRuleModule } from "../_internal/jsonc-rule.js";
import { createJsoncRule } from "../_internal/jsonc-rule.js";
import {
    getCompilerOptions,
} from "../_internal/jsonc-helpers.js";

const rule: JsoncRuleModule = createJsoncRule({
    name: "no-esnext-target-in-library",
    meta: {
        type: "suggestion",
        docs: {
            description: "Warn when library configs target `ESNext` (instable moving target).",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: ["all", "lib-target"],
        },
        messages: {
        esnextTargetInLibrary: "`target: \"ESNext\"` is a moving target that changes meaning with each TypeScript version. Libraries should target a specific stable ES version.",
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
