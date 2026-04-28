/**
 * @packageDocumentation
 * Rule: require-exact-optional-property-types
 */
import type { JsoncRuleModule } from "../_internal/jsonc-rule.js";
import { createJsoncRule } from "../_internal/jsonc-rule.js";
import {
    getCompilerOptions,
} from "../_internal/jsonc-helpers.js";

const rule: JsoncRuleModule = createJsoncRule({
    name: "require-exact-optional-property-types",
    meta: {
        type: "suggestion",
        docs: {
            description: "Require `exactOptionalPropertyTypes: true` in strict configs.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: ["all", "strict-mode"],
        },
        messages: {
        missingExactOptionalPropertyTypes: "`exactOptionalPropertyTypes: true` makes TypeScript distinguish between `{ x?: number }` (property may be absent) and `{ x: number | undefined }` (property must be present). Add it to `compilerOptions` for stronger type safety.",
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
