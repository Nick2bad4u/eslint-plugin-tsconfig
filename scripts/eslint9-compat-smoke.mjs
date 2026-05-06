import * as path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

import { ESLint } from "eslint";
import pc from "picocolors";

import plugin from "../plugin.mjs";

/**
 * @typedef {Readonly<{
 *     expectedMaximumMessages?: number;
 *     expectedMinimumMessages: number;
 *     expectedOutputIncludes?: readonly string[];
 *     filePath: string;
 *     fix: boolean;
 *     name: string;
 *     ruleId: string;
 *     sourceText: string;
 * }>} Scenario
 */

/**
 * @typedef {Record<string, unknown>} UnknownRecord
 */

const scriptsDirectoryPath = fileURLToPath(new URL(".", import.meta.url));
const repositoryRootPath = path.resolve(scriptsDirectoryPath, "..");

const expectedEslintMajorArgumentPrefix = "--expect-eslint-major=";

/**
 * @param {unknown} value
 *
 * @returns {value is UnknownRecord}
 */
const isUnknownRecord = (value) =>
    typeof value === "object" && value !== null && !Array.isArray(value);

/**
 * @param {readonly string[]} argv
 *
 * @returns {number | undefined}
 */
const parseExpectedEslintMajor = (argv) => {
    const matchingArgument = argv.find((argument) =>
        argument.startsWith(expectedEslintMajorArgumentPrefix)
    );

    if (matchingArgument === undefined) {
        return undefined;
    }

    const majorString = matchingArgument.slice(
        expectedEslintMajorArgumentPrefix.length
    );

    if (majorString.length === 0) {
        throw new TypeError(
            `Missing ESLint major value in argument: ${matchingArgument}`
        );
    }

    const majorValue = Number.parseInt(majorString, 10);

    if (Number.isNaN(majorValue)) {
        throw new TypeError(
            `Invalid ESLint major value in argument: ${matchingArgument}`
        );
    }

    return majorValue;
};

/**
 * @param {number | undefined} expectedMajor
 */
const assertEslintMajor = (expectedMajor) => {
    const runtimeVersion = ESLint.version;

    if (typeof runtimeVersion !== "string" || runtimeVersion.length === 0) {
        throw new Error(
            `Unable to determine ESLint runtime version: ${String(runtimeVersion)}`
        );
    }

    const [runtimeMajorText] = runtimeVersion.split(".", 1);

    if (runtimeMajorText === undefined || runtimeMajorText.length === 0) {
        throw new TypeError(
            `Unable to parse ESLint runtime version: ${runtimeVersion}`
        );
    }

    const runtimeMajor = Number.parseInt(runtimeMajorText, 10);

    if (Number.isNaN(runtimeMajor)) {
        throw new TypeError(
            `Unable to parse ESLint runtime version: ${runtimeVersion}`
        );
    }

    if (expectedMajor !== undefined && runtimeMajor !== expectedMajor) {
        throw new RangeError(
            `Expected ESLint major ${expectedMajor}, but detected ${runtimeVersion}.`
        );
    }

    console.log(
        `${pc.green("✓")}` +
            ` ESLint runtime ${pc.bold(runtimeVersion)} detected for compatibility smoke checks.`
    );
};

/**
 * @param {string} ruleId
 *
 * @returns {import("eslint").Linter.Config[]}
 */
const createCompatibilityConfig = (ruleId) => {
    const recommendedConfig = plugin.configs?.["recommended"];
    if (!isUnknownRecord(recommendedConfig)) {
        throw new Error(
            "Plugin recommended config is unavailable. Compatibility smoke test cannot continue."
        );
    }

    return [
        {
            ...recommendedConfig,
            name: `compat-smoke:${ruleId}`,
            plugins: {
                tsconfig: plugin,
            },
            rules: {
                [ruleId]: "error",
            },
        },
    ];
};

/**
 * @param {Scenario} scenario
 */
