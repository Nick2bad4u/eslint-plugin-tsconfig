/**
 * @packageDocumentation
 * Shared Markdown heading extraction helpers for docs tests.
 */

import { stringSplit } from "ts-extras";

const CODE_FENCE_DELIMITER = "```" as const;
const NORMALIZED_LINE_BREAK = "\n";

/**
 * Parse Markdown headings for an exact level while skipping fenced code.
 *
 * @param markdown - Markdown source text.
 * @param level - Heading level to parse (`1` for H1, `2` for H2, etc.).
 *
 * @returns Heading text values in source order.
 */
export const parseMarkdownHeadingsAtLevel = (
    markdown: string,
    level: number
): readonly string[] => {
    const headingPrefix = "#".repeat(level);
    const headingPrefixWithSpace = `${headingPrefix} `;
    const headings: string[] = [];
    let isInsideFencedCodeBlock = false;

    const normalizedMarkdown = markdown.replaceAll("\r\n", "\n");

    for (const line of stringSplit(normalizedMarkdown, NORMALIZED_LINE_BREAK)) {
        const trimmedStartLine = line.trimStart();

        if (trimmedStartLine.startsWith(CODE_FENCE_DELIMITER)) {
            isInsideFencedCodeBlock = !isInsideFencedCodeBlock;
        } else if (
            !isInsideFencedCodeBlock &&
            trimmedStartLine.startsWith(headingPrefixWithSpace) &&
            !trimmedStartLine.startsWith(`${headingPrefix}#`)
        ) {
            headings.push(trimmedStartLine.slice(headingPrefix.length).trim());
        }
    }

    return headings;
};
