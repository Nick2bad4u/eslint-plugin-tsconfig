/**
 * @packageDocumentation
 * Shared testing utilities for eslint-plugin-tsconfig RuleTester and Vitest suites.
 */
import type { UnknownArray, UnknownRecord } from "type-fest";

import { RuleTester } from "@typescript-eslint/rule-tester";
import * as jsoncParser from "jsonc-eslint-parser";
import * as path from "node:path";
import pc from "picocolors";
import { arrayJoin, objectHasOwn, safeCastTo } from "ts-extras";
import { afterAll, describe, it } from "vitest";

import tsconfigPlugin from "../../src/plugin";

/** Shared timeout applied to RuleTester-generated Vitest cases. */
const ruleTesterCaseTimeoutMilliseconds = 120_000;
/** Stable Vitest options object used for every RuleTester case wrapper. */
const ruleTesterCaseTimeoutOptions = Object.freeze({
    timeout: ruleTesterCaseTimeoutMilliseconds,
});

/**
 * Assert that a dynamic runtime value is callable for RuleTester hook wiring.
 *
 * @param candidate - Dynamic value under validation.
 * @param hookName - Human-readable hook label for diagnostics.
 */
const assertRuleTesterHook: (
    candidate: unknown,
    hookName: string
) => asserts candidate is (...arguments_: UnknownArray) => unknown = (
    candidate,
    hookName
) => {
    if (typeof candidate !== "function") {
        throw new TypeError(
            `Expected Vitest hook '${hookName}' to be a function for RuleTester wiring.`
        );
    }
};

/** Callback shape used by RuleTester-generated Vitest test cases. */
type RuleTesterCaseCallback = Parameters<typeof RuleTester.it>[1];

/**
 * Run a Vitest `it`-style hook with the repository-standard RuleTester timeout.
 *
 * @param callback - RuleTester-generated test body.
 * @param hook - Vitest test hook to execute.
 * @param hookName - Human-readable hook label for diagnostics.
 * @param text - Display name for the test case.
 */
const runTimedRuleTesterCase = ({
    callback,
    hook,
    hookName,
    text,
}: Readonly<{
    callback: RuleTesterCaseCallback;
    hook: unknown;
    hookName: string;
    text: string;
}>): void => {
    assertRuleTesterHook(hook, hookName);
    Reflect.apply(hook, undefined, [
        text,
        ruleTesterCaseTimeoutOptions,
        callback,
    ]);
};

assertRuleTesterHook(afterAll, "afterAll");
RuleTester.afterAll = afterAll;
assertRuleTesterHook(describe, "describe");
RuleTester.describe = describe;
assertRuleTesterHook(it, "it");
RuleTester.it = (text, callback) => {
    runTimedRuleTesterCase({
        callback,
        hook: it,
        hookName: "it",
        text,
    });
};
const vitestItOnly: unknown = Reflect.get(it, "only");
assertRuleTesterHook(vitestItOnly, "it.only");
RuleTester.itOnly = (text, callback) => {
    runTimedRuleTesterCase({
        callback,
        hook: vitestItOnly,
        hookName: "it.only",
        text,
    });
};

/** Rule module parameter type accepted by `RuleTester#run`. */
export type PluginRuleModule = Parameters<RuleTester["run"]>[1];
/**
 * Stand-alone tester interface exposed to test files.
 *
 * @remarks
 * All `eslint-plugin-tsconfig` rules are JSONC-based and use ESLint's plain
 * `Rule.RuleModule` interface, which is structurally incompatible with the
 * parameterised `TSESLint.RuleModule` type that
 * `@typescript-eslint/rule-tester` expects at the TypeScript level. Rather than
 * intersecting with `RuleTester` (which would re-introduce the generic `run`
 * overload via the prototype chain), this type is intentionally independent and
 * exposes only the `run` method with a widened second parameter (`unknown`).
 * This is safe because the underlying `RuleTester#run` implementation already
 * forwards through an `UnknownArray` cast at runtime.
 */
interface PluginRuleTester {
    run: (name: string, rule: unknown, cases: Readonly<RuleRunCases>) => void;
}
/** Full argument tuple for `RuleTester#run`. */
type RuleRunArguments = Parameters<RuleTester["run"]>;

/** Combined valid/invalid case payload accepted by `RuleTester#run`. */
type RuleRunCases = RuleRunArguments[2];
/** Single invalid-case entry shape. */
type RuleRunInvalidCase = RuleRunCases["invalid"][number];
/** Single valid-case entry shape. */
type RuleRunValidCase = RuleRunCases["valid"][number];

/**
 * Build a deterministic fallback label for unnamed RuleTester cases.
 *
 * @param ruleName - Rule id currently under test.
 * @param caseKind - Whether the case is valid or invalid.
 * @param caseIndex - Zero-based index in the case array.
 * @param caseFilename - Optional fixture filename for display.
 *
 * @returns Styled case label shown in Vitest output.
 */
const deriveGeneratedCaseName = (
    ruleName: string,
    caseKind: "invalid" | "valid",
    caseIndex: number,
    caseFilename?: string
): string => {
    const caseLabel = arrayJoin(
        [
            pc.bold(pc.magentaBright("UNNAMED")),
            caseKind === "invalid"
                ? pc.bold(pc.red("invalid"))
                : pc.bold(pc.green("valid")),
            pc.underline(pc.yellow(`#${String(caseIndex + 1)}`)),
        ],
        " "
    );
    const caseSource =
        typeof caseFilename === "string" && caseFilename.length > 0
            ? pc.underline(pc.cyan(path.basename(caseFilename)))
            : pc.underline(pc.blue(ruleName));

    return `${caseSource}${pc.dim(" - ")}${caseLabel}`;
};

