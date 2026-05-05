import { isDefined } from "ts-extras";

/**
 * @packageDocumentation
 * Rule: require-outdir-when-emitting
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

                // Not emitting — skip
                const noEmitProp: JSONProperty | undefined = findProperty(
                    co,
                    "noEmit"
                );
                if (
                    isDefined(noEmitProp) &&
                    getBooleanValue(noEmitProp) === true
                )
                    return;

                // Declaration-only builds are fine without outDir
                const emitDeclOnlyProp: JSONProperty | undefined = findProperty(
                    co,
                    "emitDeclarationOnly"
                );
                if (
                    isDefined(emitDeclOnlyProp) &&
                    getBooleanValue(emitDeclOnlyProp) === true
                )
                    return;

                const outDirProp: JSONProperty | undefined = findProperty(
                    co,
                    "outDir"
                );
                if (isDefined(outDirProp)) return;

                reportViolation(context, {
                    loc: co.loc,
                    messageId: "missingOutDir",
                });
            },
        };
    },
    meta: {
        docs: {
            description:
                "require `outDir` when TypeScript is configured to emit files.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: [
                "all",
                "emit-config",
                "strict",
            ],
            url: createRuleDocsUrl("require-outdir-when-emitting"),
        },
        messages: {
            missingOutDir:
                "When emitting JavaScript files (`noEmit` is not set), `outDir` should be specified to prevent output files from being written alongside source files.",
        },
        schema: [],
        type: "problem",
    },
    name: "require-outdir-when-emitting",
});

export default rule;
