#!/usr/bin/env node

/**
 * Read the single tarball filename from npm pack JSON metadata.
 *
 * Npm 11 emits an array of package records. npm 12 emits an object keyed by
 * package name. Release automation accepts both shapes while rejecting empty,
 * ambiguous, or malformed metadata.
 */

import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Check whether an unknown value is a non-null object record.
 *
 * @param {unknown} value
 *
 * @returns {value is Record<string, unknown>}
 */
const isRecord = (value) => typeof value === "object" && value !== null;

/**
 * Extract exactly one valid tarball filename from npm pack JSON metadata.
 *
 * @param {unknown} packMetadata
 *
 * @returns {string}
 *
 * @throws {TypeError} When the metadata does not contain exactly one package
 *   record with a nonblank filename.
 */
export const getNpmPackFilename = (packMetadata) => {
    const packageRecords = Array.isArray(packMetadata)
        ? packMetadata
        : isRecord(packMetadata)
          ? Object.values(packMetadata)
          : [];

    if (packageRecords.length !== 1) {
        throw new TypeError(
            `Expected exactly one npm pack package record, received ${packageRecords.length}.`
        );
    }

    const [packageRecord] = packageRecords;

    if (!isRecord(packageRecord)) {
        throw new TypeError(
            "Expected the npm pack package record to be an object."
        );
    }

    const { filename } = packageRecord;

    if (typeof filename !== "string" || filename.trim().length === 0) {
        throw new TypeError(
            "Expected the npm pack package record to contain a nonblank filename."
        );
    }

    return filename.trim();
};

/**
 * Read and parse npm pack JSON metadata from disk.
 *
 * @param {string} metadataPath
 *
 * @returns {Promise<string>}
 */
export const readNpmPackFilename = async (metadataPath) => {
    const metadataText = await readFile(metadataPath, "utf8");
    /** @type {unknown} */
    const packMetadata = JSON.parse(metadataText);

    return getNpmPackFilename(packMetadata);
};

/** Execute the command-line entrypoint. */
const main = async () => {
    const [metadataPath, ...unexpectedArguments] = process.argv.slice(2);

    if (metadataPath === undefined || unexpectedArguments.length > 0) {
        throw new TypeError(
            "Usage: node scripts/npm-pack-metadata.mjs <npm-pack-json-path>"
        );
    }

    process.stdout.write(await readNpmPackFilename(metadataPath));
};

if (
    process.argv[1] !== undefined &&
    path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
    await main().catch((error) => {
        const errorMessage =
            error instanceof Error ? error.message : String(error);
        console.error(`Failed to read npm pack metadata: ${errorMessage}`);
        process.exitCode = 1;
    });
}