/**
 * Normalize RuleTester run cases so every case has a readable name.
 *
 * @param ruleName - Rule id currently under test.
 * @param runCases - Original valid/invalid case collections.
 *
 * @returns Case collections with generated names for unnamed entries.
 */
const withGeneratedRuleCaseNames = (
    ruleName: string,
    runCases: Readonly<RuleRunCases>
): RuleRunCases => {
    const normalizedInvalidCases: RuleRunCases["invalid"] =
        runCases.invalid.map(
            (entry: Readonly<RuleRunInvalidCase>, caseIndex) =>
                typeof entry.name === "string" && entry.name.length > 0
                    ? {
                          ...entry,
                          name: pc.bold(pc.cyanBright(entry.name)),
                      }
                    : {
                          ...entry,
                          name: deriveGeneratedCaseName(
                              ruleName,
                              "invalid",
                              caseIndex,
                              entry.filename
                          ),
                      }
        );

    const normalizedValidCases: RuleRunCases["valid"] = runCases.valid.map(
        (entry: Readonly<RuleRunValidCase>, caseIndex) => {
            if (typeof entry === "string") {
                return {
                    code: entry,
                    name: deriveGeneratedCaseName(ruleName, "valid", caseIndex),
                };
            }

            if (typeof entry.name === "string" && entry.name.length > 0) {
                return {
                    ...entry,
                    name: pc.bold(pc.cyanBright(entry.name)),
                };
            }

            return {
                ...entry,
                name: deriveGeneratedCaseName(
                    ruleName,
                    "valid",
                    caseIndex,
                    entry.filename
                ),
            };
        }
    );

    return {
        invalid: normalizedInvalidCases,
        valid: normalizedValidCases,
    };
};

/**
 * Patch `RuleTester#run` to inject generated case names before execution.
 *
 * @param tester - RuleTester instance to patch.
 *
 * @returns Patched RuleTester instance.
 */
const patchRuleTesterRunWithGeneratedCaseNames = (
    tester: Readonly<RuleTester>
): PluginRuleTester => {
    const writableTester = tester as RuleTester; // NOSONAR typescript:S4325 -- Readonly<RuleTester> cast to RuleTester removes the wrapper; structural types are identical and the cast is intentional
    const originalRun = writableTester.run.bind(writableTester);
    const wrappedRun: PluginRuleTester["run"] = (
        ruleName,
        ruleModule,
        runCases
    ) => {
        originalRun(
            ruleName,
            ruleModule as Parameters<RuleTester["run"]>[1], // NOSONAR typescript:S4325 -- cast narrows to exact overload parameter type expected by RuleTester.run
            withGeneratedRuleCaseNames(ruleName, runCases)
        );
    };
    writableTester.run = wrappedRun as unknown as RuleTester["run"]; // NOSONAR typescript:S4325 -- wrappedRun signature slightly differs; double-cast bridges the gap safely
    return writableTester as unknown as PluginRuleTester; // NOSONAR typescript:S4325 -- RuleTester and PluginRuleTester share same shape; cast is a safe branded-type bridge
};

/**
 * Apply shared RuleTester run behavior: prefer explicit per-case `name`, with
 * concise fallback names when omitted.
 *
 * @param tester - RuleTester instance to patch.
 *
 * @returns Patched tester instance.
 */
export const applySharedRuleTesterRunBehavior = (
    tester: Readonly<RuleTester>
): PluginRuleTester => patchRuleTesterRunWithGeneratedCaseNames(tester);

/**
 * Resolve an absolute repository path from optional relative segments.
 *
 * @param segments - Optional path segments under the repository root.
 *
 * @returns Absolute path rooted at the current workspace.
 */
export const repoPath = (...segments: readonly string[]): string =>
    path.join(process.cwd(), ...segments);

/**
 * Create a RuleTester instance configured for JSONC parser usage.
 *
 * @remarks
 * All `eslint-plugin-tsconfig` rules analyze `tsconfig*.json` files as JSONC
 * ASTs, so every RuleTester suite must use `jsonc-eslint-parser`.
 *
 * @returns Configured RuleTester instance.
 */
export const createRuleTester = (): PluginRuleTester =>
    applySharedRuleTesterRunBehavior(
        new RuleTester({
            languageOptions: {
                parser: jsoncParser,
            },
        })
    );

/**
 * Check whether a dynamic value is a non-null object record.
 *
 * @param value - Runtime value under inspection.
 *
 * @returns `true` when value is object-like and non-null.
 */
const isRecord = (value: unknown): value is UnknownRecord =>
    typeof value === "object" && value !== null;

/**
 * Check whether a dynamic value looks like an ESLint rule module.
 *
 * @param value - Dynamic value loaded from plugin rule map.
 *
 * @returns `true` when value has a callable `create` method.
 */
const isRuleModule = (value: unknown): value is PluginRuleModule => {
    if (!isRecord(value)) {
        return false;
    }

    const maybeCreate = safeCastTo<{ create?: unknown }>(value).create;

    return typeof maybeCreate === "function";
};

/**
 * Lookup a rule module from the plugin by its unqualified rule id.
 *
 * @param ruleId - Rule id without the `tsconfig/` prefix.
 *
 * @returns Matching RuleTester-compatible rule module.
 */
export const getPluginRule = (ruleId: string): PluginRuleModule => {
    const { rules } = tsconfigPlugin;
    const dynamicRules = safeCastTo<UnknownRecord>(rules);
    if (!objectHasOwn(dynamicRules, ruleId)) {
        throw new Error(`Rule '${ruleId}' is not registered in tsconfigPlugin`);
    }

    const rule = dynamicRules[ruleId];

    if (!isRuleModule(rule)) {
        throw new Error(`Rule '${ruleId}' is not a valid ESLint rule module`);
    }

    return rule;
};
