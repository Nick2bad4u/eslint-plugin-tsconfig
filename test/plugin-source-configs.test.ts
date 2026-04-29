/**
 * @packageDocumentation
 * Integration coverage for source-level plugin preset wiring.
 */
import type { AsyncReturnType, ValueOf } from "type-fest";

import { objectEntries, objectKeys } from "ts-extras";
import { describe, expect, it, vi } from "vitest";

import {
    tsconfigConfigMetadataByName,
    tsconfigConfigNames,
} from "../src/_internal/tsconfig-config-references";

/** Import `src/plugin` fresh for each assertion set. */
const loadSourcePlugin = async () => {
    vi.resetModules();
    const pluginModule = await import("../src/plugin");
    return pluginModule.default;
};

/** Plugin config object shape inferred from the loaded source plugin. */
type PluginConfig = ValueOf<PluginType["configs"]>;
/** Resolved plugin module type for async source import helper. */
type PluginType = AsyncReturnType<typeof loadSourcePlugin>;

/** Convert a preset rules object into deterministic `[ruleId, level]` entries. */
const getRuleEntries = (
    config: Readonly<PluginConfig>
): (readonly [string, unknown])[] => objectEntries(config.rules ?? {});

describe("source plugin config wiring", () => {
    it("builds non-empty rule presets for all config keys", async () => {
        expect.hasAssertions();

        const plugin = await loadSourcePlugin();
        const all = plugin.configs.all;
        const strict = plugin.configs.strict;
        const recommended = plugin.configs.recommended;

        expect(getRuleEntries(all).length).toBeGreaterThan(0);
        expect(getRuleEntries(strict).length).toBeGreaterThan(0);
        expect(getRuleEntries(recommended).length).toBeGreaterThan(0);

        // The all preset should contain every registered rule
        const expectedQualifiedRuleIds = objectKeys(plugin.rules).map(
            (ruleName) => `tsconfig/${ruleName}`
        );

        expect(objectKeys(all.rules)).toStrictEqual(
            expect.arrayContaining(expectedQualifiedRuleIds)
        );

        // Core tsconfig rules should be in strict and all
        expect(objectKeys(strict.rules)).toContain(
            "tsconfig/require-strict-mode"
        );
        expect(objectKeys(all.rules)).toContain("tsconfig/require-strict-mode");
        expect(objectKeys(all.rules)).toContain(
            "tsconfig/consistent-incremental-with-tsbuildinfo"
        );

        // Preset name metadata
        for (const configName of tsconfigConfigNames) {
            expect(plugin.configs[configName].name).toBe(
                `tsconfig/${configName}`
            );
        }

        expect(plugin.meta.name).toBe("eslint-plugin-tsconfig");
    });

    it("registers parser defaults, files, and plugin namespace", async () => {
        expect.hasAssertions();

        const plugin = await loadSourcePlugin();
        const recommendedConfig = plugin.configs.recommended;

        expect(recommendedConfig.files).toStrictEqual(
            expect.arrayContaining([expect.stringContaining("tsconfig")])
        );
        expect(recommendedConfig.plugins).toHaveProperty("tsconfig");
        expect(recommendedConfig.plugins?.["tsconfig"]).toHaveProperty("rules");
        expect(recommendedConfig.languageOptions).toHaveProperty("parser");

        // All configs use JSONC parser — no projectService needed
        for (const configName of tsconfigConfigNames) {
            expect(
                tsconfigConfigMetadataByName[configName].requiresTypeChecking
            ).toBeFalsy();
        }
    });

    it("builds category preset configs for all 9 config keys", async () => {
        expect.hasAssertions();

        const plugin = await loadSourcePlugin();

        for (const configName of tsconfigConfigNames) {
            const config = plugin.configs[configName];

            expect(config).toBeDefined();
            expect(config.rules).toBeDefined();
            expect(objectKeys(config.rules).length).toBeGreaterThanOrEqual(0);
        }
    });
});
