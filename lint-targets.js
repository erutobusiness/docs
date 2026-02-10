/**
 * Single Source of Truth for textlint target definitions.
 * Used by lint-staged.config.js, scripts/run-textlint.js, and scripts/textlint-file.js.
 *
 * Each entry defines:
 * - config: path to the .textlintrc.js file
 * - files: glob patterns for `npm run lint` (passed to textlint CLI)
 * - ignorePattern: optional single --ignore-pattern for textlint CLI (string)
 * - ignorePatterns: optional multiple --ignore-pattern for textlint CLI (string[])
 */
const micromatch = require("micromatch");

const lintTargets = [
  {
    name: "root",
    config: ".textlintrc.js",
    ignorePatterns: ["tech/qiita/**/*.md"],
    files: [
      "trpg/{characters,items,memo,rules,assets}/**/*.md",
      "trpg/scenarios/Okami/{chapters,mechanics,npcs,references,setting}/**/*.md",
      "trpg/scenarios/SIREN/{TODO.md,chapters/**/*.md,items/**/*.md,mechanics/**/*.md,npcs/**/*.md,references/**/*.md,setting/**/*.md}",
      "trpg/scenarios/Toaru/{handouts,items,maps,npcs,sessions,setting}/**/*.md",
      "trpg/scenarios/{Alice,Hologram,Relief,_template}/**/*.md",
      "games/**/*.md",
      "tech/**/*.md",
      "topics/**/*.md",
      "youtube/**/*.md",
      "templates/**/*.md",
    ],
  },
  {
    name: "readme",
    config: ".textlintrc.readme.js",
    files: [
      "README.md",
      "trpg/README.md",
      "trpg/scenarios/Okami/README.md",
      "trpg/scenarios/SIREN/README.md",
      "trpg/scenarios/Toaru/README.md",
    ],
  },
  {
    name: "presentations:baby-cup",
    config: "presentations/baby-cup/.textlintrc.js",
    files: [
      "presentations/baby-cup/*.md",
      "presentations/baby-cup/10_flow/**/*.md",
      "presentations/baby-cup/20_topics/**/*.md",
    ],
  },
  {
    name: "presentations:baby-cup:marp",
    config: "presentations/baby-cup/30_marp/.textlintrc.js",
    files: ["presentations/baby-cup/30_marp/**/*.md"],
  },
  {
    name: "presentations:claude-vs-antigravity",
    config: "presentations/claude-vs-antigravity/.textlintrc.js",
    files: ["presentations/claude-vs-antigravity/**/*.md"],
    ignorePattern:
      "presentations/claude-vs-antigravity/karaoke-kumikyoku/**/*.md",
  },
  {
    name: "presentations:declarative",
    config: "presentations/declarative/.textlintrc.js",
    files: ["presentations/declarative/**/*.md"],
  },
  {
    name: "presentations:the-art-of-loving",
    config: "presentations/the-art-of-loving/.textlintrc.js",
    files: ["presentations/the-art-of-loving/**/*.md"],
  },
  {
    name: "presentations:markdown-not-rotting",
    config: "presentations/markdown-and-the-art-of-not-rotting/.textlintrc.js",
    files: ["presentations/markdown-and-the-art-of-not-rotting/**/*.md"],
  },
  {
    name: "qiita",
    config: "tech/qiita/.textlintrc.js",
    files: ["tech/qiita/**/*.md"],
  },
  {
    name: "prompt",
    config: "prompt/.textlintrc.js",
    files: ["prompt/**/*.md"],
  },
];

/**
 * Find the best matching lint target for a given relative file path.
 * Matches against `files` globs, excludes via `ignorePattern`/`ignorePatterns`,
 * and returns the most specific target (deepest config path).
 *
 * @param {string} relativePath - File path relative to project root
 * @returns {object|null} The matching target, or null if no match
 */
function findTarget(relativePath) {
  const matches = [];
  for (const target of lintTargets) {
    if (!micromatch.isMatch(relativePath, target.files)) continue;
    if (
      target.ignorePattern &&
      micromatch.isMatch(relativePath, target.ignorePattern)
    )
      continue;
    if (
      target.ignorePatterns &&
      micromatch.isMatch(relativePath, target.ignorePatterns)
    )
      continue;
    matches.push(target);
  }
  if (matches.length === 0) return null;
  matches.sort(
    (a, b) => b.config.split("/").length - a.config.split("/").length
  );
  return matches[0];
}

module.exports = { lintTargets, findTarget };
