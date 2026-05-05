import { isDefined, setHas } from "ts-extras";

/**
 * @packageDocumentation
 * Rule: require-verbatim-module-syntax
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
        const ESM_MODULE_VALUES = new Set([
            "esnext",
            "node16",
            "nodenext",
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
                    !setHas(ESM_MODULE_VALUES, moduleValue)
                )
                    return;

                const prop: JSONProperty | undefined = findProperty(
                    co,
                    "verbatimModuleSyntax"
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
                            "verbatimModuleSyntax",
                            true
                        );
                    },
                    loc: (prop ?? moduleProp).loc,
                    messageId: "missingVerbatimModuleSyntax",
                });
            },
        };
    },
    meta: {
        docs: {
            description:
                "require `verbatimModuleSyntax: true` in library configurations.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: ["all", "module-resolution"],
            url: createRuleDocsUrl("require-verbatim-module-syntax"),
        },
        fixable: "code",
        messages: {
            missingVerbatimModuleSyntax:
                "`verbatimModuleSyntax: true` ensures TypeScript emits `import`/`export` statements verbatim, making output predictable for bundlers and module systems. Add it to `compilerOptions`.",
        },
        schema: [],
        type: "suggestion",
    },
    name: "require-verbatim-module-syntax",
});

export default rule;
