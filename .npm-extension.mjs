/**
 * Apply narrow dependency-manifest repairs before npm resolves the tree.
 *
 * Each repair is pinned to the exact upstream manifest metadata that was
 * reviewed. The stale-range guard makes npm fail once upstream changes that
 * metadata, so obsolete policy cannot silently become permanent.
 */

/** @typedef {"dependencies" | "peerDependencies"} DependencyField */
/**
 * @typedef {Readonly<{
 *     dependencyField: DependencyField;
 *     dependencyName: string;
 *     effectiveRange: string;
 *     packageName: string;
 *     packageVersion: string;
 *     publishedRange: string;
 * }>} ManifestRepair
 */

/** @type {readonly ManifestRepair[]} */
const MANIFEST_REPAIRS = [
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
];

/**
 * Check whether an unknown value is a non-null object record.
 *
 * @param {unknown} value
 *
 * @returns {value is Record<string, unknown>}
 */
const isRecord = (value) => typeof value === "object" && value !== null;

/**
 * Correct known third-party dependency metadata before tree resolution.
 *
 * @param {Record<string, unknown>} packageManifest
 * @param {{ log(message: string): void }} context
 *
 * @returns {Record<string, unknown>}
 */
export function transformManifest(packageManifest, context) {
    const repair = MANIFEST_REPAIRS.find(
        ({ packageName, packageVersion }) =>
            packageManifest["name"] === packageName &&
            packageManifest["version"] === packageVersion
    );

    if (repair === undefined) {
        return packageManifest;
    }

    const dependencies = packageManifest[repair.dependencyField];

    if (
        !isRecord(dependencies) ||
        dependencies[repair.dependencyName] !== repair.publishedRange
    ) {
        throw new TypeError(
            `Remove or update the metadata repair for ${repair.packageName}@${repair.packageVersion}: expected ${repair.dependencyField}.${repair.dependencyName} to be ${repair.publishedRange}.`
        );
    }

    context.log(
        `Corrected ${repair.packageName}@${repair.packageVersion} ${repair.dependencyField}.${repair.dependencyName} to ${repair.effectiveRange}.`
    );

    return {
        ...packageManifest,
        [repair.dependencyField]: {
            ...dependencies,
            [repair.dependencyName]: repair.effectiveRange,
        },
    };
}