const runScenario = async ({
    expectedMaximumMessages,
    expectedMinimumMessages,
    expectedOutputIncludes,
    filePath,
    fix,
    name,
    ruleId,
    sourceText,
}) => {
    const eslint = new ESLint({
        cwd: repositoryRootPath,
        fix,
        ignore: false,
        overrideConfig: createCompatibilityConfig(ruleId),
        overrideConfigFile: true,
    });

    const lintResults = await eslint.lintText(sourceText, {
        filePath,
    });

    const fatalMessages = lintResults.flatMap((result) =>
        result.messages.filter((message) => message.fatal === true)
    );

    if (fatalMessages.length > 0) {
        throw new Error(
            `${name}: encountered fatal parse/runtime diagnostics (${fatalMessages.length}).`
        );
    }

    const matchingMessages = lintResults.flatMap((result) =>
        result.messages.filter((message) => message.ruleId === ruleId)
    );

    if (matchingMessages.length < expectedMinimumMessages) {
        throw new Error(
            `${name}: expected at least ${expectedMinimumMessages} ${ruleId} message(s), received ${matchingMessages.length}.`
        );
    }

    if (
        expectedMaximumMessages !== undefined &&
        matchingMessages.length > expectedMaximumMessages
    ) {
        throw new Error(
            `${name}: expected at most ${expectedMaximumMessages} ${ruleId} message(s), received ${matchingMessages.length}.`
        );
    }

    if (fix) {
        const fixedOutputs = lintResults
            .map((result) => result.output)
            .filter((output) => typeof output === "string");
        const combinedOutput = fixedOutputs.join("\n");
        for (const expectedOutputSnippet of expectedOutputIncludes ?? []) {
            if (!combinedOutput.includes(expectedOutputSnippet)) {
                throw new Error(
                    `${name}: expected fixed output to include "${expectedOutputSnippet}".`
                );
            }
        }
    }

    console.log(
        `${pc.green("✓")}` +
            ` ${pc.bold(name)} ${pc.gray("->")} ${pc.bold(ruleId)} (fix=${fix}) produced ${pc.magenta(
                String(matchingMessages.length)
            )} message(s).`
    );
};

const scenarios = /** @type {const} */ ([
    {
        expectedMaximumMessages: 1,
        expectedMinimumMessages: 1,
        filePath: path.resolve(
            repositoryRootPath,
            "temp/compat/tsconfig.strict-detection.json"
        ),
        fix: false,
        name: "strict-detection",
        ruleId: "tsconfig/require-strict-mode",
        sourceText: '{"compilerOptions":{"target":"ES2022"}}',
    },
    {
        expectedMaximumMessages: 0,
        expectedMinimumMessages: 0,
        expectedOutputIncludes: ['"strict": true'],
        filePath: path.resolve(
            repositoryRootPath,
            "temp/compat/tsconfig.strict-autofix.json"
        ),
        fix: true,
        name: "strict-autofix",
        ruleId: "tsconfig/require-strict-mode",
        sourceText: '{"compilerOptions":{"target":"ES2022"}}',
    },
    {
        expectedMaximumMessages: 1,
        expectedMinimumMessages: 1,
        filePath: path.resolve(
            repositoryRootPath,
            "temp/compat/tsconfig.deprecated-target.json"
        ),
        fix: false,
        name: "deprecated-target-detection",
        ruleId: "tsconfig/no-deprecated-target",
        sourceText: '{"compilerOptions":{"target":"ES5"}}',
    },
]);

console.log(pc.bold(pc.cyan("Running ESLint compatibility smoke checks...")));

const expectedEslintMajor = parseExpectedEslintMajor(process.argv.slice(2));
assertEslintMajor(expectedEslintMajor);

for (const scenario of scenarios) {
    await runScenario(scenario);
}

console.log(pc.bold(pc.green("ESLint compatibility smoke checks passed.")));
