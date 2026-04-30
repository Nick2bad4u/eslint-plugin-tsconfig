/**
 * @packageDocumentation
 * Rule: require-exclude-common-artifacts
 */
import type { JsoncRuleModule } from "../_internal/jsonc-rule.js";

import { createJsoncRule } from "../_internal/jsonc-rule.js";
import { createRuleDocsUrl } from "../_internal/rule-docs-url.js";

/** Rule implementation for this tsconfig lint rule. */
const rule: JsoncRuleModule = createJsoncRule({
    create() {
        return {};
    },
    meta: {
        docs: {
            description:
                "require common build-artifact directories in `exclude`.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: ["all", "include-hygiene"],
            url: createRuleDocsUrl("require-exclude-common-artifacts"),
        },
        fixable: "code",
        messages: {
            missingExcludeEntry:
                'The `exclude` array should contain "{{entry}}" to prevent TypeScript from processing build artifacts and installed packages.',
        },
        schema: [],
        type: "suggestion",
    },
    name: "require-exclude-common-artifacts",
});

export default rule;
