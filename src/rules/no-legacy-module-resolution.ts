/**
 * @packageDocumentation
 * Rule: no-legacy-module-resolution
 */
import type { JsoncRuleModule } from "../_internal/jsonc-rule.js";
import { createJsoncRule } from "../_internal/jsonc-rule.js";
import {
    getCompilerOptions,
} from "../_internal/jsonc-helpers.js";

const rule: JsoncRuleModule = createJsoncRule({
    name: "no-legacy-module-resolution",
    meta: {
        type: "suggestion",
        docs: {
            description: "Warn when the legacy `\"node\"` `moduleResolution` is used.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: ["all", "module-resolution"],
        },
        messages: {
        legacyModuleResolution: "`moduleResolution: \"node\"` is the legacy Node.js resolution algorithm and does not support modern package.json `exports`. Use `\"node16\"`, `\"nodenext\"`, or `\"bundler\"` instead.",
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
