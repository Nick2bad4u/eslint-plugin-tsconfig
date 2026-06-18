import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

/**
 * @packageDocumentation
 * Dynamic sidebar generation for plugin rule documentation sections.
 */
import { readdirSync } from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

/** Minimal document item shape used by generated rule categories. */
interface SidebarDocItem {
    readonly id: string;
    readonly label: string;
    readonly type: "doc";
}

/** Directory containing this sidebar module. */
const sidebarDirectoryPath = path.dirname(fileURLToPath(import.meta.url));
/** Directory containing generated rule docs consumed by the sidebar. */
const rulesDirectoryPath = path.join(sidebarDirectoryPath, "..", "rules");

/** Check whether a directory entry name is a markdown file. */
const isMarkdownFile = (fileName: string): boolean => fileName.endsWith(".md");

/** Convert a markdown filename (e.g. `foo.md`) to a Docusaurus doc id. */
const toRuleDocId = (fileName: string): string => fileName.slice(0, -3);

/** Sorted rule-doc ids discovered from `docs/rules/*.md`. */
const allRuleDocIds = readdirSync(rulesDirectoryPath, {
    withFileTypes: true,
})
    .filter((entry) => entry.isFile() && isMarkdownFile(entry.name))
    .map((entry) => toRuleDocId(entry.name))
    .toSorted((left, right) => left.localeCompare(right));

/** Build sidebar doc items for rule docs matching a given filename prefix. */
const createRuleItemsByPrefix = (prefix: string): SidebarDocItem[] =>
    allRuleDocIds
        .filter((ruleDocId) => ruleDocId.startsWith(prefix))
        .map((ruleDocId) => ({
            id: ruleDocId,
            label: ruleDocId,
            type: "doc",
        }));

/** Sidebar entries for `consistent-*` rule docs. */
const consistentRuleItems = createRuleItemsByPrefix("consistent-");
/** Sidebar entries for `no-*` rule docs. */
const noRuleItems = createRuleItemsByPrefix("no-");
/** Sidebar entries for `require-*` rule docs. */
const requireRuleItems = createRuleItemsByPrefix("require-");

/** Complete sidebar structure for docs site navigation. */
const sidebars = {
    rules: [
        {
            className: "sb-doc-overview",
            id: "overview",
            label: "🏁 Overview",
            type: "doc",
        },
        {
            className: "sb-doc-getting-started",
            id: "getting-started",
            label: "🚀 Getting Started",
            type: "doc",
        },
        {
            className: "sb-cat-guides",
            collapsed: true,
            customProps: {
                badge: "guides",
            },
            items: [
                {
                    id: "guides/adoption-checklist",
                    label: "✅ Adoption checklist",
                    type: "doc",
                },
                {
                    id: "guides/rollout-and-fix-safety",
                    label: "🛡️ Rollout and fix safety",
                    type: "doc",
                },
                {
                    id: "guides/preset-selection-strategy",
                    label: "💭 Preset selection strategy",
                    type: "doc",
                },
                {
                    id: "guides/type-aware-linting-readiness",
                    label: "🔌 Parser and scope readiness",
                    type: "doc",
                },
            ],
            label: "🧭 Adoption & Rollout",
            link: {
                description:
                    "Shared migration, rollout, and fix-safety guidance for rule adoption.",
                title: "Adoption & Rollout",
                type: "generated-index",
            },
            type: "category",
        },
        {
            className: "sb-cat-presets",
            collapsed: true,
            customProps: {
                badge: "presets",
            },
            items: [
                {
                    className: "sb-preset-recommended",
                    id: "presets/recommended",
                    label: "🟡 Recommended",
                    type: "doc",
                },
                {
                    className: "sb-preset-strict",
                    id: "presets/strict",
                    label: "🔴 Strict",
                    type: "doc",
                },
                {
                    className: "sb-preset-strictest",
                    id: "presets/strictest",
                    label: "💎 strictest",
                    type: "doc",
                },
                {
                    className: "sb-preset-jsconfig",
                    id: "presets/jsconfig",
                    label: "🟢 jsconfig",
                    type: "doc",
                },
                {
                    className: "sb-preset-all",
                    id: "presets/all",
                    label: "🟣 All",
                    type: "doc",
                },
                {
                    className: "sb-preset-emit-config",
                    id: "presets/emit-config",
                    label: "📤 emit-config",
                    type: "doc",
                },
                {
                    className: "sb-preset-include-hygiene",
                    id: "presets/include-hygiene",
                    label: "🧹 include-hygiene",
                    type: "doc",
                },
                {
                    className: "sb-preset-lib-target",
                    id: "presets/lib-target",
                    label: "🎯 lib-target",
                    type: "doc",
                },
                {
                    className: "sb-preset-module-resolution",
                    id: "presets/module-resolution",
                    label: "📦 module-resolution",
                    type: "doc",
                },
                {
                    className: "sb-preset-project-references",
                    id: "presets/project-references",
                    label: "🔗 project-references",
                    type: "doc",
                },
                {
                    className: "sb-preset-strict-mode",
                    id: "presets/strict-mode",
                    label: "🔒 strict-mode",
                    type: "doc",
                },
            ],
            label: "Presets",
            link: {
                id: "presets/index",
                type: "doc",
            },
            type: "category",
        },
        {
            className: "sb-cat-rules",
            collapsed: true,
            customProps: {
                badge: "rules",
            },
            items: [
                {
                    className: "sb-cat-rules-consistent",
                    collapsed: true,
                    collapsible: true,
                    customProps: {
                        badge: "consistent",
                    },
                    items: consistentRuleItems,
                    label: "consistent",
                    link: {
                        description:
                            "Rules that enforce consistent tsconfig.json option combinations.",
                        title: "Consistency Rules",
                        type: "generated-index",
                    },
                    type: "category",
                },
                {
                    className: "sb-cat-rules-no",
                    collapsed: true,
                    collapsible: true,
                    customProps: {
                        badge: "no",
                    },
                    items: noRuleItems,
                    label: "no",
                    link: {
                        description:
                            "Rules that forbid problematic or incorrect tsconfig.json options.",
                        title: "No Rules",
                        type: "generated-index",
                    },
                    type: "category",
                },
                {
                    className: "sb-cat-rules-require",
                    collapsed: true,
                    collapsible: true,
                    customProps: {
                        badge: "require",
                    },
                    items: requireRuleItems,
                    label: "require",
                    link: {
                        description:
                            "Rules that require specific tsconfig.json options to be present and correctly set.",
                        title: "Require Rules",
                        type: "generated-index",
                    },
                    type: "category",
                },
            ],
            label: "Rules",
            link: {
                description:
                    "Rule documentation for every eslint-plugin-tsconfig rule.",
                slug: "/",
                title: "Rule Reference",
                type: "generated-index",
            },
            type: "category",
        },
    ],
} satisfies SidebarsConfig;

export default sidebars;
