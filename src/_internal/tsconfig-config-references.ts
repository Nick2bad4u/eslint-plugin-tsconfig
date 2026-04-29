/**
 * @packageDocumentation
 * Shared tsconfig preset/config reference constants and type guards.
 */
import { objectHasOwn } from "ts-extras";

/** Canonical flat-config preset keys exposed through `plugin.configs`. */
export const tsconfigConfigNames = [
    "all",
    "jsconfig",
    "recommended",
    "strict",
    "strictest",
    "emit-config",
    "include-hygiene",
    "lib-target",
    "module-resolution",
    "project-references",
    "strict-mode",
] as const;

/** Metadata contract shared across preset wiring, docs, and README rendering. */
export type TsconfigConfigMetadata = Readonly<{
    icon: string;
    presetName: `tsconfig:${TsconfigConfigName}`;
    readmeOrder: number;
    requiresTypeChecking: boolean;
}>;

/** Canonical flat-config preset key type exposed through `plugin.configs`. */
export type TsconfigConfigName = (typeof tsconfigConfigNames)[number];

/**
 * Canonical metadata for every exported `tsconfig` preset key.
 *
 * @remarks
 * This is the single source of truth for:
 *
 * - Preset display order in generated README tables,
 * - Preset icon mapping,
 * - Preset runtime flat-config names, and
 * - Preset type-checking requirements.
 */
export const tsconfigConfigMetadataByName: Readonly<
    Record<TsconfigConfigName, TsconfigConfigMetadata>
> = {
    all: {
        icon: "🟣",
        presetName: "tsconfig:all",
        readmeOrder: 5,
        requiresTypeChecking: false,
    },
    "emit-config": {
        icon: "📤",
        presetName: "tsconfig:emit-config",
        readmeOrder: 8,
        requiresTypeChecking: false,
    },
    "include-hygiene": {
        icon: "🧹",
        presetName: "tsconfig:include-hygiene",
        readmeOrder: 9,
        requiresTypeChecking: false,
    },
    jsconfig: {
        icon: "🟢",
        presetName: "tsconfig:jsconfig",
        readmeOrder: 4,
        requiresTypeChecking: false,
    },
    "lib-target": {
        icon: "🎯",
        presetName: "tsconfig:lib-target",
        readmeOrder: 10,
        requiresTypeChecking: false,
    },
    "module-resolution": {
        icon: "📦",
        presetName: "tsconfig:module-resolution",
        readmeOrder: 7,
        requiresTypeChecking: false,
    },
    "project-references": {
        icon: "🔗",
        presetName: "tsconfig:project-references",
        readmeOrder: 11,
        requiresTypeChecking: false,
    },
    recommended: {
        icon: "🟡",
        presetName: "tsconfig:recommended",
        readmeOrder: 1,
        requiresTypeChecking: false,
    },
    strict: {
        icon: "🔴",
        presetName: "tsconfig:strict",
        readmeOrder: 2,
        requiresTypeChecking: false,
    },
    "strict-mode": {
        icon: "🔒",
        presetName: "tsconfig:strict-mode",
        readmeOrder: 6,
        requiresTypeChecking: false,
    },
    strictest: {
        icon: "💎",
        presetName: "tsconfig:strictest",
        readmeOrder: 3,
        requiresTypeChecking: false,
    },
};

/** Stable README legend/rendering order for preset icons. */
export const tsconfigConfigNamesByReadmeOrder: readonly TsconfigConfigName[] = [
    "recommended",
    "strict",
    "strictest",
    "jsconfig",
    "all",
    "strict-mode",
    "module-resolution",
    "emit-config",
    "include-hygiene",
    "lib-target",
    "project-references",
];

/** Metadata references supported in `meta.docs.tsconfigConfigs`. */
export const tsconfigConfigReferenceToName: Readonly<{
    "tsconfig.configs.all": "all";
    "tsconfig.configs.emit-config": "emit-config";
    "tsconfig.configs.include-hygiene": "include-hygiene";
    "tsconfig.configs.jsconfig": "jsconfig";
    "tsconfig.configs.lib-target": "lib-target";
    "tsconfig.configs.module-resolution": "module-resolution";
    "tsconfig.configs.project-references": "project-references";
    "tsconfig.configs.recommended": "recommended";
    "tsconfig.configs.strict": "strict";
    "tsconfig.configs.strict-mode": "strict-mode";
    "tsconfig.configs.strictest": "strictest";
    'tsconfig.configs["emit-config"]': "emit-config";
    'tsconfig.configs["include-hygiene"]': "include-hygiene";
    'tsconfig.configs["jsconfig"]': "jsconfig";
    'tsconfig.configs["lib-target"]': "lib-target";
    'tsconfig.configs["module-resolution"]': "module-resolution";
    'tsconfig.configs["project-references"]': "project-references";
    'tsconfig.configs["strict-mode"]': "strict-mode";
    'tsconfig.configs["strictest"]': "strictest";
}> = {
    "tsconfig.configs.all": "all",
    "tsconfig.configs.emit-config": "emit-config",
    "tsconfig.configs.include-hygiene": "include-hygiene",
    "tsconfig.configs.jsconfig": "jsconfig",
    "tsconfig.configs.lib-target": "lib-target",
    "tsconfig.configs.module-resolution": "module-resolution",
    "tsconfig.configs.project-references": "project-references",
    "tsconfig.configs.recommended": "recommended",
    "tsconfig.configs.strict": "strict",
    "tsconfig.configs.strict-mode": "strict-mode",
    "tsconfig.configs.strictest": "strictest",
    'tsconfig.configs["emit-config"]': "emit-config",
    'tsconfig.configs["include-hygiene"]': "include-hygiene",
    'tsconfig.configs["jsconfig"]': "jsconfig",
    'tsconfig.configs["lib-target"]': "lib-target",
    'tsconfig.configs["module-resolution"]': "module-resolution",
    'tsconfig.configs["project-references"]': "project-references",
    'tsconfig.configs["strict-mode"]': "strict-mode",
    'tsconfig.configs["strictest"]': "strictest",
};

/** Fully-qualified preset reference type accepted in docs metadata. */
export type TsconfigConfigReference =
    keyof typeof tsconfigConfigReferenceToName;

/**
 * Check whether a string is a supported `meta.docs.tsconfigConfigs` reference.
 */
export const isTsconfigConfigReference = (
    value: string
): value is TsconfigConfigReference =>
    objectHasOwn(tsconfigConfigReferenceToName, value);
