import { describe, expect, it, vi } from "vitest";

import { transformManifest } from "../.npm-extension.mjs";

type RepairCase = Readonly<{
    dependencyField: "dependencies" | "peerDependencies";
    dependencyName: string;
    effectiveRange: string;
    packageName: string;
    packageVersion: string;
    publishedRange: string;
}>;

const repairCases = [
    {
        dependencyField: "peerDependencies",
        dependencyName: "typescript",
        effectiveRange: "^5.4.4 || ^6.0.0",
        packageName: "madge",
        packageVersion: "8.0.0",
        publishedRange: "^5.4.4",
    },
    {
        dependencyField: "peerDependencies",
        dependencyName: "typescript",
        effectiveRange: "^5.0.0 || ^6.0.0",
        packageName: "tsconfck",
        packageVersion: "3.1.6",
        publishedRange: "^5.0.0",
    },
    {
        dependencyField: "dependencies",
        dependencyName: "tar",
        effectiveRange: "7.5.22",
        packageName: "gitleaks-secret-scanner",
        packageVersion: "2.1.1",
        publishedRange: "^6.2.1",
    },
    {
        dependencyField: "dependencies",
        dependencyName: "tmp",
        effectiveRange: "^0.2.7",
        packageName: "external-editor",
        packageVersion: "3.1.0",
        publishedRange: "^0.0.33",
    },
    {
        dependencyField: "dependencies",
        dependencyName: "qs",
        effectiveRange: "6.15.3",
        packageName: "typed-rest-client",
        packageVersion: "2.3.1",
        publishedRange: "6.15.1",
    },
    {
        dependencyField: "dependencies",
        dependencyName: "serialize-javascript",
        effectiveRange: "^7.1.0",
        packageName: "copy-webpack-plugin",
        packageVersion: "11.0.0",
        publishedRange: "^6.0.0",
    },
    {
        dependencyField: "dependencies",
        dependencyName: "serialize-javascript",
        effectiveRange: "^7.1.0",
        packageName: "css-minimizer-webpack-plugin",
        packageVersion: "5.0.1",
        publishedRange: "^6.0.1",
    },
] as const satisfies readonly RepairCase[];

const createManifest = ({
    dependencyField,
    dependencyName,
    packageName,
    packageVersion,
    publishedRange,
}: RepairCase): Record<string, unknown> => ({
    [dependencyField]: {
        [dependencyName]: publishedRange,
    },
    name: packageName,
    version: packageVersion,
});

const createLog = () => vi.fn<(message: string) => void>();

describe("npm dependency manifest extension", () => {
    it.each(repairCases)(
        "repairs $packageName@$packageVersion $dependencyName metadata",
        (repair) => {
            expect.hasAssertions();

            const log = createLog();
            const packageManifest = createManifest(repair);

            expect(transformManifest(packageManifest, { log })).toStrictEqual({
                ...packageManifest,
                [repair.dependencyField]: {
                    [repair.dependencyName]: repair.effectiveRange,
                },
            });
            expect(log).toHaveBeenCalledExactlyOnceWith(
                `Corrected ${repair.packageName}@${repair.packageVersion} ${repair.dependencyField}.${repair.dependencyName} to ${repair.effectiveRange}.`
            );
        }
    );

    it("leaves unrelated package manifests unchanged", () => {
        expect.hasAssertions();

        const packageManifest = {
            name: "other-package",
            version: "1.0.0",
        };

        expect(
            transformManifest(packageManifest, {
                log: createLog(),
            })
        ).toBe(packageManifest);
    });

    it("fails when reviewed upstream metadata changes", () => {
        expect.hasAssertions();

        const repair = repairCases[0];
        const packageManifest = {
            ...createManifest(repair),
            peerDependencies: {
                typescript: repair.effectiveRange,
            },
        };

        expect(() =>
            transformManifest(packageManifest, {
                log: createLog(),
            })
        ).toThrow(/Remove or update the metadata repair/v);
    });
});
