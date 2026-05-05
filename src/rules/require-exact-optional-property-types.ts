import { isDefined } from "ts-extras";

/**
 * @packageDocumentation
 * Rule: require-exact-optional-property-types
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
    insertProperty,
    replacePropertyValue,
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
                    "exactOptionalPropertyTypes"
                );

                if (isDefined(prop) && getBooleanValue(prop) === true) return;

                reportViolation(context, {
                    fix(fixer) {
                        if (isDefined(prop)) {
                            return replacePropertyValue(fixer, prop, true);
                        }
                        return insertProperty(
                            fixer,
                            co,
                            "exactOptionalPropertyTypes",
                            true
                        );
                    },
                    loc: (prop ?? co).loc,
                    messageId: "missingExactOptionalPropertyTypes",
                });
            },
        };
    },
    meta: {
        docs: {
            description:
                "require `exactOptionalPropertyTypes: true` in strict configs.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: ["all", "strict-mode"],
            url: createRuleDocsUrl("require-exact-optional-property-types"),
        },
        fixable: "code",
        messages: {
            missingExactOptionalPropertyTypes:
                "`exactOptionalPropertyTypes: true` makes TypeScript distinguish between `{ x?: number }` (property may be absent) and `{ x: number | undefined }` (property must be present). Add it to `compilerOptions` for stronger type safety.",
        },
        schema: [],
        type: "suggestion",
    },
    name: "require-exact-optional-property-types",
});

export default rule;
