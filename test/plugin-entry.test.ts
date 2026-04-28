/**
 * @packageDocumentation
 * Vitest coverage for `plugin-entry.test` behavior.
 */
import { createRequire } from "node:module";
import { describe, expect, it } from "vitest";

import { tsconfigConfigNames } from "../src/_internal/tsconfig-config-references";
import tsconfigPlugin from "../src/plugin";

const requireFromTestModule = createRequire(import.meta.url);
const packageJson = requireFromTestModule("../package.json") as {
    version: string;
};
const expectedPluginVersion = packageJson.version;

const expectedConfigRegistryShape = expect.objectContaining(
    Object.fromEntries(
        [...tsconfigConfigNames].map((configName) => [
            configName,
            expect.any(Object),
        ])
    )
);

const expectedRuleRegistryShape = expect.objectContaining({
    "consistent-incremental-with-tsbuildinfo": expect.any(Object),
    "consistent-module-resolution": expect.any(Object),
    "consistent-target-and-lib": expect.any(Object),
    "no-declaration-only-without-declaration": expect.any(Object),
    "no-disable-strict-subset": expect.any(Object),
    "no-emit-in-root-config": expect.any(Object),
    "no-esmoduleinterop-with-verbatim": expect.any(Object),
    "no-esnext-target-in-library": expect.any(Object),
    "no-include-dist": expect.any(Object),
    "no-include-node-modules": expect.any(Object),
    "no-legacy-module-resolution": expect.any(Object),
    "no-rootdir-includes-outdir": expect.any(Object),
    "no-skip-lib-check": expect.any(Object),
    "require-bundler-module-resolution": expect.any(Object),
    "require-composite-for-references": expect.any(Object),
    "require-declaration-with-composite": expect.any(Object),
    "require-downlevel-iteration-with-iterators": expect.any(Object),
    "require-exact-optional-property-types": expect.any(Object),
    "require-exclude-common-artifacts": expect.any(Object),
    "require-no-implicit-override": expect.any(Object),
    "require-no-unchecked-indexed-access": expect.any(Object),
    "require-outdir-when-emitting": expect.any(Object),
    "require-source-map-in-dev": expect.any(Object),
    "require-strict-mode": expect.any(Object),
    "require-verbatim-module-syntax": expect.any(Object),
});

describe("plugin entry module", () => {
    it("exports default plugin object with rule and config registries", () => {
        expect.hasAssertions();
        expect(tsconfigPlugin).toStrictEqual(
            expect.objectContaining({
                configs: expect.any(Object),
                meta: expect.any(Object),
                processors: expect.any(Object),
                rules: expect.any(Object),
            })
        );

        expect(tsconfigPlugin.meta).toStrictEqual(
            expect.objectContaining({
                name: "eslint-plugin-tsconfig",
                namespace: "tsconfig",
                version: expectedPluginVersion,
            })
        );
    });

    it("exposes critical presets and latest rule registrations", () => {
        expect.hasAssertions();
        expect(tsconfigPlugin.configs).toStrictEqual(
            expectedConfigRegistryShape
        );
        expect(tsconfigPlugin.rules).toStrictEqual(expectedRuleRegistryShape);
    });

    it("exports matching runtime plugin shape from plugin.mjs", async () => {
        expect.hasAssertions();

        const runtimePluginModule = (await import("../plugin.mjs")) as {
            default: unknown;
        };

        expect(runtimePluginModule.default).toStrictEqual(
            expect.objectContaining({
                configs: expect.any(Object),
                meta: expect.any(Object),
                processors: expect.any(Object),
                rules: expect.any(Object),
            })
        );

        expect(runtimePluginModule.default).toStrictEqual(
            expect.objectContaining({
                meta: expect.objectContaining({
                    name: "eslint-plugin-tsconfig",
                    namespace: "tsconfig",
                    version: expectedPluginVersion,
                }),
            })
        );
    });
});
