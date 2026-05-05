/**
 * @packageDocumentation
 * Rule: no-emit-in-root-config
 */
import { basename } from "node:path";
import { isDefined } from "ts-extras";

import type {
    Fixer,
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
                // Only applies to root tsconfig.json (not tsconfig.build.json etc.)
                if (basename(context.filename) !== "tsconfig.json") return;

                const co = getCompilerOptions(node);
                if (!co) return;

                const noEmitProp: JSONProperty | undefined = findProperty(
                    co,
                    "noEmit"
                );
                if (
                    isDefined(noEmitProp) &&
                    getBooleanValue(noEmitProp) === true
                )
                    return;

                reportViolation(context, {
                    fix(fixer: Fixer) {
                        if (isDefined(noEmitProp)) {
                            return replacePropertyValue(
                                fixer,
                                noEmitProp,
                                true
                            );
                        }
                        return insertProperty(fixer, co, "noEmit", true);
                    },
                    loc: (noEmitProp ?? co).loc,
                    messageId: "missingNoEmit",
                });
            },
        };
    },
    meta: {
        docs: {
            description:
                "require `noEmit: true` in root `tsconfig.json` files.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: [
                "all",
                "project-references",
                "emit-config",
            ],
            url: createRuleDocsUrl("no-emit-in-root-config"),
        },
        fixable: "code",
        messages: {
            missingNoEmit:
                'Root `tsconfig.json` should set `"noEmit": true` and delegate compilation to project-reference configs. Add `"noEmit": true` to `compilerOptions`.',
        },
        schema: [],
        type: "suggestion",
    },
    name: "no-emit-in-root-config",
});

export default rule;
