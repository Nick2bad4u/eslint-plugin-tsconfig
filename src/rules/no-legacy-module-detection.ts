import { isDefined } from "ts-extras";

/**
 * @packageDocumentation
 * Rule: no-legacy-module-detection
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

                const prop: JSONProperty | undefined = findProperty(
                    co,
                    "moduleDetection"
                );
                if (!isDefined(prop)) return;
                const value = getStringValue(prop);
                if (value?.toLowerCase() !== "legacy") return;

                reportViolation(context, {
                    loc: prop.loc,
                    messageId: "legacyModuleDetection",
                });
            },
        };
    },
    meta: {
        docs: {
            description:
                'disallow `moduleDetection: "legacy"` in compiler options.',
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: ["all", "module-resolution"],
            url: createRuleDocsUrl("no-legacy-module-detection"),
        },
        messages: {
            legacyModuleDetection:
                '`moduleDetection: "legacy"` uses the pre-TypeScript-4.7 behavior of treating a `.ts` file as a script (rather than a module) when it has no top-level `import` or `export`. Modern TypeScript and bundlers expect all `.ts` files to be modules. Use `"auto"` (TypeScript decides) or `"force"` (treat all files as modules) instead.',
        },
        schema: [],
        type: "suggestion",
    },
    name: "no-legacy-module-detection",
});

export default rule;
