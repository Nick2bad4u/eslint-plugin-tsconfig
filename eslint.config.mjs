import nickTwoBadFourU from "eslint-config-nick2bad4u";

import plugin from "./plugin.mjs";

const allConfig = plugin.configs?.["all"];
const localPluginRules =
    allConfig &&
    !Array.isArray(allConfig) &&
    typeof allConfig === "object" &&
    "rules" in allConfig
        ? (allConfig.rules ?? {})
        : {};

/** @type {import("eslint").Linter.Config[]} */
const config = [
    {
        ignores: [
            "benchmark/**",
            "benchmarks/**",
            "docs/docusaurus/typedoc-plugins/**",
            "knip.config.ts",
            "remark-lint-modules.d.ts",
            "temp/**",
            "vitest.stryker.config.ts",
        ],
        name: "Repository Generated and Tooling Ignores",
    },

    ...nickTwoBadFourU.configs.withoutTsconfig,

    {
        files: ["docs/docusaurus/**/*.{js,mjs,cjs,ts,mts,cts,tsx,jsx}"],
        name: "Docusaurus Workspace Resolution",
        rules: {
            "canonical/filename-no-index": "off",
            "n/no-process-env": "off",
            "sonarjs/no-implicit-dependencies": "off",
            "unicorn/filename-case": "off",
            "unicorn/no-non-function-verb-prefix": "off",
            "unicorn/no-unreadable-new-expression": "off",
            "unicorn/prefer-short-arrow-method": "off",
            "unicorn/prefer-temporal": "off",
        },
    },
    {
        files: ["docs/docusaurus/**/*.css"],
        name: "Docusaurus CSS Stylelint Bridge",
        rules: {
            "stylelint-2/stylelint": "off",
        },
    },
    {
        files: ["docs/docusaurus/src/js/modernEnhancements.ts"],
        name: "Docusaurus Client Enhancements",
        rules: {
            "@typescript-eslint/no-dynamic-delete": "off",
            "prefer-named-capture-group": "off",
            "regexp/no-super-linear-backtracking": "off",
            "regexp/prefer-named-capture-group": "off",
            "runtime-cleanup/no-unmanaged-event-listeners": "off",
            "unicorn/filename-case": "off",
            "unicorn/no-break-in-nested-loop": "off",
            "unicorn/no-global-object-property-assignment": "off",
            "unicorn/no-incorrect-template-string-interpolation": "off",
            "unicorn/no-unnecessary-global-this": "off",
        },
    },
    {
        files: ["docs/docusaurus/sidebars.rules.ts"],
        name: "Docusaurus Sidebar Generation",
        rules: {
            "@typescript-eslint/prefer-nullish-coalescing": "off",
            "n/no-sync": "off",
            "unicorn/no-array-sort": "off",
            "unicorn/prefer-import-meta-properties": "off",
        },
    },
    {
        files: [
            "src/_internal/rule-catalog.ts",
            "src/_internal/rule-docs-metadata.ts",
            "src/_internal/rules-registry.ts",
            "src/rules/**/*.ts",
        ],
        name: "Plugin Rule Implementation Compatibility",
        rules: {
            complexity: "off",
            "import-x/max-dependencies": "off",
            "no-duplicate-imports": "off",
            "unicorn/consistent-boolean-name": "off",
            "unicorn/import-style": "off",
            "unicorn/no-declarations-before-early-exit": "off",
            "unicorn/prefer-includes-over-repeated-comparisons": "off",
            "unicorn/prefer-short-arrow-method": "off",
            "unicorn/prefer-ternary": "off",
        },
    },
    {
        files: ["src/_internal/jsonc-helpers.ts"],
        name: "JSONC Helper AST Walkers",
        rules: {
            "no-plusplus": "off",
        },
    },
    {
        files: ["stryker.config.mjs", "vite.config.ts"],
        name: "Tooling Config Runtime Values",
        rules: {
            "@typescript-eslint/dot-notation": "off",
            "@typescript-eslint/no-unsafe-assignment": "off",
            "@typescript-eslint/no-unsafe-call": "off",
            "@typescript-eslint/no-unsafe-member-access": "off",
            "unicorn/prefer-number-coercion": "off",
        },
    },
    {
        files: ["test/**/*.{js,mjs,cjs,ts,mts,cts,tsx,jsx}"],
        name: "Repository Test Compatibility",
        rules: {
            "n/no-process-env": "off",
            "test-signal/no-constant-assertions": "off",
            "test-signal/no-snapshot-only-tests": "off",
            "test-signal/no-tautological-length-assertions": "off",
            "test-signal/no-weak-existence-assertions": "off",
            "test-signal/require-negative-path": "off",
            "unicorn/consistent-boolean-name": "off",
            "unicorn/max-nested-calls": "off",
            "unicorn/no-top-level-side-effects": "off",
            "unicorn/no-unreadable-for-of-expression": "off",
            "unicorn/no-unreadable-new-expression": "off",
            "unicorn/try-complexity": "off",
        },
    },

    // Local Plugin Config
    // This lets us use the plugin's rules in this repository without needing to publish the plugin first.
    {
        files: ["src/**/*.{js,mjs,cjs,ts,mts,cts,tsx,jsx}"],
        name: "Local TSConfig",
        plugins: {
            tsconfig: plugin,
        },
        rules: localPluginRules,
    },
    // Add repository-specific config entries below as needed.
];

export default config;
