/**
 * @packageDocumentation
 * Shared helper for retrieving source slices by ESTree-compatible node range.
 */

import type { UnknownRecord } from "type-fest";

/**
 * Return source text for a node when a valid `[start, end]` range exists.
 *
 * @param options - Source text and candidate node.
 *
 * @returns Sliced source text for the node range, or an empty string when the
 *   node is malformed or range-less.
 */
import { arrayFirst, isDefined, keyIn, safeCastTo } from "ts-extras";

const isUnknownRecord = (value: unknown): value is UnknownRecord =>
    typeof value === "object" && value !== null;

export const getSourceTextForNode = ({
    code,
    node,
}: Readonly<{
    code: string;
    node: unknown;
}>): string => {
    if (!isUnknownRecord(node)) {
        return "";
    }

    if (!keyIn(node, "range")) {
        return "";
    }

    const nodeRange = safeCastTo<
        Readonly<{
            range?: readonly [number, number];
        }>
    >(node).range;

    if (!isDefined(nodeRange)) {
        return "";
    }

    return code.slice(arrayFirst(nodeRange), nodeRange[1]);
};
