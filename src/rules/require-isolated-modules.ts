import { isDefined } from "ts-extras";

/**
 * @packageDocumentation
 * Rule: require-isolated-modules
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
    replacePropertyValue,
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

                const prop: JSONProperty | undefined = findProperty(
                    co,
                    "isolatedModules"
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
                            "isolatedModules",
                            true
                        );
                    },
                    loc: (prop ?? co).loc,
                    messageId: "missingIsolatedModules",
                });
            },
        };
    },
    meta: {
        docs: {
            description:
                "require `isolatedModules: true` for single-file transpiler compatibility.",
            recommended: false,
            requiresTypeChecking: false,
            tsconfigConfigs: ["all", "module-resolution"],
            url: createRuleDocsUrl("require-isolated-modules"),
        },
        fixable: "code",
        messages: {
            missingIsolatedModules:
                '`isolatedModules: true` is required when using a bundler or transpiler that processes TypeScript files individually (Vite, esbuild, Parcel, SWC, Babel). Without it, TypeScript features that need cross-file type information — such as `const enum` — will compile but fail at runtime. Add `"isolatedModules": true` to `compilerOptions`.',
        },
        schema: [],
        type: "suggestion",
    },
    name: "require-isolated-modules",
});

export default rule;
