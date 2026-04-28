/**
 * @packageDocumentation
 * Rule: require-no-unchecked-indexed-access
 */
import type { JsoncRuleModule } from "../_internal/jsonc-rule.js";
import { createJsoncRule } from "../_internal/jsonc-rule.js";
import {
    getCompilerOptions,
} from "../_internal/jsonc-helpers.js";

const rule: JsoncRuleModule = createJsoncRule({
    name: "require-no-unchecked-indexed-access",
    meta: {
        type: "suggestion",
        docs: {
            description: "Require `noUncheckedIndexedAccess: true` in strict configs.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: ["all", "strict-mode"],
        },
        messages: {
        missingNoUncheckedIndexedAccess: "`noUncheckedIndexedAccess: true` adds `undefined` to array index signatures and index-signature types, preventing runtime errors from out-of-bounds access. Add it to `compilerOptions`.",
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
