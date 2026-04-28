/**
 * @packageDocumentation
 * Rule: require-exclude-common-artifacts
 */
import type { JsoncRuleModule } from "../_internal/jsonc-rule.js";

import { createJsoncRule } from "../_internal/jsonc-rule.js";

const rule: JsoncRuleModule = createJsoncRule({
    create() {
        return {
            JSONObjectExpression(_node) {            },
        };
    },
    meta: {
        docs: {
            description: "Require common build-artifact directories in `exclude`.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: ["all", "include-hygiene"],
        },
        fixable: "code",
        messages: {
        missingExcludeEntry: "The `exclude` array should contain \"{{entry}}\" to prevent TypeScript from processing build artifacts and installed packages.",
        },
        schema: [],
            type: "suggestion",
    },
    name: "require-exclude-common-artifacts",
});

export default rule;
