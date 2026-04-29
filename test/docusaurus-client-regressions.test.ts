import type { UnknownRecord } from "type-fest";

import * as fs from "node:fs";
import { createRequire } from "node:module";
import * as path from "node:path";
import { arrayJoin, safeCastTo } from "ts-extras";
import { describe, expect, it, vi } from "vitest";

type PrismLanguageGrammar = UnknownRecord;
type PrismLike = Readonly<{
    highlight: (
        text: string,
        grammar: Readonly<PrismLanguageGrammar>,
        language: string
    ) => string;
    languages: Readonly<Record<string, PrismLanguageGrammar | undefined>> & {
        extend: (
            id: string,
            redef: Readonly<PrismLanguageGrammar>
        ) => PrismLanguageGrammar;
    };
}>;

const requireFromDocsWorkspace = createRequire(import.meta.url);
const prismIncludeLanguagesModule = requireFromDocsWorkspace(
    "../docs/docusaurus/src/theme/prism-include-languages.js"
) as unknown;

const isPrismIncludeLanguages = (
    value: unknown
): value is (prismObject: PrismLike) => PrismLike =>
    typeof value === "function";

if (!isPrismIncludeLanguages(prismIncludeLanguagesModule)) {
    throw new TypeError(
        "Expected prism-include-languages to export a function."
    );
}

const prismIncludeLanguages = prismIncludeLanguagesModule;

const prismModule = requireFromDocsWorkspace("prismjs") as unknown;

const isPrismLike = (value: unknown): value is PrismLike => {
    if (typeof value !== "object" || value === null) {
        return false;
    }

    const candidate = safeCastTo<{
        highlight?: unknown;
        languages?: unknown;
    }>(value);

    return (
        typeof candidate.highlight === "function" &&
        typeof candidate.languages === "object" &&
        candidate.languages !== null
    );
};

if (!isPrismLike(prismModule)) {
    throw new TypeError("Expected prismjs module to export an object.");
}

const Prism = prismModule;

requireFromDocsWorkspace("prismjs/components/prism-javascript");
requireFromDocsWorkspace("prismjs/components/prism-jsx");
requireFromDocsWorkspace("prismjs/components/prism-typescript");
requireFromDocsWorkspace("prismjs/components/prism-tsx");

type GlobalTestEnvironment = typeof globalThis & {
    document?: Document;
    location?: Location;
    MutationObserver?: typeof MutationObserver;
    window?: typeof globalThis & Window;
};

const globalTestEnvironment = safeCastTo<GlobalTestEnvironment>(globalThis);
const originalDocument = globalTestEnvironment.document;
const originalLocation = globalTestEnvironment.location;
const originalMutationObserver = globalTestEnvironment.MutationObserver;
const originalWindow = globalTestEnvironment.window;
const modernEnhancementsPath = path.join(
    process.cwd(),
    "docs/docusaurus/src/js/modernEnhancements.ts"
);

const restoreGlobalTestEnvironment = (): void => {
    globalTestEnvironment.document = originalDocument;
    globalTestEnvironment.location = originalLocation;
    globalTestEnvironment.MutationObserver = originalMutationObserver;
    globalTestEnvironment.window = originalWindow;
    vi.restoreAllMocks();
};

describe("docusaurus client regressions", () => {
    describe("prism customization", () => {
        it("highlights JSDoc tags inside TypeScript doc-comment blocks", () => {
            expect.hasAssertions();

            try {
                prismIncludeLanguages(Prism);
                const fallbackGrammar = Prism.languages.extend("clike", {});
                const typescriptGrammar = Prism.languages["typescript"];

                expect(typescriptGrammar).toBeDefined();

                const highlighted = Prism.highlight(
                    arrayJoin(
                        [
                            "/**",
                            " * @example",
                            " * @category Type guard",
                            " */",
                        ],
                        "\n"
                    ),
                    typescriptGrammar ?? fallbackGrammar,
                    "typescript"
                );

                expect(highlighted).toContain("token jsdoc-tag keyword");
                expect(highlighted).toContain("@example");
                expect(highlighted).toContain("@category");
            } finally {
                restoreGlobalTestEnvironment();
            }
        });
    });

    describe("client enhancement bootstrap", () => {
        it("uses the window load event instead of DOMContentLoaded for initial setup", () => {
            expect.hasAssertions();

            try {
                const sourceText = fs.readFileSync(
                    modernEnhancementsPath,
                    "utf8"
                );

                expect(sourceText).toContain(
                    'globalThis.addEventListener("load", handleWindowLoad, { once: true });'
                );
                expect(sourceText).not.toContain(
                    'document.addEventListener("DOMContentLoaded", handleDOMContentLoaded);'
                );
                expect(sourceText).toContain(
                    'if (document.readyState === "complete") {'
                );
            } finally {
                restoreGlobalTestEnvironment();
            }
        });
    });
});
