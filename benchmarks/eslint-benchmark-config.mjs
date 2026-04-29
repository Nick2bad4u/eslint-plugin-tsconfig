import * as jsoncParser from "jsonc-eslint-parser";
import * as path from "node:path";

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
 * Check whether a runtime value is a plain non-null object.
 *
 * @param {unknown} value - Runtime value to narrow.
 *
 * @returns {value is UnknownRecord} `true` when `value` is object-like.
 */
const isUnknownRecord = (value) => typeof value === "object" && value !== null;

/**
 * Assert that a runtime value is a record-like object.
 *
 * @param {unknown} value - Value to validate.
 * @param {string} label - Label used in thrown error messages.
 *
 * @returns {UnknownRecord} Validated object record.
 */
const ensureRecord = (value, label) => {
    if (!isUnknownRecord(value)) {
        throw new TypeError(`${label} must be a non-null object.`);
    }

    return value;
};

/**
 * Validate that a value is assignable as an ESLint rule entry.
 *
 * @param {unknown} value - Candidate rule entry value.
 *
 * @returns {value is import("eslint").Linter.RuleEntry} `true` when valid.
 */
const isRuleEntry = (value) =>
    typeof value === "number" ||
    typeof value === "string" ||
    Array.isArray(value);

/**
 * Validate and normalize an object into an ESLint rules record.
 *
 * @param {unknown} value - Candidate object containing rules.
 * @param {string} label - Context label used for validation errors.
 *
 * @returns {BenchmarkRules} Rules record with validated entries.
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
 * Resolve a benchmark rule set from an exported plugin preset.
 *
 * @param {string} presetName - Preset key under `plugin.configs`.
 *
 * @returns {Readonly<BenchmarkRules>} Frozen rules map for the preset.
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
    "emit-config": resolveRuleSet("emit-config"),
    "include-hygiene": resolveRuleSet("include-hygiene"),
    "lib-target": resolveRuleSet("lib-target"),
    "module-resolution": resolveRuleSet("module-resolution"),
    "project-references": resolveRuleSet("project-references"),
    recommended: resolveRuleSet("recommended"),
    strict: resolveRuleSet("strict"),
    "strict-mode": resolveRuleSet("strict-mode"),
});

/**
 * Create a flat ESLint config array for tsconfig benchmark scenarios.
 *
 * @param {CreateTsconfigFlatConfigOptions} options - Config creation options.
 *
 * @returns {import("eslint").Linter.Config[]} Flat config array.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types -- .mjs modules cannot express TS parameter/return annotations; JSDoc carries the boundary contract.
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
