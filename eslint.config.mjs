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
    ...nickTwoBadFourU.configs.withoutTsconfig,

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
