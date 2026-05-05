import { isDefined } from "ts-extras";

/**
 * @packageDocumentation
 * Rule: require-no-implicit-override
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
                    "noImplicitOverride"
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
                            "noImplicitOverride",
                            true
                        );
                    },
                    loc: (prop ?? co).loc,
                    messageId: "missingNoImplicitOverride",
                });
            },
        };
    },
    meta: {
        docs: {
            description: "require `noImplicitOverride: true`.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: ["all", "strict-mode"],
            url: createRuleDocsUrl("require-no-implicit-override"),
        },
        fixable: "code",
        messages: {
            missingNoImplicitOverride:
                "`noImplicitOverride: true` forces the `override` keyword on methods that override base-class members, preventing silent shadowing bugs. Add it to `compilerOptions`.",
        },
        schema: [],
        type: "suggestion",
    },
    name: "require-no-implicit-override",
});

export default rule;
