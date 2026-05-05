import { isDefined } from "ts-extras";

/**
 * @packageDocumentation
 * Rule: consistent-target-and-lib
 */
import type {
    JSONObjectExpression,
    JSONProperty,
} from "../_internal/jsonc-helpers.js";
import type { JsoncRuleModule } from "../_internal/jsonc-rule.js";

import {
    findProperty,
    getCompilerOptions,
    getStringArrayElements,
    getStringValue,
    reportViolation,
} from "../_internal/jsonc-helpers.js";
import { createJsoncRule } from "../_internal/jsonc-rule.js";
import { createRuleDocsUrl } from "../_internal/rule-docs-url.js";

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

/** Get the index of an ES version in the versions array. */
function esIndex(v: string): number {
    return ES_VERSIONS.indexOf(v.toLowerCase() as EsVersion);
}

/**
 * Extract the ES version prefix from a lib entry (e.g. `'es2020.string'` to
 * `'es2020'`).
 */
function libEsVersion(lib: string): string | undefined {
    const m = /^(?<ver>esnext|es\d{4})/i.exec(lib);
    return m?.groups?.["ver"]?.toLowerCase();
}

/** Rule implementation for this tsconfig lint rule. */
const rule: JsoncRuleModule = createJsoncRule({
    create(context) {
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
                if (targetIdx === -1) return;

                const libProp: JSONProperty | undefined = findProperty(
                    co,
                    "lib"
                );
                if (libProp?.value.type !== "JSONArrayExpression") return;

                const libs = getStringArrayElements(libProp.value);

                for (const lib of libs) {
                    const libVer = libEsVersion(lib);
                    if (!isDefined(libVer)) continue;
                    const libIdx = esIndex(libVer);
                    if (libIdx === -1 || libIdx <= targetIdx) continue;

                    reportViolation(context, {
                        data: { libEntry: lib, target: targetStr },
                        loc: libProp.loc,
                        messageId: "inconsistentTargetAndLib",
                    });
                    return;
                }
            },
        };
    },
    meta: {
        docs: {
            description:
                "disallow `lib` entries are inconsistent with `target`.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: ["all", "lib-target"],
            url: createRuleDocsUrl("consistent-target-and-lib"),
        },
        messages: {
            inconsistentTargetAndLib:
                '`lib` contains "{{libEntry}}" which is newer than `target: "{{target}}"`. Consider aligning `lib` with the target or upgrading `target`.',
        },
        schema: [],
        type: "suggestion",
    },
    name: "consistent-target-and-lib",
});

export default rule;
