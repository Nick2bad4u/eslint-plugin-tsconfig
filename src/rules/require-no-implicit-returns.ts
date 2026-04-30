/**
 * @packageDocumentation
 * Rule: require-no-implicit-returns
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
                "require `noImplicitReturns: true` to catch functions that do not return on all code paths.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: [
                "all",
                "strict-mode",
                "strictest",
            ],
            url: createRuleDocsUrl("require-no-implicit-returns"),
        },
        fixable: "code",
        messages: {
            missingNoImplicitReturns:
                '`noImplicitReturns: true` reports an error when a function has a non-`void` return type but some code paths do not explicitly return a value. This catches a class of bugs where a function silently returns `undefined` on an unhandled branch. Add `"noImplicitReturns": true` to `compilerOptions`.',
        },
        schema: [],
        type: "suggestion",
    },
    name: "require-no-implicit-returns",
});

export default rule;
