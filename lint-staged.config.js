const path = require("path");
const { findTarget } = require("./lint-targets.js");

module.exports = {
  "*.{js,ts,tsx,json}": ["prettier --write"],
  "*.md": ["remark --output --silently-ignore"],
  "**/*.md": (files) => {
    const targetFileMap = new Map();
    for (const absFile of files) {
      const relative = path.relative(__dirname, absFile);
      const target = findTarget(relative);
      if (!target) continue;
      if (!targetFileMap.has(target.name))
        targetFileMap.set(target.name, { target, files: [] });
      targetFileMap.get(target.name).files.push(relative);
    }
    return [...targetFileMap.values()].map(
      ({ target, files }) =>
        `textlint --config ${target.config} ${files.map((f) => `"${f}"`).join(" ")}`
    );
  },
};
