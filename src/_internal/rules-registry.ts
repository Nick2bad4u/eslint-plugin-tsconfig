/**
 * @packageDocumentation
 * Canonical runtime registry of all rule modules shipped by eslint-plugin-tsconfig.
 */
import type { JsoncRuleModule } from "./jsonc-rule.js";

import consistentIncrementalWithTsbuildinfo from "../rules/consistent-incremental-with-tsbuildinfo.js";
import consistentModuleResolution from "../rules/consistent-module-resolution.js";
import consistentTargetAndLib from "../rules/consistent-target-and-lib.js";
import noAllowjsWithoutCheckjs from "../rules/no-allowjs-without-checkjs.js";
import noDeclarationOnlyWithoutDeclaration from "../rules/no-declaration-only-without-declaration.js";
import noDeprecatedTarget from "../rules/no-deprecated-target.js";
import noInlineSourceMap from "../rules/no-inline-source-map.js";
import noLegacyModuleDetection from "../rules/no-legacy-module-detection.js";
import noDisableStrictSubset from "../rules/no-disable-strict-subset.js";
import noEmitInRootConfig from "../rules/no-emit-in-root-config.js";
import noEsmoduleinteropWithVerbatim from "../rules/no-esmoduleinterop-with-verbatim.js";
import noEsnextTargetInLibrary from "../rules/no-esnext-target-in-library.js";
import noIncludeDist from "../rules/no-include-dist.js";
import noIncludeNodeModules from "../rules/no-include-node-modules.js";
import noLegacyModuleResolution from "../rules/no-legacy-module-resolution.js";
import noRootdirIncludesOutdir from "../rules/no-rootdir-includes-outdir.js";
import noSkipLibCheck from "../rules/no-skip-lib-check.js";
import noSuppressImplicitAnyIndexErrors from "../rules/no-suppress-implicit-any-index-errors.js";
import requireBundlerModuleResolution from "../rules/require-bundler-module-resolution.js";
import requireCompositeForReferences from "../rules/require-composite-for-references.js";
import requireDeclarationWithComposite from "../rules/require-declaration-with-composite.js";
import requireDeclarationMap from "../rules/require-declaration-map.js";
import requireDownlevelIterationWithIterators from "../rules/require-downlevel-iteration-with-iterators.js";
import requireExactOptionalPropertyTypes from "../rules/require-exact-optional-property-types.js";
import requireExcludeCommonArtifacts from "../rules/require-exclude-common-artifacts.js";
import requireForceConsistentCasingInFileNames from "../rules/require-force-consistent-casing-in-file-names.js";
import requireIsolatedDeclarations from "../rules/require-isolated-declarations.js";
import requireIsolatedModules from "../rules/require-isolated-modules.js";
import requireNoFallthroughCasesInSwitch from "../rules/require-no-fallthrough-cases-in-switch.js";
import requireNoImplicitOverride from "../rules/require-no-implicit-override.js";
import requireNoImplicitReturns from "../rules/require-no-implicit-returns.js";
import requireNoPropertyAccessFromIndexSignature from "../rules/require-no-property-access-from-index-signature.js";
import requireNoUncheckedIndexedAccess from "../rules/require-no-unchecked-indexed-access.js";
import requireNoUnusedLocals from "../rules/require-no-unused-locals.js";
import requireNoUnusedParameters from "../rules/require-no-unused-parameters.js";
import requireOutdirWhenEmitting from "../rules/require-outdir-when-emitting.js";
import requireSourceMapInDev from "../rules/require-source-map-in-dev.js";
import requireStrictMode from "../rules/require-strict-mode.js";
import requireUseUnknownInCatchVariables from "../rules/require-use-unknown-in-catch-variables.js";
import requireVerbatimModuleSyntax from "../rules/require-verbatim-module-syntax.js";

/** Rule module type accepted by the ESLint rules map. */
export type RuleWithDocs = JsoncRuleModule;

const tsconfigRuleRegistry: Readonly<Record<string, JsoncRuleModule>> = {
    "consistent-incremental-with-tsbuildinfo":
        consistentIncrementalWithTsbuildinfo,
    "consistent-module-resolution": consistentModuleResolution,
    "consistent-target-and-lib": consistentTargetAndLib,
    "no-allowjs-without-checkjs": noAllowjsWithoutCheckjs,
    "no-declaration-only-without-declaration":
        noDeclarationOnlyWithoutDeclaration,
    "no-deprecated-target": noDeprecatedTarget,
    "no-disable-strict-subset": noDisableStrictSubset,
    "no-emit-in-root-config": noEmitInRootConfig,
    "no-esmoduleinterop-with-verbatim": noEsmoduleinteropWithVerbatim,
    "no-esnext-target-in-library": noEsnextTargetInLibrary,
    "no-include-dist": noIncludeDist,
    "no-include-node-modules": noIncludeNodeModules,
    "no-inline-source-map": noInlineSourceMap,
    "no-legacy-module-detection": noLegacyModuleDetection,
    "no-legacy-module-resolution": noLegacyModuleResolution,
    "no-rootdir-includes-outdir": noRootdirIncludesOutdir,
    "no-skip-lib-check": noSkipLibCheck,
    "no-suppress-implicit-any-index-errors": noSuppressImplicitAnyIndexErrors,
    "require-bundler-module-resolution": requireBundlerModuleResolution,
    "require-composite-for-references": requireCompositeForReferences,
    "require-declaration-with-composite": requireDeclarationWithComposite,
    "require-declaration-map": requireDeclarationMap,
    "require-downlevel-iteration-with-iterators":
        requireDownlevelIterationWithIterators,
    "require-exact-optional-property-types": requireExactOptionalPropertyTypes,
    "require-exclude-common-artifacts": requireExcludeCommonArtifacts,
    "require-force-consistent-casing-in-file-names":
        requireForceConsistentCasingInFileNames,
    "require-isolated-declarations": requireIsolatedDeclarations,
    "require-isolated-modules": requireIsolatedModules,
    "require-no-fallthrough-cases-in-switch": requireNoFallthroughCasesInSwitch,
    "require-no-implicit-override": requireNoImplicitOverride,
    "require-no-implicit-returns": requireNoImplicitReturns,
    "require-no-property-access-from-index-signature":
        requireNoPropertyAccessFromIndexSignature,
    "require-no-unchecked-indexed-access": requireNoUncheckedIndexedAccess,
    "require-no-unused-locals": requireNoUnusedLocals,
    "require-no-unused-parameters": requireNoUnusedParameters,
    "require-outdir-when-emitting": requireOutdirWhenEmitting,
    "require-source-map-in-dev": requireSourceMapInDev,
    "require-strict-mode": requireStrictMode,
    "require-use-unknown-in-catch-variables": requireUseUnknownInCatchVariables,
    "require-verbatim-module-syntax": requireVerbatimModuleSyntax,
};

/**
 * Canonical map of all plugin rule modules keyed by their rule id segment.
 */
export const tsconfigRules: Readonly<Record<string, JsoncRuleModule>> =
    tsconfigRuleRegistry;

export default tsconfigRules;
