const { execSync } = require("child_process");
const path = require("path");
const { lintTargets } = require("../lint-targets.js");

const binDir = path.resolve(__dirname, "..", "node_modules", ".bin");
const env = {
  ...process.env,
  PATH: `${binDir}${path.delimiter}${process.env.PATH}`,
};

let hasError = false;

for (const target of lintTargets) {
  const files = target.files.map((f) => `"${f}"`).join(" ");
  const allIgnorePatterns = [];
  if (target.ignorePattern) allIgnorePatterns.push(target.ignorePattern);
  if (target.ignorePatterns) allIgnorePatterns.push(...target.ignorePatterns);
  const ignoreFlag = allIgnorePatterns
    .map((p) => ` --ignore-pattern "${p}"`)
    .join("");
  const cmd = `textlint --config ${target.config}${ignoreFlag} ${files}`;

  console.log(`\n[textlint:${target.name}] ${cmd}\n`);
  try {
    execSync(cmd, { stdio: "inherit", env });
  } catch {
    hasError = true;
  }
}

if (hasError) {
  process.exit(1);
}
