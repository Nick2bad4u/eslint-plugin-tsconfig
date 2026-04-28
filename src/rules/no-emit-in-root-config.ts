/**
 * @packageDocumentation
 * Rule: no-emit-in-root-config
 */
import type { JsoncRuleModule } from "../_internal/jsonc-rule.js";
import { createJsoncRule } from "../_internal/jsonc-rule.js";
import {
    getCompilerOptions,
} from "../_internal/jsonc-helpers.js";

const rule: JsoncRuleModule = createJsoncRule({
    name: "no-emit-in-root-config",
    meta: {
        type: "suggestion",
        docs: {
            description: "Require `noEmit: true` in root `tsconfig.json` files.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: ["all", "project-references", "emit-config"],
        },
        messages: {
        missingNoEmit: "Root `tsconfig.json` should set `\"noEmit\": true` and delegate compilation to project-reference configs. Add `\"noEmit\": true` to `compilerOptions`.",
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
