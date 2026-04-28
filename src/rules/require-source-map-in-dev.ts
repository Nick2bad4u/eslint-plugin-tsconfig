/**
 * @packageDocumentation
 * Rule: require-source-map-in-dev
 */
import type { JsoncRuleModule } from "../_internal/jsonc-rule.js";
import { createJsoncRule } from "../_internal/jsonc-rule.js";
import {
    getCompilerOptions,
} from "../_internal/jsonc-helpers.js";

const rule: JsoncRuleModule = createJsoncRule({
    name: "require-source-map-in-dev",
    meta: {
        type: "suggestion",
        docs: {
            description: "Require `sourceMap: true` in development and watch configurations.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: ["all", "emit-config"],
        },
        messages: {
        missingSourceMap: "Development and watch configurations should enable `\"sourceMap\": true` to allow debuggers to map compiled output back to source. Add it to `compilerOptions`.",
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
