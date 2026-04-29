/**
 * @packageDocumentation
 * Rule: require-force-consistent-casing-in-file-names
 */
import type { JsoncRuleModule } from "../_internal/jsonc-rule.js";

import { createJsoncRule } from "../_internal/jsonc-rule.js";

/** Rule implementation for this tsconfig lint rule. */
const rule: JsoncRuleModule = createJsoncRule({
    create() {
        return {
            JSONObjectExpression() {},
        };
    },
    meta: {
        docs: {
            description:
                "require `forceConsistentCasingInFileNames: true` to prevent cross-platform import errors.",
            recommended: true,
            requiresTypeChecking: false,
            tsconfigConfigs: [
                "all",
                "include-hygiene",
                "recommended",
                "strict",
                "strictest",
            ],
        },
        fixable: "code",
        messages: {
            missingForceConsistentCasingInFileNames:
                '`forceConsistentCasingInFileNames: true` ensures that import paths match the actual file-system casing, preventing import resolution failures when moving code between case-sensitive (Linux) and case-insensitive (Windows/macOS) operating systems. Add `"forceConsistentCasingInFileNames": true` to `compilerOptions`.',
        },
        schema: [],
        type: "problem",
    },
    name: "require-force-consistent-casing-in-file-names",
});

export default rule;
