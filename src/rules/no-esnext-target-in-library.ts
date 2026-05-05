import { isDefined } from "ts-extras";

/**
 * @packageDocumentation
 * Rule: no-esnext-target-in-library
 */
import type {
    JSONObjectExpression,
    JSONProperty,
} from "../_internal/jsonc-helpers.js";
import type { JsoncRuleModule } from "../_internal/jsonc-rule.js";

import {
    findProperty,
    getCompilerOptions,
    getStringValue,
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

                const targetProp: JSONProperty | undefined = findProperty(
                    co,
                    "target"
                );
                if (!isDefined(targetProp)) return;

                const targetValue = getStringValue(targetProp);
                if (targetValue?.toLowerCase() !== "esnext") return;

                reportViolation(context, {
                    loc: targetProp.loc,
                    messageId: "esnextTargetInLibrary",
                });
            },
        };
    },
    meta: {
        docs: {
            description:
                "disallow library configs target `ESNext` (instable moving target).",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: ["all", "lib-target"],
            url: createRuleDocsUrl("no-esnext-target-in-library"),
        },
        messages: {
            esnextTargetInLibrary:
                '`target: "ESNext"` is a moving target that changes meaning with each TypeScript version. Libraries should target a specific stable ES version.',
        },
        schema: [],
        type: "suggestion",
    },
    name: "no-esnext-target-in-library",
});

export default rule;
