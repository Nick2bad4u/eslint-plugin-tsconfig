/**
 * @packageDocumentation
 * Canonical runtime registry of all rule modules shipped by eslint-plugin-tsconfig.
 */
import type { JsoncRuleModule } from "./jsonc-rule.js";

import * as consistentIncrementalWithTsbuildinfoModule from "../rules/consistent-incremental-with-tsbuildinfo.js";
import * as consistentModuleResolutionModule from "../rules/consistent-module-resolution.js";
import * as consistentTargetAndLibModule from "../rules/consistent-target-and-lib.js";
import * as noAllowjsWithoutCheckjsModule from "../rules/no-allowjs-without-checkjs.js";
import * as noDeclarationOnlyWithoutDeclarationModule from "../rules/no-declaration-only-without-declaration.js";
import * as noDeprecatedTargetModule from "../rules/no-deprecated-target.js";
import * as noDisableStrictSubsetModule from "../rules/no-disable-strict-subset.js";
import * as noEmitInRootConfigModule from "../rules/no-emit-in-root-config.js";
import * as noEsmoduleinteropWithVerbatimModule from "../rules/no-esmoduleinterop-with-verbatim.js";
import * as noEsnextTargetInLibraryModule from "../rules/no-esnext-target-in-library.js";
import * as noIncludeDistModule from "../rules/no-include-dist.js";
import * as noIncludeNodeModulesModule from "../rules/no-include-node-modules.js";
import * as noInlineSourceMapModule from "../rules/no-inline-source-map.js";
import * as noLegacyModuleDetectionModule from "../rules/no-legacy-module-detection.js";
import * as noLegacyModuleResolutionModule from "../rules/no-legacy-module-resolution.js";
import * as noRootdirIncludesOutdirModule from "../rules/no-rootdir-includes-outdir.js";
import * as noSkipLibCheckModule from "../rules/no-skip-lib-check.js";
import * as noSuppressImplicitAnyIndexErrorsModule from "../rules/no-suppress-implicit-any-index-errors.js";
import * as requireBundlerModuleResolutionModule from "../rules/require-bundler-module-resolution.js";
import * as requireCompositeForReferencesModule from "../rules/require-composite-for-references.js";
import * as requireDeclarationMapModule from "../rules/require-declaration-map.js";
import * as requireDeclarationWithCompositeModule from "../rules/require-declaration-with-composite.js";
import * as requireDownlevelIterationWithIteratorsModule from "../rules/require-downlevel-iteration-with-iterators.js";
import * as requireExactOptionalPropertyTypesModule from "../rules/require-exact-optional-property-types.js";
import * as requireExcludeCommonArtifactsModule from "../rules/require-exclude-common-artifacts.js";
import * as requireForceConsistentCasingInFileNamesModule from "../rules/require-force-consistent-casing-in-file-names.js";
import * as requireIsolatedDeclarationsModule from "../rules/require-isolated-declarations.js";
import * as requireIsolatedModulesModule from "../rules/require-isolated-modules.js";
import * as requireNoFallthroughCasesInSwitchModule from "../rules/require-no-fallthrough-cases-in-switch.js";
import * as requireNoImplicitOverrideModule from "../rules/require-no-implicit-override.js";
import * as requireNoImplicitReturnsModule from "../rules/require-no-implicit-returns.js";
import * as requireNoPropertyAccessFromIndexSignatureModule from "../rules/require-no-property-access-from-index-signature.js";
import * as requireNoUncheckedIndexedAccessModule from "../rules/require-no-unchecked-indexed-access.js";
import * as requireNoUnusedLocalsModule from "../rules/require-no-unused-locals.js";
import * as requireNoUnusedParametersModule from "../rules/require-no-unused-parameters.js";
import * as requireOutdirWhenEmittingModule from "../rules/require-outdir-when-emitting.js";
import * as requireSourceMapInDevModule from "../rules/require-source-map-in-dev.js";
import * as requireStrictModeModule from "../rules/require-strict-mode.js";
import * as requireUseUnknownInCatchVariablesModule from "../rules/require-use-unknown-in-catch-variables.js";
import * as requireVerbatimModuleSyntaxModule from "../rules/require-verbatim-module-syntax.js";

