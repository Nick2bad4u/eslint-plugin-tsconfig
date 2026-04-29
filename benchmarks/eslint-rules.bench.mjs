import { ESLint } from "eslint";
import { bench, describe, expect } from "vitest";

import {
    benchmarkFileGlobs,
    createTsconfigFlatConfig,
    tsconfigRuleSets,
} from "./eslint-benchmark-config.mjs";

/**
 * @typedef {import("eslint").ESLint.LintResult} LintResult
 */

/**
 * @typedef {ReadonlyArray<LintResult>} LintResults
 */

/**
 * @typedef {import("eslint").Linter.RulesRecord} BenchmarkRules
 */

/**
 * @typedef {Readonly<{
 *     filePatterns: readonly string[];
 *     fix: boolean;
 *     rules: BenchmarkRules;
 * }>} LintScenarioOptions
 */

const standardBenchmarkOptions = Object.freeze({
    iterations: 3,
    warmupIterations: 1,
});

const expensiveBenchmarkOptions = Object.freeze({
    iterations: 2,
    warmupIterations: 0,
});

/**
 * Count lint problems so benchmark runs assert useful signal.
 *
 * @param {LintResults} lintResults - ESLint lint results.
 *
 * @returns {number} Total error + warning count.
 */
const countReportedProblems = (lintResults) =>
    lintResults.reduce(
        (problemCount, result) =>
            problemCount + result.errorCount + result.warningCount,
        0
    );

/**
 * Guard benchmark outputs to ensure each case performs real lint work.
 *
 * @param {string} scenarioName - Human-friendly scenario label.
 * @param {LintResults} lintResults - ESLint lint results.
 * @param {{
 *     maximumReportedProblems?: number;
 *     minimumReportedProblems?: number;
 * }} [options]
 */
const assertMeaningfulBenchmarkSignal = (
    scenarioName,
    lintResults,
    options
) => {
    const maximumReportedProblems =
        options?.maximumReportedProblems ?? Number.POSITIVE_INFINITY;
    const minimumReportedProblems = options?.minimumReportedProblems ?? 1;

    if (lintResults.length === 0) {
        throw new Error(`${scenarioName}: ESLint returned no lint results.`);
    }

    const reportedProblems = countReportedProblems(lintResults);
    if (reportedProblems < minimumReportedProblems) {
        throw new Error(
            `${scenarioName}: expected at least ${minimumReportedProblems} reported lint problem(s).`
        );
    }

    if (reportedProblems > maximumReportedProblems) {
        throw new Error(
            `${scenarioName}: expected at most ${maximumReportedProblems} reported lint problem(s).`
        );
    }
};

/**
 * Run ESLint with a temporary benchmark-specific config.
 *
 * @param {LintScenarioOptions} options - Scenario options.
 *
 * @returns {Promise<LintResult[]>} ESLint lint results.
 */
const lintScenario = async ({ filePatterns, fix, rules }) => {
    const eslint = new ESLint({
        cache: false,
        fix,
        overrideConfig: createTsconfigFlatConfig({ rules }),
        overrideConfigFile: true,
        stats: true,
    });

    return eslint.lintFiles([...filePatterns]);
};

describe("eslint-plugin-tsconfig meaningful benchmarks", () => {
    bench(
        "recommended preset on invalid tsconfig fixtures",
        async () => {
            expect.hasAssertions();

            const lintResults = await lintScenario({
                filePatterns: benchmarkFileGlobs.invalidFixtures,
                fix: false,
                rules: tsconfigRuleSets.recommended,
            });

            assertMeaningfulBenchmarkSignal(
                "recommended preset on invalid tsconfig fixtures",
                lintResults
            );
        },
        standardBenchmarkOptions
    );

    bench(
        "strict preset on invalid tsconfig fixtures",
        async () => {
            expect.hasAssertions();

            const lintResults = await lintScenario({
                filePatterns: benchmarkFileGlobs.invalidFixtures,
                fix: false,
                rules: tsconfigRuleSets.strict,
            });

            assertMeaningfulBenchmarkSignal(
                "strict preset on invalid tsconfig fixtures",
                lintResults
            );
        },
        standardBenchmarkOptions
    );

    bench(
        "module-resolution preset on module-resolution fixtures",
        async () => {
            expect.hasAssertions();

            const lintResults = await lintScenario({
                filePatterns: benchmarkFileGlobs.moduleResolutionFixtures,
                fix: false,
                rules: tsconfigRuleSets["module-resolution"],
            });

            assertMeaningfulBenchmarkSignal(
                "module-resolution preset on module-resolution fixtures",
                lintResults
            );
        },
        standardBenchmarkOptions
    );

    bench(
        "recommended preset on valid tsconfig fixtures",
        async () => {
            expect.hasAssertions();

            const lintResults = await lintScenario({
                filePatterns: benchmarkFileGlobs.validFixtures,
                fix: false,
                rules: tsconfigRuleSets.recommended,
            });

            assertMeaningfulBenchmarkSignal(
                "recommended preset on valid tsconfig fixtures",
                lintResults,
                { minimumReportedProblems: 0 }
            );
        },
        standardBenchmarkOptions
    );

    bench(
        "recommended preset with fix=true on invalid fixtures",
        async () => {
            expect.hasAssertions();

            const lintResults = await lintScenario({
                filePatterns: benchmarkFileGlobs.invalidFixtures,
                fix: true,
                rules: tsconfigRuleSets.recommended,
            });

            assertMeaningfulBenchmarkSignal(
                "recommended preset with fix=true on invalid fixtures",
                lintResults,
                { minimumReportedProblems: 0 }
            );
        },
        expensiveBenchmarkOptions
    );
});