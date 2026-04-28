import { defineConfig } from "eslint-rule-benchmark";

export default defineConfig({
    iterations: 80,
    tests: [
        {
            cases: [
                {
                    testPath: "./cases/consistent-module-resolution/baseline.json",
                },
                {
                    testPath: "./cases/consistent-module-resolution/complex.json",
                },
            ],
            name: "Rule: consistent-module-resolution",
            ruleId: "tsconfig/consistent-module-resolution",
            rulePath: "../src/rules/consistent-module-resolution.ts",
            warmup: {
                iterations: 15,
            },
        },
    ],
    timeout: 3000,
    warmup: {
        enabled: true,
        iterations: 20,
    },
});