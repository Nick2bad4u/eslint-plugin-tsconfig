/**
 * @packageDocumentation
 * Public plugin entrypoint for eslint-plugin-tsconfig exports and preset wiring.
 */
import type { ESLint, Linter } from "eslint";
import type { Except } from "type-fest";

import * as jsoncParser from "jsonc-eslint-parser";
import {
    isDefined,
    isEmpty,
    objectEntries,
    objectHasIn,
    safeCastTo,
} from "ts-extras";

import packageJson from "../package.json" with { type: "json" };
import {
    deriveRuleDocsMetadataByName,
    deriveRulePresetMembershipByRuleName,
} from "./_internal/rule-docs-metadata.js";
import { tsconfigRules } from "./_internal/rules-registry.js";
import {
    type TsconfigConfigName as InternalTsconfigConfigName,
    tsconfigConfigNames,
} from "./_internal/tsconfig-config-references.js";

/** ESLint severity constants for preset rule maps. */
const ERROR_SEVERITY = "error" as const;
const WARN_SEVERITY = "warn" as const;

/** Default file globs targeted by plugin presets when `files` is omitted. */
const TSCONFIG_FILES = [
    "**/tsconfig.json",
    "**/tsconfig.*.json",
    "**/tsconfig-*.json",
] as const;

/**
 * Canonical flat-config preset keys exposed through `plugin.configs`.
 */
export type TsconfigConfigName = InternalTsconfigConfigName;

/**
 * Flat-config preset shape produced by this plugin.
 */
export type TsconfigPresetConfig = Linter.Config & {
    rules: NonNullable<Linter.Config["rules"]>;
};

/** Rule-map type used by preset rule-list expansion helpers. */
type RulesConfig = TsconfigPresetConfig["rules"];

/** Contract for the `configs` object exported by this plugin. */
type TsconfigConfigsContract = Record<TsconfigConfigName, TsconfigPresetConfig>;

/** Fully assembled plugin contract used by the runtime default export. */
type TsconfigPluginContract = Except<ESLint.Plugin, "configs" | "rules"> & {
    configs: TsconfigConfigsContract;
    meta: {
        name: string;
        namespace: string;
        version: string;
    };
    processors: NonNullable<ESLint.Plugin["processors"]>;
    rules: NonNullable<ESLint.Plugin["rules"]>;
};

/** Package metadata used to populate plugin runtime `meta.version`. */
const packageJsonValue = safeCastTo<unknown>(packageJson);

/**
 * Resolve package version from package.json data.
 *
 * @param pkg - Parsed package metadata value.
 *
 * @returns The package version, or `0.0.0` when unavailable.
 */
function getPackageVersion(pkg: unknown): string {
    if (typeof pkg !== "object" || pkg === null) {
        return "0.0.0";
    }

    const version = Reflect.get(pkg, "version");

    return typeof version === "string" ? version : "0.0.0";
}

/**
 * Fully-qualified ESLint rule id used by this plugin.
 *
 * @remarks
 * Consumers use this when building strongly typed rule maps or helper utilities
 * that require namespaced rule identifiers.
 */
export type TsconfigRuleId = `tsconfig/${TsconfigRuleName}`;

/** Unqualified rule name supported by `eslint-plugin-tsconfig`. */
export type TsconfigRuleName = keyof typeof tsconfigRules;

/**
 * ESLint-compatible rule map view of the strongly typed internal rule record.
 */
const tsconfigEslintRules: NonNullable<ESLint.Plugin["rules"]> &
    typeof tsconfigRules = tsconfigRules as NonNullable<
    ESLint.Plugin["rules"]
> &
    typeof tsconfigRules;

const isTsconfigRuleName = (value: string): value is TsconfigRuleName =>
    objectHasIn(tsconfigRules, value);

const tsconfigRuleEntries: readonly (readonly [
    TsconfigRuleName,
    (typeof tsconfigRules)[TsconfigRuleName],
])[] = (() => {
    const entries: (readonly [
        TsconfigRuleName,
        (typeof tsconfigRules)[TsconfigRuleName],
    ])[] = [];

    for (const [ruleName] of objectEntries(tsconfigRules)) {
        if (!isTsconfigRuleName(ruleName)) {
            continue;
        }

        const ruleDefinition = tsconfigRules[ruleName];

        if (ruleDefinition === undefined) {
            continue;
        }

        entries.push([ruleName, ruleDefinition]);
    }

    return entries;
})();

const ruleDocsMetadataByRuleName = deriveRuleDocsMetadataByName(tsconfigRules);
const rulePresetMembership = deriveRulePresetMembershipByRuleName(
    ruleDocsMetadataByRuleName
);

const createEmptyPresetRuleMap = (): Record<
    TsconfigConfigName,
    TsconfigRuleName[]
> => {
    const presetRuleMap = {} as Record<TsconfigConfigName, TsconfigRuleName[]>;

    for (const configName of tsconfigConfigNames) {
        presetRuleMap[configName] = [];
    }

    return presetRuleMap;
};

const dedupeRuleNames = (
    ruleNames: readonly TsconfigRuleName[]
): TsconfigRuleName[] => [...new Set(ruleNames)];