/** Rule module type accepted by the ESLint rules map. */
export type RuleWithDocs = JsoncRuleModule;

const tsconfigRuleRegistry: Readonly<Record<string, JsoncRuleModule>> = {
    "consistent-incremental-with-tsbuildinfo":
        consistentIncrementalWithTsbuildinfoModule.default,
    "consistent-module-resolution": consistentModuleResolutionModule.default,
    "consistent-target-and-lib": consistentTargetAndLibModule.default,
    "no-allowjs-without-checkjs": noAllowjsWithoutCheckjsModule.default,
    "no-declaration-only-without-declaration":
        noDeclarationOnlyWithoutDeclarationModule.default,
    "no-deprecated-target": noDeprecatedTargetModule.default,
    "no-disable-strict-subset": noDisableStrictSubsetModule.default,
    "no-emit-in-root-config": noEmitInRootConfigModule.default,
    "no-esmoduleinterop-with-verbatim":
        noEsmoduleinteropWithVerbatimModule.default,
    "no-esnext-target-in-library": noEsnextTargetInLibraryModule.default,
    "no-include-dist": noIncludeDistModule.default,
    "no-include-node-modules": noIncludeNodeModulesModule.default,
    "no-inline-source-map": noInlineSourceMapModule.default,
    "no-legacy-module-detection": noLegacyModuleDetectionModule.default,
    "no-legacy-module-resolution": noLegacyModuleResolutionModule.default,
    "no-rootdir-includes-outdir": noRootdirIncludesOutdirModule.default,
    "no-skip-lib-check": noSkipLibCheckModule.default,
    "no-suppress-implicit-any-index-errors":
        noSuppressImplicitAnyIndexErrorsModule.default,
    "require-bundler-module-resolution":
        requireBundlerModuleResolutionModule.default,
    "require-composite-for-references":
        requireCompositeForReferencesModule.default,
    "require-declaration-map": requireDeclarationMapModule.default,
    "require-declaration-with-composite":
        requireDeclarationWithCompositeModule.default,
    "require-downlevel-iteration-with-iterators":
        requireDownlevelIterationWithIteratorsModule.default,
    "require-exact-optional-property-types":
        requireExactOptionalPropertyTypesModule.default,
    "require-exclude-common-artifacts":
        requireExcludeCommonArtifactsModule.default,
    "require-force-consistent-casing-in-file-names":
        requireForceConsistentCasingInFileNamesModule.default,
    "require-isolated-declarations": requireIsolatedDeclarationsModule.default,
    "require-isolated-modules": requireIsolatedModulesModule.default,
    "require-no-fallthrough-cases-in-switch":
        requireNoFallthroughCasesInSwitchModule.default,
    "require-no-implicit-override": requireNoImplicitOverrideModule.default,
    "require-no-implicit-returns": requireNoImplicitReturnsModule.default,
    "require-no-property-access-from-index-signature":
        requireNoPropertyAccessFromIndexSignatureModule.default,
    "require-no-unchecked-indexed-access":
        requireNoUncheckedIndexedAccessModule.default,
    "require-no-unused-locals": requireNoUnusedLocalsModule.default,
    "require-no-unused-parameters": requireNoUnusedParametersModule.default,
    "require-outdir-when-emitting": requireOutdirWhenEmittingModule.default,
    "require-source-map-in-dev": requireSourceMapInDevModule.default,
    "require-strict-mode": requireStrictModeModule.default,
    "require-use-unknown-in-catch-variables":
        requireUseUnknownInCatchVariablesModule.default,
    "require-verbatim-module-syntax": requireVerbatimModuleSyntaxModule.default,
};

/**
 * Canonical map of all plugin rule modules keyed by their rule id segment.
 */
export const tsconfigRules: Readonly<Record<string, JsoncRuleModule>> =
    tsconfigRuleRegistry;

export default tsconfigRules;
