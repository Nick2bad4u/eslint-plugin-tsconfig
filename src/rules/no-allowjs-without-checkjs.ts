import { isDefined } from "ts-extras";

/**
 * @packageDocumentation
 * Rule: no-allowjs-without-checkjs
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

                const allowJsProp: JSONProperty | undefined = findProperty(
                    co,
                    "allowJs"
                );
                if (
                    !isDefined(allowJsProp) ||
                    getBooleanValue(allowJsProp) !== true
                )
                    return;

                const checkJsProp: JSONProperty | undefined = findProperty(
                    co,
                    "checkJs"
                );
                if (
                    isDefined(checkJsProp) &&
                    getBooleanValue(checkJsProp) === true
                )
                    return;

                reportViolation(context, {
                    loc: allowJsProp.loc,
                    messageId: "allowJsWithoutCheckJs",
                });
            },
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
            url: createRuleDocsUrl("no-allowjs-without-checkjs"),
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