const derivePresetRuleNamesByConfig = (): Readonly<
    Record<TsconfigConfigName, readonly TsconfigRuleName[]>
> => {
    const presetRuleNamesByConfig = createEmptyPresetRuleMap();

    for (const [ruleName] of tsconfigRuleEntries) {
        const configNames = rulePresetMembership[ruleName];

        if (!isDefined(configNames) || isEmpty(configNames)) {
            throw new TypeError(
                `Rule '${ruleName}' is missing preset membership metadata.`
            );
        }

        for (const configName of configNames) {
            presetRuleNamesByConfig[configName].push(ruleName);
        }
    }

    const result = {} as Record<
        TsconfigConfigName,
        readonly TsconfigRuleName[]
    >;

    for (const configName of tsconfigConfigNames) {
        result[configName] = dedupeRuleNames(
            presetRuleNamesByConfig[configName]
        );
    }

    return result;
};

const presetRuleNamesByConfig = derivePresetRuleNamesByConfig();

/**
 * Build an ESLint rules map that enables each provided rule at the given
 * severity.
 *
 * @param ruleNames - Rule names to enable.
 * @param severity - ESLint severity string.
 *
 * @returns Rules config object compatible with flat config.
 */
function severityRulesFor(
    ruleNames: readonly TsconfigRuleName[],
    severity: typeof ERROR_SEVERITY | typeof WARN_SEVERITY
): RulesConfig {
    const rules: RulesConfig = {};

    for (const ruleName of ruleNames) {
        rules[`tsconfig/${ruleName}`] = severity;
    }

    return rules;
}

/**
 * Apply parser and plugin metadata required by all plugin presets.
 *
 * @param config - Preset-specific config fragment.
 * @param plugin - Plugin object registered under the `tsconfig` namespace.
 *
 * @returns Normalized preset config.
 */
function withTsconfigPlugin(
    config: Readonly<TsconfigPresetConfig>,
    plugin: Readonly<ESLint.Plugin>
): TsconfigPresetConfig {
    return {
        ...config,
        files: config.files ?? [...TSCONFIG_FILES],
        languageOptions: {
            ...config.languageOptions,
            parser: jsoncParser,
        },
        plugins: {
            ...config.plugins,
            tsconfig: plugin,
        },
    };
}

/** Minimal plugin object used when assembling flat-config presets. */
const pluginForConfigs: ESLint.Plugin = {
    rules: tsconfigEslintRules,
};

/**
 * Flat config presets distributed by eslint-plugin-tsconfig.
 *
 * @remarks
 * `all` enables every rule at its default severity. `recommended` enables
 * warn-severity rules safe to add to any project. `strict` enables
 * error-severity rules requiring deliberate adoption. Category presets
 * (`strict-mode`, `module-resolution`, etc.) enable only the rules belonging to
 * that category.
 */
const createTsconfigConfigsDefinition = (): TsconfigConfigsContract => {
    const configs = {} as TsconfigConfigsContract;

    for (const configName of tsconfigConfigNames) {
        const ruleNames = presetRuleNamesByConfig[configName];

        // For "all", mix error and warn based on each rule's default severity.
        // For "strict", use error. For "recommended", use warn.
        // Category presets use the default severity from rule metadata.
        const isAllPreset = configName === "all";
        const isStrictPreset = configName === "strict";

        let rules: RulesConfig;

        if (isAllPreset) {
            // all: each rule at its own default severity
            rules = {};
            for (const ruleName of ruleNames) {
                const ruleMeta = tsconfigRules[ruleName]?.meta;
                const ruleType = ruleMeta?.type;
                const severity =
                    ruleType === "problem" ? ERROR_SEVERITY : WARN_SEVERITY;
                rules[`tsconfig/${ruleName}`] = severity;
            }
        } else if (isStrictPreset) {
            rules = severityRulesFor(ruleNames, ERROR_SEVERITY);
        } else {
            rules = severityRulesFor(ruleNames, WARN_SEVERITY);
        }

        configs[configName] = withTsconfigPlugin(
            {
                name: `tsconfig/${configName}`,
                rules,
            },
            pluginForConfigs
        );
    }

    return configs;
};

const tsconfigConfigsDefinition = createTsconfigConfigsDefinition();

/** Finalized typed view of all exported preset configurations. */
const tsconfigConfigs: TsconfigConfigsContract = tsconfigConfigsDefinition;

/**
 * Runtime type for the plugin's generated config presets.
 */
export type TsconfigConfigs = typeof tsconfigConfigs;

/**
 * Main plugin object exported for ESLint consumption.
 */
const tsconfigPlugin: TsconfigPluginContract = {
    configs: tsconfigConfigs,
    meta: {
        name: "eslint-plugin-tsconfig",
        namespace: "tsconfig",
        version: getPackageVersion(packageJsonValue),
    },
    processors: {},
    rules: tsconfigEslintRules,
};

/**
 * Runtime type for the plugin object exported as default.
 */
export type TsconfigPlugin = typeof tsconfigPlugin;

/**
 * Default plugin export consumed by ESLint flat config.
 */
export default tsconfigPlugin;
