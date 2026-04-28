/**
 * @packageDocumentation
 * Rule: no-disable-strict-subset
 */
import type { JsoncRuleModule } from "../_internal/jsonc-rule.js";
import { createJsoncRule } from "../_internal/jsonc-rule.js";
import { getCompilerOptions } from "../_internal/jsonc-helpers.js";

const rule: JsoncRuleModule = createJsoncRule({
    name: "no-disable-strict-subset",
    meta: {
        type: "problem",
        docs: {
            description:
                "Disallow disabling individual strict-mode sub-flags when `strict: true` is set.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: [
                "all",
                "strict-mode",
                "strict",
            ],
        },
        messages: {
            disabledStrictSubflag:
                'Setting `"{{flag}}": false` undoes part of `strict: true`. Remove this override or disable `strict` explicitly.',
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
