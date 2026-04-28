import {
    createTsconfigFlatConfig,
    tsconfigRuleSets,
} from "./eslint-benchmark-config.mjs";

/**
 * Benchmark-oriented ESLint flat config for CLI TIMING/--stats runs.
 */
/** @type {import("eslint").Linter.Config[]} */
const benchmarkTimingConfig = createTsconfigFlatConfig({
    rules: tsconfigRuleSets.recommended,
});

export default benchmarkTimingConfig;