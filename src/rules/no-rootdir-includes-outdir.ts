/**
 * @packageDocumentation
 * Rule: no-rootdir-includes-outdir
 */
import { dirname, isAbsolute, normalize, relative, resolve } from "node:path";
import { isDefined } from "ts-extras";

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

                const rootDirProp: JSONProperty | undefined = findProperty(
                    co,
                    "rootDir"
                );
                const outDirProp: JSONProperty | undefined = findProperty(
                    co,
                    "outDir"
                );
                if (!isDefined(rootDirProp) || !isDefined(outDirProp)) return;

                const rootDirValue = getStringValue(rootDirProp);
                const outDirValue = getStringValue(outDirProp);
                if (!isDefined(rootDirValue) || !isDefined(outDirValue)) return;

                const tsconfigDir = dirname(context.filename);
                const normalizedRoot = normalize(
                    resolve(tsconfigDir, rootDirValue)
                );
                const normalizedOut = normalize(
                    resolve(tsconfigDir, outDirValue)
                );
                const relativeOutDir = relative(normalizedRoot, normalizedOut);
                if (
                    relativeOutDir !== "" &&
                    (relativeOutDir.startsWith("..") ||
                        isAbsolute(relativeOutDir))
                )
                    return;

                reportViolation(context, {
                    data: { outDir: outDirValue, rootDir: rootDirValue },
                    loc: outDirProp.loc,
                    messageId: "rootDirIncludesOutDir",
                });
            },
        };
    },
    meta: {
        docs: {
            description:
                "disallow `rootDir` configurations that would include `outDir`.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: [
                "all",
                "emit-config",
                "strict",
            ],
            url: createRuleDocsUrl("no-rootdir-includes-outdir"),
        },
        messages: {
            rootDirIncludesOutDir:
                '`outDir: "{{outDir}}"` is inside `rootDir: "{{rootDir}}"`, which causes TypeScript to include compiled output in the next build. Set `outDir` outside `rootDir` or add it to `exclude`.',
        },
        schema: [],
        type: "problem",
    },
    name: "no-rootdir-includes-outdir",
});

export default rule;
