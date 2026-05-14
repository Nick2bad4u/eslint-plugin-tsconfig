import { access, glob, rm } from "node:fs/promises";
import process from "node:process";

/**
 * @param {string} value
 *
 * @returns {boolean}
 */
const hasGlobPattern = (value) => /[*?[\]{}]/u.test(value);

/**
 * @param {string} value
 *
 * @returns {Promise<boolean>}
 */
const pathExists = async (value) => {
    try {
        await access(value);
        return true;
    } catch {
        return false;
    }
};

/**
 * @param {string} pattern
 *
 * @returns {Promise<string[]>}
 */
const expandPathPattern = async (pattern) => {
    if (!hasGlobPattern(pattern)) {
        return (await pathExists(pattern)) ? [pattern] : [];
    }

    /** @type {string[]} */
    const matches = [];
    for await (const match of glob(pattern)) {
        matches.push(match);
    }

    return matches;
};

const patterns = process.argv.slice(2);

if (patterns.length === 0) {
    process.exit(0);
}

/** @type {Set<string>} */
const pathsToDelete = new Set();

for (const pattern of patterns) {
    const matches = await expandPathPattern(pattern);
    for (const match of matches) {
        pathsToDelete.add(match);
    }
}

await Promise.allSettled(
    [...pathsToDelete].map((pathToDelete) =>
        rm(pathToDelete, {
            force: true,
            maxRetries: 2,
            recursive: true,
            retryDelay: 100,
        })
    )
);
