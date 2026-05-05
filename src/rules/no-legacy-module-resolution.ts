import { isDefined, setHas } from "ts-extras";

/**
 * @packageDocumentation
 * Rule: no-legacy-module-resolution
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
    reportViolation,
} from "../_internal/jsonc-helpers.js";
import { createJsoncRule } from "../_internal/jsonc-rule.js";
import { createRuleDocsUrl } from "../_internal/rule-docs-url.js";

/** Rule implementation for this tsconfig lint rule. */
const rule: JsoncRuleModule = createJsoncRule({
    create(context) {
        const LEGACY_RESOLUTIONS = new Set([
            "classic",
            "node",
            "node10",
        ]);

        return {
            JSONObjectExpression(node: Readonly<JSONObjectExpression>) {
                if (node.parent?.type !== "JSONExpressionStatement") return;
                const co = getCompilerOptions(node);
                if (!co) return;

                const prop: JSONProperty | undefined = findProperty(
                    co,
                    "moduleResolution"
                );
                if (!isDefined(prop)) return;
                const value = getStringValue(prop);
                if (
                    !isDefined(value) ||
                    !setHas(LEGACY_RESOLUTIONS, value.toLowerCase())
                )
                    return;

                reportViolation(context, {
                    loc: prop.loc,
                    messageId: "legacyModuleResolution",
                });
            },
        };
    },
    meta: {
        docs: {
            description:
                'disallow legacy `moduleResolution` values such as `"classic"`, `"node"`, and `"node10"`.',
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: ["all", "module-resolution"],
            url: createRuleDocsUrl("no-legacy-module-resolution"),
        },
        messages: {
            legacyModuleResolution:
                'Legacy `moduleResolution` values such as `"classic"`, `"node"`, and `"node10"` do not support modern package.json `exports`. Use `"node16"`, `"nodenext"`, or `"bundler"` instead.',
        },
        schema: [],
        type: "suggestion",
    },
    name: "no-legacy-module-resolution",
});

export default rule;
