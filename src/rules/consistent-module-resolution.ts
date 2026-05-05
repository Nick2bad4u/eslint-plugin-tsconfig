import { isDefined } from "ts-extras";

/**
 * @packageDocumentation
 * Rule: consistent-module-resolution
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
        /** Module → required moduleResolution (when constrained). */
        const REQUIRED_RESOLUTION: Readonly<Record<string, string>> = {
            node16: "node16",
            nodenext: "nodenext",
            preserve: "bundler",
        };

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
                if (!isDefined(moduleValue)) return;

                const expected = REQUIRED_RESOLUTION[moduleValue];
                if (!isDefined(expected)) return;

                const resolutionProp: JSONProperty | undefined = findProperty(
                    co,
                    "moduleResolution"
                );
                const actual = isDefined(resolutionProp)
                    ? getStringValue(resolutionProp)?.toLowerCase()
                    : undefined;

                if (actual === expected) return;

                reportViolation(context, {
                    data: {
                        module: getStringValue(moduleProp) ?? moduleValue,
                        moduleResolution: actual ?? "(not set)",
                    },
                    loc: (resolutionProp ?? moduleProp).loc,
                    messageId: "incompatibleModuleResolution",
                });
            },
        };
    },
    meta: {
        docs: {
            description:
                "enforce compatible `module` and `moduleResolution` settings.",
            recommended: true,
            requiresTypeChecking: false,
            tsconfigConfigs: [
                "all",
                "module-resolution",
                "recommended",
                "strict",
            ],
            url: createRuleDocsUrl("consistent-module-resolution"),
        },
        messages: {
            incompatibleModuleResolution:
                '`moduleResolution: "{{moduleResolution}}"` is incompatible with `module: "{{module}}"`. Update `moduleResolution` to a compatible value.',
        },
        schema: [],
        type: "problem",
    },
    name: "consistent-module-resolution",
});

export default rule;
