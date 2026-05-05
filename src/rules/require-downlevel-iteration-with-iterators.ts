import { isDefined } from "ts-extras";

/**
 * @packageDocumentation
 * Rule: require-downlevel-iteration-with-iterators
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
    getStringArrayElements,
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
        const ES_VERSIONS = [
            "es3",
            "es5",
            "es2015",
            "es2016",
            "es2017",
            "es2018",
            "es2019",
            "es2020",
            "es2021",
            "es2022",
            "es2023",
            "es2024",
            "esnext",
        ] as const;
        type EsVersion = (typeof ES_VERSIONS)[number];
        function esIndex(v: string): number {
            return ES_VERSIONS.indexOf(v.toLowerCase() as EsVersion);
        }

        /** Lib entries that imply iterator usage. */
        const ITERATOR_LIBS = [
            /symbol\.iterator/i,
            /^es2015\.iterable$/i,
            /^es2018\.asynciterable$/i,
            /^esnext\.asynciterable$/i,
        ];

        return {
            JSONObjectExpression(node: Readonly<JSONObjectExpression>) {
                if (node.parent?.type !== "JSONExpressionStatement") return;
                const co = getCompilerOptions(node);
                if (!co) return;

                const targetProp: JSONProperty | undefined = findProperty(
                    co,
                    "target"
                );
                if (!isDefined(targetProp)) return;
                const targetStr = getStringValue(targetProp);
                if (!isDefined(targetStr)) return;
                const targetIdx = esIndex(targetStr);
                // ES2015+ natively supports iterators — downlevelIteration not needed
                if (targetIdx === -1 || targetIdx >= esIndex("es2015")) return;

                const libProp: JSONProperty | undefined = findProperty(
                    co,
                    "lib"
                );
                if (libProp?.value.type !== "JSONArrayExpression") return;

                const libs = getStringArrayElements(libProp.value);
                const hasIteratorLib = libs.some((lib) =>
                    ITERATOR_LIBS.some((p) => p.test(lib))
                );
                if (!hasIteratorLib) return;

                const downlevelProp: JSONProperty | undefined = findProperty(
                    co,
                    "downlevelIteration"
                );
                if (
                    isDefined(downlevelProp) &&
                    getBooleanValue(downlevelProp) === true
                )
                    return;

                reportViolation(context, {
                    fix(fixer) {
                        if (isDefined(downlevelProp)) {
                            return replacePropertyValue(
                                fixer,
                                downlevelProp,
                                true
                            );
                        }
                        return insertProperty(
                            fixer,
                            co,
                            "downlevelIteration",
                            true
                        );
                    },
                    loc: targetProp.loc,
                    messageId: "missingDownlevelIteration",
                });
            },
        };
    },
    meta: {
        docs: {
            description:
                "require `downlevelIteration` when targeting pre-ES2015 with iterators.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: ["all", "lib-target"],
            url: createRuleDocsUrl(
                "require-downlevel-iteration-with-iterators"
            ),
        },
        fixable: "code",
        messages: {
            missingDownlevelIteration:
                'Iterators and generators require `"downlevelIteration": true` when targeting environments older than ES2015 to emit correct iteration polyfills.',
        },
        schema: [],
        type: "suggestion",
    },
    name: "require-downlevel-iteration-with-iterators",
});

export default rule;
