module.exports = (context, options) => {
  const { shouldIgnore } = context;
  // Default: ignore no-mix-dearu-desumasu in footnotes
  const targetRuleIds = Array.isArray(options.ruleId)
    ? options.ruleId
    : [options.ruleId || 'ja-technical-writing/no-mix-dearu-desumasu'];

  return {
    footnoteDefinition(node) {
      // Ignore the target rules in the range of the footnote definition
      for (const ruleId of targetRuleIds) {
        shouldIgnore(node.range, {
          ruleId: ruleId,
        });
      }
    },
  };
};
