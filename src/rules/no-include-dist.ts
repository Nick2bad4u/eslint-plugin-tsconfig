import { isDefined } from "ts-extras";

/**
 * @packageDocumentation
 * Rule: no-include-dist
 */
import type {
    JSONObjectExpression,
    JSONProperty,
} from "../_internal/jsonc-helpers.js";
import type { JsoncRuleModule } from "../_internal/jsonc-rule.js";

import {
    findProperty,
    getStringFromExpression,
    reportViolation,
} from "../_internal/jsonc-helpers.js";
import { createJsoncRule } from "../_internal/jsonc-rule.js";
import { createRuleDocsUrl } from "../_internal/rule-docs-url.js";

/** Rule implementation for this tsconfig lint rule. */
const rule: JsoncRuleModule = createJsoncRule({
    create(context) {
        const DIST_PATTERN = /(?:^|[/\\])dist(?:[/\\]|$)/i;

        return {
            JSONObjectExpression(node: Readonly<JSONObjectExpression>) {
                if (node.parent?.type !== "JSONExpressionStatement") return;
                // Check root-level `include` (not inside compilerOptions)
                const includeProp: JSONProperty | undefined = findProperty(
                    node,
                    "include"
                );
                if (includeProp?.value.type !== "JSONArrayExpression") return;

                const elements = includeProp.value.elements;
                for (const element of elements) {
                    if (element === null) continue;
                    const value = getStringFromExpression(element);
                    if (!isDefined(value) || !DIST_PATTERN.test(value))
                        continue;

                    reportViolation(context, {
                        data: { pattern: value },
                        loc: element.loc,
                        messageId: "distInInclude",
                    });
                }
            },
        };
    },
    meta: {
        docs: {
            description:
                "disallow `include` patterns that capture the `dist` output folder.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: [
                "all",
                "include-hygiene",
                "strict",
            ],
            url: createRuleDocsUrl("no-include-dist"),
        },
        messages: {
            distInInclude:
                '`include` pattern "{{pattern}}" matches the `dist` output folder. This causes TypeScript to process compiled output, leading to duplicate declarations. Remove the pattern or add `dist` to `exclude`.',
        },
        schema: [],
        type: "problem",
    },
    name: "no-include-dist",
});

export default rule;
