/**
 * @packageDocumentation
 * Rule: require-no-implicit-override
 */
import type { JsoncRuleModule } from "../_internal/jsonc-rule.js";
import { createJsoncRule } from "../_internal/jsonc-rule.js";
import {
    getCompilerOptions,
} from "../_internal/jsonc-helpers.js";

const rule: JsoncRuleModule = createJsoncRule({
    name: "require-no-implicit-override",
    meta: {
        type: "suggestion",
        docs: {
            description: "Require `noImplicitOverride: true`.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: ["all", "strict-mode"],
        },
        messages: {
        missingNoImplicitOverride: "`noImplicitOverride: true` forces the `override` keyword on methods that override base-class members, preventing silent shadowing bugs. Add it to `compilerOptions`.",
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
