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

/**
 * Check if a file path is likely the root tsconfig.json, not a nested workspace
 * config. Conservative heuristic: exclude paths containing common monorepo
 * workspace markers.
 */
function isRootTsconfigPath(filename: string): boolean {
    if (basename(filename) !== "tsconfig.json") return false;

    // Monorepo workspace directory patterns to exclude (case-insensitive)
    const workspacePatterns =
        /[/\\](?:apps|build|dist|libs|modules|out|packages|projects|src|test|tests|workspace|workspaces)[/\\]/iu;
    return !workspacePatterns.test(filename);
}

/** Rule implementation for this tsconfig lint rule. */
const rule: JsoncRuleModule = createJsoncRule({
    create(context) {
        return {
            JSONObjectExpression(node: Readonly<JSONObjectExpression>) {
                if (node.parent?.type !== "JSONExpressionStatement") return;
                // Only applies to root tsconfig.json (not workspace or non-root tsconfig files)
                if (!isRootTsconfigPath(context.filename)) return;

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
