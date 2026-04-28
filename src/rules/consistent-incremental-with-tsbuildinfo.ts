/**
 * @packageDocumentation
 * Rule: consistent-incremental-with-tsbuildinfo
 */
import type { JsoncRuleModule } from "../_internal/jsonc-rule.js";
import { createJsoncRule } from "../_internal/jsonc-rule.js";
import {
    getCompilerOptions,
} from "../_internal/jsonc-helpers.js";

const rule: JsoncRuleModule = createJsoncRule({
    name: "consistent-incremental-with-tsbuildinfo",
    meta: {
        type: "suggestion",
        docs: {
            description: "Require `tsBuildInfoFile` when `incremental: true` is set.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: ["all", "emit-config"],
        },
        messages: {
        missingTsBuildInfoFile: "When `incremental: true` is set, `tsBuildInfoFile` should also be specified to control the incremental cache location. Add `\"tsBuildInfoFile\": \".tsbuildinfo\"` to `compilerOptions`.",
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
