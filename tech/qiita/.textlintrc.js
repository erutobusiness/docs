const baseConfig = require("../../.textlintrc.js");
const technicalWriting =
  require("textlint-rule-preset-ja-technical-writing").rules;
const aiWritingPkg = require("@textlint-ja/textlint-rule-preset-ai-writing");
const aiWriting = aiWritingPkg.rules || aiWritingPkg.default.rules;

/**
 * Convert rules to warning severity, preserving existing config options.
 * @param {Object} rulesDefinition - The active rules provided by the preset package
 * @param {Object} baseRulesConfig - The existing configuration from .textlintrc.js
 * @returns {Object} New config object with strict warning severity
 */
const toWarning = (rulesDefinition, baseRulesConfig = {}) => {
  const warnings = {};
  Object.keys(rulesDefinition).forEach((ruleId) => {
    const current = baseRulesConfig[ruleId];
    // If explicitly disabled in base config, keep it disabled
    if (current === false) {
      warnings[ruleId] = false;
      return;
    }

    // Prepare rule config object
    const ruleConfig = typeof current === "object" ? { ...current } : {};

    // Force severity to warning
    ruleConfig.severity = "warning";
    warnings[ruleId] = ruleConfig;
  });
  return warnings;
};

// Process standalone rules from baseConfig (excluding presets which are handled separately)
// We identify presets by their known keys in usage
const PRESET_KEYS = [
  "preset-ja-technical-writing",
  "@textlint-ja/preset-ai-writing",
];

const standaloneRules = {};
Object.keys(baseConfig.rules).forEach((key) => {
  if (PRESET_KEYS.includes(key)) return; // Skip presets

  const current = baseConfig.rules[key];
  if (current === false) {
    standaloneRules[key] = false;
  } else {
    const ruleConfig = typeof current === "object" ? { ...current } : {};
    ruleConfig.severity = "warning";
    standaloneRules[key] = ruleConfig;
  }
});

module.exports = {
  ...baseConfig,
  rules: {
    ...standaloneRules,

    // Preset: AI Writing
    "@textlint-ja/preset-ai-writing": toWarning(
      aiWriting,
      baseConfig.rules["@textlint-ja/preset-ai-writing"]
    ),

    // Preset: Japanese Technical Writing (Explicit overrides for this directory)
    "preset-ja-technical-writing": {
      ...toWarning(
        technicalWriting,
        baseConfig.rules["preset-ja-technical-writing"]
      ),
      "no-mix-dearu-desumasu": {
        preferInBody: "ですます",
        preferInHeader: "ですます",
        preferInList: "ですます",
        severity: "warning",
      },
    },
  },
};
