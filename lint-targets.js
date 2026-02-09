/**
 * Single Source of Truth for textlint target definitions.
 * Used by both lint-staged.config.js and scripts/run-textlint.js.
 *
 * Each entry defines:
 * - config: path to the .textlintrc.js file
 * - files: glob patterns for `npm run lint` (passed to textlint CLI)
 * - staged: glob pattern(s) for lint-staged (micromatch syntax)
 * - ignorePattern: optional --ignore-pattern for textlint CLI
 */
const lintTargets = [
  {
    name: "root",
    config: ".textlintrc.js",
    files: [
      "trpg/{characters,items,memo,rules,assets}/**/*.md",
      "trpg/scenarios/Okami/{chapters,mechanics,npcs,references,setting}/**/*.md",
      "trpg/scenarios/SIREN/{TODO.md,chapters/**/*.md,items/**/*.md,mechanics/**/*.md,npcs/**/*.md,references/**/*.md,setting/**/*.md}",
      "trpg/scenarios/Toaru/{handouts,items,maps,npcs,sessions,setting}/**/*.md",
      "trpg/scenarios/{Alice,Hologram,Relief,_template}/**/*.md",
      "games/**/*.md",
      "ideas/**/*.md",
      "tech/*.md",
      "tech/frontend/**/*.md",
      "tech/textlint/**/*.md",
      "topics/**/*.md",
      "youtube/**/*.md",
      "templates/**/*.md",
    ],
    staged: [
      "trpg/scenarios/Okami/{chapters,mechanics,npcs,references,setting}/**/*.md",
      "trpg/scenarios/SIREN/{TODO.md,chapters/**/*.md,items/**/*.md,mechanics/**/*.md,npcs/**/*.md,references/**/*.md,setting/**/*.md}",
      "trpg/scenarios/Toaru/{handouts,items,maps,npcs,sessions,setting}/**/*.md",
      "trpg/scenarios/{Alice,Hologram,Relief,_template}/**/*.md",
      "trpg/{characters/**/*.md,items/**/*.md,memo/**/*.md,rules/**/*.md,assets/**/*.md}",
      "tech/textlint/**/*.md",
      "games/**/*.md",
      "ideas/**/*.md",
      "tech/frontend/**/*.md",
      "tech/*.md",
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
    staged: [
      "./README.md",
      "trpg/README.md",
      "trpg/scenarios/{Okami,SIREN,Toaru}/README.md",
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
    staged: ["presentations/baby-cup/{*.md,10_flow/**/*.md,20_topics/**/*.md}"],
  },
  {
    name: "presentations:baby-cup:marp",
    config: "presentations/baby-cup/30_marp/.textlintrc.js",
    files: ["presentations/baby-cup/30_marp/**/*.md"],
    staged: ["presentations/baby-cup/30_marp/**/*.md"],
  },
  {
    name: "presentations:claude-vs-antigravity",
    config: "presentations/claude-vs-antigravity/.textlintrc.js",
    files: ["presentations/claude-vs-antigravity/**/*.md"],
    staged: [
      "presentations/claude-vs-antigravity/{,!(karaoke-kumikyoku)/**/}*.md",
    ],
    ignorePattern:
      "presentations/claude-vs-antigravity/karaoke-kumikyoku/**/*.md",
  },
  {
    name: "presentations:declarative",
    config: "presentations/declarative/.textlintrc.js",
    files: ["presentations/declarative/**/*.md"],
    staged: ["presentations/declarative/**/*.md"],
  },
  {
    name: "presentations:the-art-of-loving",
    config: "presentations/the-art-of-loving/.textlintrc.js",
    files: ["presentations/the-art-of-loving/**/*.md"],
    staged: ["presentations/the-art-of-loving/**/*.md"],
  },
  {
    name: "qiita",
    config: "tech/qiita/.textlintrc.js",
    files: ["tech/qiita/**/*.md"],
    staged: ["tech/qiita/**/*.md"],
  },
  {
    name: "prompt",
    config: "prompt/.textlintrc.js",
    files: ["prompt/**/*.md"],
    staged: ["prompt/**/*.md"],
  },
];

module.exports = { lintTargets };
