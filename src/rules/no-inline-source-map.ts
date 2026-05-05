import { isDefined } from "ts-extras";

/**
 * @packageDocumentation
 * Rule: no-inline-source-map
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
                    "inlineSourceMap"
                );

                if (!isDefined(prop)) return;
                if (getBooleanValue(prop) !== true) return;

                reportViolation(context, {
                    loc: prop.loc,
                    messageId: "inlineSourceMap",
                });
            },
        };
    },
    meta: {
        docs: {
            description:
                "disallow `inlineSourceMap: true` — inline source maps bloat output files.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: ["all", "emit-config"],
            url: createRuleDocsUrl("no-inline-source-map"),
        },
        messages: {
            inlineSourceMap:
                "`inlineSourceMap: true` embeds the full source map as a base64-encoded comment at the bottom of every emitted JavaScript file, substantially increasing output file size. Use `sourceMap: true` instead to emit separate `.js.map` files that tools and browsers load on demand.",
        },
        schema: [],
        type: "suggestion",
    },
    name: "no-inline-source-map",
});

export default rule;
