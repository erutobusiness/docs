const { lintTargets } = require("./lint-targets.js");

const config = {
  "*.{js,ts,tsx,json}": ["prettier --write"],
  "*.md": ["remark --output --silently-ignore"],
};

for (const target of lintTargets) {
  const command = `textlint --config ${target.config}`;
  for (const pattern of target.staged) {
    config[pattern] = [command];
  }
}

module.exports = config;
