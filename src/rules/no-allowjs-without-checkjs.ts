/**
 * @packageDocumentation
 * Rule: no-allowjs-without-checkjs
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
                "disallow `allowJs` without `checkJs` in compiler options.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: [
                "all",
                "include-hygiene",
                "jsconfig",
            ],
        },
        messages: {
            allowJsWithoutCheckJs:
                '`allowJs: true` includes JavaScript files in the TypeScript compilation but skips type-checking them when `checkJs` is absent or `false`. Either add `"checkJs": true` to enable JS type-checking, or remove `allowJs` if you do not need to include JavaScript files.',
        },
        schema: [],
        type: "problem",
    },
    name: "no-allowjs-without-checkjs",
});

export default rule;
