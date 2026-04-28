/**
 * @packageDocumentation
 * Rule: require-downlevel-iteration-with-iterators
 */
import type { JsoncRuleModule } from "../_internal/jsonc-rule.js";
import { createJsoncRule } from "../_internal/jsonc-rule.js";
import {
    getCompilerOptions,
} from "../_internal/jsonc-helpers.js";

const rule: JsoncRuleModule = createJsoncRule({
    name: "require-downlevel-iteration-with-iterators",
    meta: {
        type: "suggestion",
        docs: {
            description: "Require `downlevelIteration` when targeting pre-ES2015 with iterators.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: ["all", "lib-target"],
        },
        messages: {
        missingDownlevelIteration: "Iterators and generators require `\"downlevelIteration\": true` when targeting environments older than ES2015 to emit correct iteration polyfills.",
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
