import { ESLint } from "eslint";
import { mkdir, writeFile } from "node:fs/promises";
import * as path from "node:path";
import { performance } from "node:perf_hooks";
import pc from "picocolors";

import {
    benchmarkFileGlobs,
    createTsconfigFlatConfig,
    repositoryRoot,
    tsconfigRuleSets,
} from "./eslint-benchmark-config.mjs";

const defaultIterations = 3;
const defaultWarmupIterations = 1;

const benchmarkScenarios = Object.freeze([
    {
        filePatterns: benchmarkFileGlobs.invalidFixtures,
        fix: false,
        name: "recommended-invalid-tsconfig",
        rules: tsconfigRuleSets.recommended,
    },
    {
        filePatterns: benchmarkFileGlobs.validFixtures,
        fix: false,
        name: "recommended-valid-tsconfig",
        rules: tsconfigRuleSets.recommended,
    },
    {
        filePatterns: benchmarkFileGlobs.moduleResolutionFixtures,
        fix: false,
        name: "module-resolution-invalid-tsconfig",
        rules: tsconfigRuleSets["module-resolution"],
    },
    {
        filePatterns: benchmarkFileGlobs.invalidFixtures,
        fix: false,
        name: "strict-invalid-tsconfig",
        rules: tsconfigRuleSets.strict,
    },
]);

/**
 * @param {string} key
 * @param {number} fallbackValue
 *
 * @returns {number}
 */
const parseIntegerArgument = (key, fallbackValue) => {
    const matchingArgument = process.argv.find((argument) =>
        argument.startsWith(`--${key}=`)
    );
    if (matchingArgument === undefined) {
        return fallbackValue;
    }

    const [, rawValue = ""] = matchingArgument.split("=");
    const parsedValue = Number.parseInt(rawValue, 10);
    if (!Number.isInteger(parsedValue) || parsedValue < 0) {
        throw new TypeError(
            `Expected --${key}=<non-negative-integer>; received '${rawValue}'.`
        );
    }

    return parsedValue;
};

/**
 * @param {{ fix: boolean; rules: import("eslint").Linter.RulesRecord }} options
 *
 * @returns {ESLint}
 */
const createBenchmarkEslint = ({ fix, rules }) =>
    new ESLint({
        cache: false,
        cwd: repositoryRoot,
        fix,
        overrideConfig: createTsconfigFlatConfig({ rules }),
        overrideConfigFile: true,
        stats: true,
    });

/**
 * @param {Readonly<{
 *     filePatterns: readonly string[];
 *     fix: boolean;
 *     iterations: number;
 *     name: string;
 *     rules: import("eslint").Linter.RulesRecord;
 *     warmupIterations: number;
 * }>} options
 */
const runScenario = async ({
    filePatterns,
    fix,
    name,
    rules,
    iterations,
    warmupIterations,
}) => {
    const eslint = createBenchmarkEslint({ fix, rules });

    for (
        let warmupIndex = 0;
        warmupIndex < warmupIterations;
        warmupIndex += 1
    ) {
        await eslint.lintFiles([...filePatterns]);
    }

    const durations = [];
    let messageCount = 0;

    for (
        let iterationIndex = 0;
        iterationIndex < iterations;
        iterationIndex += 1
    ) {
        const startedAt = performance.now();
        const lintResults = await eslint.lintFiles([...filePatterns]);
        const endedAt = performance.now();

        durations.push(endedAt - startedAt);
        messageCount = lintResults.reduce(
            (total, result) => total + result.messages.length,
            0
        );
    }

    return {
        iterations,
        meanMilliseconds:
            durations.reduce((total, value) => total + value, 0) /
            durations.length,
        messageCount,
        name,
        warmupIterations,
    };
};

const iterations = parseIntegerArgument("iterations", defaultIterations);
const warmupIterations = parseIntegerArgument(
    "warmup-iterations",
    defaultWarmupIterations
);

console.log(
    pc.bold(pc.cyan("Running eslint-plugin-tsconfig benchmark scenarios..."))
);

const results = [];
for (const scenario of benchmarkScenarios) {
    const result = await runScenario({
        ...scenario,
        iterations,
        warmupIterations,
    });

    results.push(result);

    console.log(
        `${pc.green("✓")} ${pc.bold(result.name)} ${pc.gray("->")} ` +
            `${result.messageCount} message(s), ${result.meanMilliseconds.toFixed(2)}ms mean`
    );
}

const outputDirectory = path.join(repositoryRoot, "coverage");
await mkdir(outputDirectory, { recursive: true });
await writeFile(
    path.join(outputDirectory, "bench-results.json"),
    JSON.stringify(
        {
            generatedAt: new Date().toISOString(),
            iterations,
            results,
            warmupIterations,
        },
        null,
        2
    ),
    "utf8"
);
