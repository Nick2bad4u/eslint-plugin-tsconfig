import * as path from "node:path";

import * as jsoncParser from "jsonc-eslint-parser";

import plugin from "../plugin.mjs";

/**
 * @typedef {Record<string, unknown>} UnknownRecord
 */

/**
 * @typedef {import("eslint").Linter.RulesRecord} BenchmarkRules
 */

/**
 * @typedef {{ rules: BenchmarkRules }} CreateTsconfigFlatConfigOptions
 */

/**
 * @typedef {{
 *     invalidFixtures: readonly string[];
 *     moduleResolutionFixtures: readonly string[];
 *     validFixtures: readonly string[];
 * }} BenchmarkFileGlobs
 */

/**
 * @typedef {{
 *     all: Readonly<BenchmarkRules>;
 *     recommended: Readonly<BenchmarkRules>;
 *     strict: Readonly<BenchmarkRules>;
 *     "emit-config": Readonly<BenchmarkRules>;
 *     "include-hygiene": Readonly<BenchmarkRules>;
 *     "lib-target": Readonly<BenchmarkRules>;
 *     "module-resolution": Readonly<BenchmarkRules>;
 *     "project-references": Readonly<BenchmarkRules>;
 *     "strict-mode": Readonly<BenchmarkRules>;
 * }} TsconfigRuleSets
 */

/**
 * @param {unknown} value
 *
 * @returns {value is UnknownRecord}
 */
const isUnknownRecord = (value) => typeof value === "object" && value !== null;

/**
 * @param {unknown} value
 * @param {string} label
 *
 * @returns {UnknownRecord}
 */
const ensureRecord = (value, label) => {
    if (!isUnknownRecord(value)) {
        throw new TypeError(`${label} must be a non-null object.`);
    }

    return value;
};

/**
 * @param {unknown} value
 *
 * @returns {value is import("eslint").Linter.RuleEntry}
 */
const isRuleEntry = (value) =>
    typeof value === "number" ||
    typeof value === "string" ||
    Array.isArray(value);

/**
 * @param {unknown} value
 * @param {string} label
 *
 * @returns {BenchmarkRules}
 */
const ensureRulesRecord = (value, label) => {
    const record = ensureRecord(value, label);
    /** @type {BenchmarkRules} */
    const rulesRecord = {};

    for (const [ruleName, ruleEntry] of Object.entries(record)) {
        if (!isRuleEntry(ruleEntry)) {
            throw new TypeError(
                `${label}.${ruleName} must be a valid ESLint rule entry.`
            );
        }

        rulesRecord[ruleName] =
            /** @type {import("eslint").Linter.RuleEntry} */ (ruleEntry);
    }

    return rulesRecord;
};

/** Absolute repository root used by benchmark configs. */
export const repositoryRoot = path.resolve(process.cwd());

/** @type {Readonly<BenchmarkFileGlobs>} */
export const benchmarkFileGlobs = Object.freeze({
    invalidFixtures: Object.freeze([
        "benchmarks/fixtures/tsconfig.invalid.json",
    ]),
    moduleResolutionFixtures: Object.freeze([
        "benchmarks/fixtures/module-resolution.invalid.json",
    ]),
    validFixtures: Object.freeze(["benchmarks/fixtures/tsconfig.valid.json"]),
});

/**
 * @param {string} presetName
 *
 * @returns {Readonly<BenchmarkRules>}
 */
const resolveRuleSet = (presetName) => {
    const configs = ensureRecord(plugin.configs, "plugin.configs");
    const preset = ensureRecord(
        configs[presetName],
        `plugin.configs.${presetName}`
    );
    const rules = ensureRulesRecord(
        preset["rules"],
        `${presetName} preset rules`
    );

    return Object.freeze({ ...rules });
};

/** @type {Readonly<TsconfigRuleSets>} */
export const tsconfigRuleSets = Object.freeze({
    all: resolveRuleSet("all"),
    recommended: resolveRuleSet("recommended"),
    strict: resolveRuleSet("strict"),
    "emit-config": resolveRuleSet("emit-config"),
    "include-hygiene": resolveRuleSet("include-hygiene"),
    "lib-target": resolveRuleSet("lib-target"),
    "module-resolution": resolveRuleSet("module-resolution"),
    "project-references": resolveRuleSet("project-references"),
    "strict-mode": resolveRuleSet("strict-mode"),
});

/**
 * Create a flat ESLint config array for tsconfig benchmark scenarios.
 *
 * @param {CreateTsconfigFlatConfigOptions} options - Config creation options.
 *
 * @returns {import("eslint").Linter.Config[]} Flat config array for ESLint Node
 *   API / CLI usage.
 */
export function createTsconfigFlatConfig(options) {
    const { rules } = options;

    return [
        {
            files: ["**/*.json", "**/*.jsonc"],
            languageOptions: {
                parser: jsoncParser,
            },
            name: "benchmark:tsconfig",
            plugins: {
                tsconfig: plugin,
            },
            rules,
        },
    ];
}
