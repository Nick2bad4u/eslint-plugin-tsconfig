import { isDefined } from "ts-extras";

/**
 * @packageDocumentation
 * Rule: require-isolated-declarations
 */
import type {
    JSONObjectExpression,
    JSONProperty,
} from "../_internal/jsonc-helpers.js";
import type { JsoncRuleModule } from "../_internal/jsonc-rule.js";

import {
    findLastProperty,
    getBooleanValue,
    getCompilerOptions,
    hasDuplicateProperty,
    hasProperty,
    insertProperty,
    replacePropertyValue,
    reportViolation,
} from "../_internal/jsonc-helpers.js";
import { createJsoncRule } from "../_internal/jsonc-rule.js";
import { createRuleDocsUrl } from "../_internal/rule-docs-url.js";

/** Declaration output may be enabled through either compiler option. */
function hasDeclarationEmit(
    compilerOptions: Readonly<JSONObjectExpression>
): boolean {
    return (
        getBooleanValue(findLastProperty(compilerOptions, "declaration")) ===
            true ||
        getBooleanValue(findLastProperty(compilerOptions, "composite")) === true
    );
}

/** TypeScript derives allowJs from checkJs when allowJs is omitted. */
function hasJavaScriptDisabled(
    root: Readonly<JSONObjectExpression>,
    compilerOptions: Readonly<JSONObjectExpression>
): boolean {
    const allowJs = findLastProperty(compilerOptions, "allowJs");
    if (isDefined(allowJs)) {
        return getBooleanValue(allowJs) === false;
    }

    return (
        !hasProperty(root, "extends") &&
        getBooleanValue(findLastProperty(compilerOptions, "checkJs")) !== true
    );
}

/** Rule implementation for this tsconfig lint rule. */
const rule: JsoncRuleModule = createJsoncRule({
    create: (context) => ({
        JSONObjectExpression(node: Readonly<JSONObjectExpression>) {
            if (node.parent.type !== "JSONExpressionStatement") return;
            const co = getCompilerOptions(node);
            if (!co) return;

            const prop: JSONProperty | undefined = findLastProperty(
                co,
                "isolatedDeclarations"
            );

            if (isDefined(prop) && getBooleanValue(prop) === true) return;

            reportViolation(context, {
                fix(fixer) {
                    if (
                        hasDuplicateProperty(node, "compilerOptions") ||
                        !hasDeclarationEmit(co) ||
                        !hasJavaScriptDisabled(node, co)
                    ) {
                        return null;
                    }

                    if (isDefined(prop)) {
                        return replacePropertyValue(fixer, prop, true);
                    }
                    return insertProperty(
                        fixer,
                        co,
                        "isolatedDeclarations",
                        true
                    );
                },
                loc: (prop ?? co).loc,
                messageId: "missingIsolatedDeclarations",
            });
        },
    }),
    meta: {
        docs: {
            description:
                "require `isolatedDeclarations: true` so declaration files can be emitted without type resolution.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: [
                "all",
                "emit-config",
                "strictest",
            ],
            url: createRuleDocsUrl("require-isolated-declarations"),
        },
        fixable: "code",
        messages: {
            missingIsolatedDeclarations:
                "`isolatedDeclarations: true` (introduced in TypeScript 5.5) requires explicit type annotations on exports so tools can generate declarations without full type resolution. Add it to `compilerOptions` with `declaration` or `composite` enabled and `allowJs` disabled.",
        },
        schema: [],
        type: "suggestion",
    },
    name: "require-isolated-declarations",
});

export default rule;
