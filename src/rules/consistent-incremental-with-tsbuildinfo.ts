import { isDefined } from "ts-extras";

/**
 * @packageDocumentation
 * Rule: consistent-incremental-with-tsbuildinfo
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

                const incrementalProp: JSONProperty | undefined = findProperty(
                    co,
                    "incremental"
                );
                if (
                    !isDefined(incrementalProp) ||
                    getBooleanValue(incrementalProp) !== true
                )
                    return;

                const tsBuildInfoFileProp: JSONProperty | undefined =
                    findProperty(co, "tsBuildInfoFile");
                if (isDefined(tsBuildInfoFileProp)) return;

                reportViolation(context, {
                    fix(fixer) {
                        return insertProperty(
                            fixer,
                            co,
                            "tsBuildInfoFile",
                            ".tsbuildinfo"
                        );
                    },
                    loc: incrementalProp.loc,
                    messageId: "missingTsBuildInfoFile",
                });
            },
        };
    },
    meta: {
        docs: {
            description:
                "require `tsBuildInfoFile` when `incremental: true` is set.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: ["all", "emit-config"],
            url: createRuleDocsUrl("consistent-incremental-with-tsbuildinfo"),
        },
        fixable: "code",
        messages: {
            missingTsBuildInfoFile:
                'When `incremental: true` is set, `tsBuildInfoFile` should also be specified to control the incremental cache location. Add `"tsBuildInfoFile": ".tsbuildinfo"` to `compilerOptions`.',
        },
        schema: [],
        type: "suggestion",
    },
    name: "consistent-incremental-with-tsbuildinfo",
});

export default rule;
