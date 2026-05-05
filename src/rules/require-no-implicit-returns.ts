import { isDefined } from "ts-extras";

/**
 * @packageDocumentation
 * Rule: require-no-implicit-returns
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
                    "noImplicitReturns"
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
                            "noImplicitReturns",
                            true
                        );
                    },
                    loc: (prop ?? co).loc,
                    messageId: "missingNoImplicitReturns",
                });
            },
        };
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
