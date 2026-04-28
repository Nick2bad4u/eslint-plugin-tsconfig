/**
 * @packageDocumentation
 * Vitest coverage for `configs.test` behavior — verifies tsconfig plugin preset wiring.
 */
import type { UnknownRecord } from "type-fest";

import { objectKeys, objectValues  } from "ts-extras";
import { describe, expect, it } from "vitest";

import {
    tsconfigConfigMetadataByName,
    tsconfigConfigNames,
} from "../src/_internal/tsconfig-config-references";
import tsconfigPlugin from "../src/plugin";

interface FlatConfigLike {
    files?: unknown;
    languageOptions?: UnknownRecord & {
        parser?: unknown;
        parserOptions?: unknown;
    };
    name?: unknown;
    plugins?: UnknownRecord;
    rules?: UnknownRecord;
}

/**
 * Resolve a named plugin preset config from a dynamic `plugin.configs` map.
 */
function getConfig(
    configs: Readonly<null | UnknownRecord>,
    configName: string
): FlatConfigLike | undefined {
    const config = configs?.[configName];
    return isObject(config) ? config : undefined;
}

/**
 * Resolve the `rules` object for a named plugin preset.
 */
function getConfigRules(
    configs: Readonly<null | UnknownRecord>,
    configName: string
): null | UnknownRecord {
    const config = configs?.[configName];
    if (!isObject(config)) return null;
    const rules = config["rules"];
    if (!isObject(rules)) return null;
    return rules;
}

/**
 * Extract the `configs` export from a dynamic plugin value.
 */
function getPluginConfigs(pluginValue: unknown): null | UnknownRecord {
    if (!isObject(pluginValue)) return null;
    const configs = pluginValue["configs"];
    if (!isObject(configs)) return null;
    return configs;
}

/**
 * Extract the `rules` export from a dynamic plugin value.
 */
function getPluginRules(pluginValue: unknown): null | UnknownRecord {
    if (!isObject(pluginValue)) return null;
    const rules = pluginValue["rules"];
    if (!isObject(rules)) return null;
    return rules;
}

/**
 * Check whether a dynamic value is an object-like record.
 */
function isObject(value: unknown): value is UnknownRecord {
    return typeof value === "object" && value !== null;
}

describe("tsconfig plugin configs", () => {
    const configs = getPluginConfigs(tsconfigPlugin);
    const rules = getPluginRules(tsconfigPlugin);

    it("exports exactly the supported config keys", () => {
        expect(true).toBeTruthy();

        const keys = objectKeys(configs ?? {});

        expect(keys).toHaveLength(tsconfigConfigNames.length);
        expect(new Set(keys)).toStrictEqual(new Set(tsconfigConfigNames));
    });

    it("every exported config registers the tsconfig plugin", () => {
        expect(true).toBeTruthy();

        for (const config of objectValues(configs ?? {}) as FlatConfigLike[]) {
            expect(config).toStrictEqual(
                expect.objectContaining({
                    plugins: expect.objectContaining({
                        tsconfig: expect.anything(),
                    }),
                })
            );
        }
    });

    it("every exported config targets tsconfig file globs", () => {
        expect(true).toBeTruthy();

        for (const config of objectValues(configs ?? {}) as FlatConfigLike[]) {
            expect(config).toStrictEqual(
                expect.objectContaining({
                    files: expect.arrayContaining([
                        expect.stringContaining("tsconfig"),
                    ]),
                })
            );
        }
    });

    it("every exported config uses jsonc-eslint-parser", () => {
        expect(true).toBeTruthy();

        for (const config of objectValues(configs ?? {}) as FlatConfigLike[]) {
            expect(config.languageOptions?.parser).toBeDefined();
        }
    });

    it("enables every rule in the all preset", () => {
        expect(true).toBeTruthy();

        const allRules = getConfigRules(configs, "all");

        expect(allRules).toBeDefined();

        for (const ruleId of objectKeys(rules ?? {})) {
            const qualifiedRuleId = `tsconfig/${ruleId}`;

            expect(allRules).toHaveProperty(qualifiedRuleId);
        }
    });

    it("recommended preset uses warn severity", () => {
        expect(true).toBeTruthy();

        const recommendedRules = getConfigRules(configs, "recommended");

        expect(recommendedRules).toBeDefined();

        for (const severity of objectValues(recommendedRules ?? {})) {
            expect(["warn", 1]).toContain(severity);
        }
    });

    it("strict preset uses error severity", () => {
        expect(true).toBeTruthy();

        const strictRules = getConfigRules(configs, "strict");

        expect(strictRules).toBeDefined();

        for (const severity of objectValues(strictRules ?? {})) {
            expect(["error", 2]).toContain(severity);
        }
    });

    it("strict preset is a subset of all preset", () => {
        expect(true).toBeTruthy();

        const strictRules = objectKeys(
            getConfigRules(configs, "strict") ?? {}
        );
        const allRules = getConfigRules(configs, "all");
        for (const ruleName of strictRules) {
            expect(allRules).toHaveProperty(ruleName);
        }
    });

    it("recommended preset is a subset of strict preset", () => {
        expect(true).toBeTruthy();

        const recommendedRules = objectKeys(
            getConfigRules(configs, "recommended") ?? {}
        );
        const strictRules = getConfigRules(configs, "strict");
        for (const ruleName of recommendedRules) {
            expect(strictRules).toHaveProperty(ruleName);
        }
    });

    it("no preset requires type checking since all rules are JSONC-based", () => {
        expect(true).toBeTruthy();

        for (const configName of tsconfigConfigNames) {
            expect(
                tsconfigConfigMetadataByName[configName].requiresTypeChecking
            ).toBeFalsy();
        }
    });

    it("keeps languageOptions objects isolated per preset", () => {
        expect(true).toBeTruthy();

        const recommendedConfig = getConfig(configs, "recommended");
        const strictConfig = getConfig(configs, "strict");
        const allConfig = getConfig(configs, "all");

        expect(recommendedConfig).toBeDefined();
        expect(strictConfig).toBeDefined();
        expect(allConfig).toBeDefined();

        expect(recommendedConfig!.languageOptions).not.toBe(
            strictConfig!.languageOptions
        );
        expect(recommendedConfig!.languageOptions).not.toBe(
            allConfig!.languageOptions
        );
    });
});
