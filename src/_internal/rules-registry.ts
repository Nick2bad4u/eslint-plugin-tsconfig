/**
 * @packageDocumentation
 * Canonical runtime registry of all rule modules shipped by eslint-plugin-tsconfig.
 */
import type { JsoncRuleModule } from "./jsonc-rule.js";

import consistentIncrementalWithTsbuildinfo from "../rules/consistent-incremental-with-tsbuildinfo.js";
import consistentModuleResolution from "../rules/consistent-module-resolution.js";
import consistentTargetAndLib from "../rules/consistent-target-and-lib.js";
import noDeclarationOnlyWithoutDeclaration from "../rules/no-declaration-only-without-declaration.js";
import noDisableStrictSubset from "../rules/no-disable-strict-subset.js";
import noEmitInRootConfig from "../rules/no-emit-in-root-config.js";
import noEsmoduleinteropWithVerbatim from "../rules/no-esmoduleinterop-with-verbatim.js";
import noEsnextTargetInLibrary from "../rules/no-esnext-target-in-library.js";
import noIncludeDist from "../rules/no-include-dist.js";
import noIncludeNodeModules from "../rules/no-include-node-modules.js";
import noLegacyModuleResolution from "../rules/no-legacy-module-resolution.js";
import noRootdirIncludesOutdir from "../rules/no-rootdir-includes-outdir.js";
import noSkipLibCheck from "../rules/no-skip-lib-check.js";
import requireBundlerModuleResolution from "../rules/require-bundler-module-resolution.js";
import requireCompositeForReferences from "../rules/require-composite-for-references.js";
import requireDeclarationWithComposite from "../rules/require-declaration-with-composite.js";
import requireDownlevelIterationWithIterators from "../rules/require-downlevel-iteration-with-iterators.js";
import requireExactOptionalPropertyTypes from "../rules/require-exact-optional-property-types.js";
import requireExcludeCommonArtifacts from "../rules/require-exclude-common-artifacts.js";
import requireNoImplicitOverride from "../rules/require-no-implicit-override.js";
import requireNoUncheckedIndexedAccess from "../rules/require-no-unchecked-indexed-access.js";
import requireOutdirWhenEmitting from "../rules/require-outdir-when-emitting.js";
import requireSourceMapInDev from "../rules/require-source-map-in-dev.js";
import requireStrictMode from "../rules/require-strict-mode.js";
import requireVerbatimModuleSyntax from "../rules/require-verbatim-module-syntax.js";

/** Rule module type accepted by the ESLint rules map. */
export type RuleWithDocs = JsoncRuleModule;

const tsconfigRuleRegistry: Readonly<Record<string, JsoncRuleModule>> = {
    "consistent-incremental-with-tsbuildinfo":
        consistentIncrementalWithTsbuildinfo,
    "consistent-module-resolution": consistentModuleResolution,
    "consistent-target-and-lib": consistentTargetAndLib,
    "no-declaration-only-without-declaration":
        noDeclarationOnlyWithoutDeclaration,
    "no-disable-strict-subset": noDisableStrictSubset,
    "no-emit-in-root-config": noEmitInRootConfig,
    "no-esmoduleinterop-with-verbatim": noEsmoduleinteropWithVerbatim,
    "no-esnext-target-in-library": noEsnextTargetInLibrary,
    "no-include-dist": noIncludeDist,
    "no-include-node-modules": noIncludeNodeModules,
    "no-legacy-module-resolution": noLegacyModuleResolution,
    "no-rootdir-includes-outdir": noRootdirIncludesOutdir,
    "no-skip-lib-check": noSkipLibCheck,
    "require-bundler-module-resolution": requireBundlerModuleResolution,
    "require-composite-for-references": requireCompositeForReferences,
    "require-declaration-with-composite": requireDeclarationWithComposite,
    "require-downlevel-iteration-with-iterators":
        requireDownlevelIterationWithIterators,
    "require-exact-optional-property-types": requireExactOptionalPropertyTypes,
    "require-exclude-common-artifacts": requireExcludeCommonArtifacts,
    "require-no-implicit-override": requireNoImplicitOverride,
    "require-no-unchecked-indexed-access": requireNoUncheckedIndexedAccess,
    "require-outdir-when-emitting": requireOutdirWhenEmitting,
    "require-source-map-in-dev": requireSourceMapInDev,
    "require-strict-mode": requireStrictMode,
    "require-verbatim-module-syntax": requireVerbatimModuleSyntax,
};

/**
 * Canonical map of all plugin rule modules keyed by their rule id segment.
 */
export const tsconfigRules: Readonly<Record<string, JsoncRuleModule>> =
    tsconfigRuleRegistry;

export default tsconfigRules;
