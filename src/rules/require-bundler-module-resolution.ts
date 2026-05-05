import { isDefined, setHas } from "ts-extras";

/**
 * @packageDocumentation
 * Rule: require-bundler-module-resolution
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
    insertProperty,
    replacePropertyValue,
    reportViolation,
} from "../_internal/jsonc-helpers.js";
import { createJsoncRule } from "../_internal/jsonc-rule.js";
import { createRuleDocsUrl } from "../_internal/rule-docs-url.js";

/** Rule implementation for this tsconfig lint rule. */
const rule: JsoncRuleModule = createJsoncRule({
    create(context) {
        const BUNDLER_MODULE_VALUES = new Set([
            "es2015",
            "es2016",
            "es2017",
            "es2018",
            "es2019",
            "es2020",
            "es2022",
            "esnext",
            "preserve",
        ]);

        return {
            JSONObjectExpression(node: Readonly<JSONObjectExpression>) {
                if (node.parent?.type !== "JSONExpressionStatement") return;
                const co = getCompilerOptions(node);
                if (!co) return;

                const moduleProp: JSONProperty | undefined = findProperty(
                    co,
                    "module"
                );
                if (!isDefined(moduleProp)) return;
                const moduleValue = getStringValue(moduleProp)?.toLowerCase();
                if (
                    !isDefined(moduleValue) ||
                    !setHas(BUNDLER_MODULE_VALUES, moduleValue)
                )
                    return;

                const resolutionProp: JSONProperty | undefined = findProperty(
                    co,
                    "moduleResolution"
                );
                const resolutionValue = isDefined(resolutionProp)
                    ? getStringValue(resolutionProp)?.toLowerCase()
                    : undefined;

                // Already using a modern resolution algorithm — no issue
                if (
                    resolutionValue === "bundler" ||
                    resolutionValue === "node16" ||
                    resolutionValue === "nodenext"
                ) {
                    return;
                }

                reportViolation(context, {
                    fix(fixer) {
                        if (isDefined(resolutionProp)) {
                            return replacePropertyValue(
                                fixer,
                                resolutionProp,
                                "bundler"
                            );
                        }
                        return insertProperty(
                            fixer,
                            co,
                            "moduleResolution",
                            "bundler"
                        );
                    },
                    loc: (resolutionProp ?? moduleProp).loc,
                    messageId: "missingBundlerResolution",
                });
            },
        };
    },
    meta: {
        docs: {
            description:
                'require `moduleResolution: "bundler"` for projects using a bundler.',
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: ["all", "module-resolution"],
            url: createRuleDocsUrl("require-bundler-module-resolution"),
        },
        fixable: "code",
        messages: {
            missingBundlerResolution:
                'Projects using a bundler (Vite, esbuild, webpack, etc.) should set `"moduleResolution": "bundler"` to correctly resolve package `exports` and `imports` fields.',
        },
        schema: [],
        type: "suggestion",
    },
    name: "require-bundler-module-resolution",
});

export default rule;
