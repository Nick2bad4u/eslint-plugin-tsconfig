/**
 * @packageDocumentation
 * Rule: consistent-target-and-lib
 */
import type { JsoncRuleModule } from "../_internal/jsonc-rule.js";
import { createJsoncRule } from "../_internal/jsonc-rule.js";
import {
    getCompilerOptions,
} from "../_internal/jsonc-helpers.js";

const rule: JsoncRuleModule = createJsoncRule({
    name: "consistent-target-and-lib",
    meta: {
        type: "suggestion",
        docs: {
            description: "Warn when `lib` entries are inconsistent with `target`.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: ["all", "lib-target"],
        },
        messages: {
        inconsistentTargetAndLib: "`lib` contains \"{{libEntry}}\" which is newer than `target: \"{{target}}\"`. Consider aligning `lib` with the target or upgrading `target`.",
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
