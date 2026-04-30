/**
 * @packageDocumentation
 * Rule: consistent-target-and-lib
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
                "disallow `lib` entries are inconsistent with `target`.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: ["all", "lib-target"],
            url: createRuleDocsUrl("consistent-target-and-lib"),
        },
        messages: {
            inconsistentTargetAndLib:
                '`lib` contains "{{libEntry}}" which is newer than `target: "{{target}}"`. Consider aligning `lib` with the target or upgrading `target`.',
        },
        schema: [],
        type: "suggestion",
    },
    name: "consistent-target-and-lib",
});

export default rule;
