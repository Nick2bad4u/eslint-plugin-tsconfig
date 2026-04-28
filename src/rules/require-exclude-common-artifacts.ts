/**
 * @packageDocumentation
 * Rule: require-exclude-common-artifacts
 */
import type { JsoncRuleModule } from "../_internal/jsonc-rule.js";
import { createJsoncRule } from "../_internal/jsonc-rule.js";
import {
    getCompilerOptions,
} from "../_internal/jsonc-helpers.js";

const rule: JsoncRuleModule = createJsoncRule({
    name: "require-exclude-common-artifacts",
    meta: {
        type: "suggestion",
        docs: {
            description: "Require common build-artifact directories in `exclude`.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: ["all", "include-hygiene"],
        },
        messages: {
        missingExcludeEntry: "The `exclude` array should contain \"{{entry}}\" to prevent TypeScript from processing build artifacts and installed packages.",
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
