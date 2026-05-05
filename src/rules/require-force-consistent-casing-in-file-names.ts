import { isDefined } from "ts-extras";

/**
 * @packageDocumentation
 * Rule: require-force-consistent-casing-in-file-names
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
                    "forceConsistentCasingInFileNames"
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
                            "forceConsistentCasingInFileNames",
                            true
                        );
                    },
                    loc: (prop ?? co).loc,
                    messageId: "missingForceConsistentCasingInFileNames",
                });
            },
        };
    },
    meta: {
        docs: {
            description:
                "require `forceConsistentCasingInFileNames: true` to prevent cross-platform import errors.",
            recommended: true,
            requiresTypeChecking: false,
            tsconfigConfigs: [
                "all",
                "include-hygiene",
                "recommended",
                "strict",
                "strictest",
            ],
            url: createRuleDocsUrl(
                "require-force-consistent-casing-in-file-names"
            ),
        },
        fixable: "code",
        messages: {
            missingForceConsistentCasingInFileNames:
                '`forceConsistentCasingInFileNames: true` ensures that import paths match the actual file-system casing, preventing import resolution failures when moving code between case-sensitive (Linux) and case-insensitive (Windows/macOS) operating systems. Add `"forceConsistentCasingInFileNames": true` to `compilerOptions`.',
        },
        schema: [],
        type: "problem",
    },
    name: "require-force-consistent-casing-in-file-names",
});

export default rule;
