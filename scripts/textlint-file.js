#!/usr/bin/env node
/**
 * Single-file textlint runner.
 *
 * Usage: node scripts/textlint-file.js <filePath>
 *
 * Resolves the correct .textlintrc.js from lint-targets.js using findTarget(),
 * preferring the most specific (deepest config path) target.
 * Exits 0 if the file is not a lint target or passes lint.
 * Exits 1 with error output if lint violations are found.
 */
const { execSync } = require("child_process");
const path = require("path");
const { findTarget } = require("../lint-targets.js");

const filePath = process.argv[2];
if (!filePath) {
  console.error("Usage: node scripts/textlint-file.js <filePath>");
  process.exit(1);
}

// Normalize to a relative path from the project root
const projectRoot = path.resolve(__dirname, "..");
const absolute = path.resolve(filePath);
const relative = path.relative(projectRoot, absolute);

const target = findTarget(relative);

if (!target) {
  // Not a lint target — nothing to do
  process.exit(0);
}

// Run textlint
const binDir = path.resolve(projectRoot, "node_modules", ".bin");
const env = {
  ...process.env,
  PATH: `${binDir}${path.delimiter}${process.env.PATH}`,
};

const cmd = `textlint --config ${target.config} "${relative}"`;

try {
  execSync(cmd, { stdio: "inherit", env, cwd: projectRoot });
} catch {
  process.exit(1);
}
