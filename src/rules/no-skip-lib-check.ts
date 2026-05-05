import { isDefined } from "ts-extras";

/**
 * @packageDocumentation
 * Rule: no-skip-lib-check
 */
import type {
    JSONObjectExpression,
    JSONProperty,
} from "../_internal/jsonc-helpers.js";
import type { JsoncRuleModule } from "../_internal/jsonc-rule.js";

import {
    findProperty,
    getBooleanValue,
    getCompilerOptions,
    reportViolation,
} from "../_internal/jsonc-helpers.js";
import { createJsoncRule } from "../_internal/jsonc-rule.js";
import { createRuleDocsUrl } from "../_internal/rule-docs-url.js";

/** Rule implementation for this tsconfig lint rule. */
const rule: JsoncRuleModule = createJsoncRule({
    create(context) {
        return {
            JSONObjectExpression(node: Readonly<JSONObjectExpression>) {
                if (node.parent?.type !== "JSONExpressionStatement") return;
                const co = getCompilerOptions(node);
                if (!co) return;

                const prop: JSONProperty | undefined = findProperty(
                    co,
                    "skipLibCheck"
                );

                if (!isDefined(prop)) return;
                if (getBooleanValue(prop) !== true) return;

                reportViolation(context, {
                    loc: prop.loc,
                    messageId: "skipLibCheck",
                });
            },
        };
    },
    meta: {
        docs: {
            description: "disallow `skipLibCheck: true` is used.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: ["all", "include-hygiene"],
            url: createRuleDocsUrl("no-skip-lib-check"),
        },
        messages: {
            skipLibCheck:
                "`skipLibCheck: true` silences type errors in `.d.ts` files, masking real problems in dependencies. Remove this option or accept the type errors it was hiding.",
        },
        schema: [],
        type: "suggestion",
    },
    name: "no-skip-lib-check",
});

export default rule;
