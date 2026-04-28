/**
 * @packageDocumentation
 * Rule: require-bundler-module-resolution
 */
import type { JsoncRuleModule } from "../_internal/jsonc-rule.js";
import { createJsoncRule } from "../_internal/jsonc-rule.js";
import {
    getCompilerOptions,
} from "../_internal/jsonc-helpers.js";

const rule: JsoncRuleModule = createJsoncRule({
    name: "require-bundler-module-resolution",
    meta: {
        type: "suggestion",
        docs: {
            description: "Suggest `moduleResolution: \"bundler\"` for projects using a bundler.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: ["all", "module-resolution"],
        },
        messages: {
        missingBundlerResolution: "Projects using a bundler (Vite, esbuild, webpack, etc.) should set `\"moduleResolution\": \"bundler\"` to correctly resolve package `exports` and `imports` fields.",
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
