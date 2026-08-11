import { describe, expect, it } from "vitest";

import { getNpmPackFilename } from "../scripts/npm-pack-metadata.mjs";

describe("npm pack metadata", () => {
    it("reads the npm 11 array-shaped package record", () => {
        expect.hasAssertions();
        expect(
            getNpmPackFilename([
                {
                    filename: "eslint-plugin-tsconfig-1.3.6.tgz",
                },
            ])
        ).toBe("eslint-plugin-tsconfig-1.3.6.tgz");
    });

    it("reads the npm 12 package-name-keyed record", () => {
        expect.hasAssertions();
        expect(
            getNpmPackFilename({
                "eslint-plugin-tsconfig": {
                    filename: "eslint-plugin-tsconfig-1.3.6.tgz",
                },
            })
        ).toBe("eslint-plugin-tsconfig-1.3.6.tgz");
    });

    it.each([
        undefined,
        [],
        {},
        [{ filename: "first.tgz" }, { filename: "second.tgz" }],
        [{ filename: " ".repeat(3) }],
        [{ filename: 42 }],
    ])("rejects malformed or ambiguous metadata: %j", (packMetadata) => {
        expect.hasAssertions();
        expect(() => getNpmPackFilename(packMetadata)).toThrow(TypeError);
    });
});
