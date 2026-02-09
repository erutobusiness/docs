#!/usr/bin/env node
/**
 * Claude Code PostToolUse hook for textlint.
 *
 * Reads the hook JSON from stdin, extracts tool_input.file_path,
 * and runs textlint-file.js on .md files.
 *
 * If violations are found, outputs a JSON object with
 * { "decision": "block", "reason": "..." } to stdout,
 * which Claude Code interprets as feedback to fix the issues.
 */
const { execSync } = require("child_process");
const path = require("path");

const projectDir =
  process.env.CLAUDE_PROJECT_DIR || path.resolve(__dirname, "..", "..");

async function main() {
  let input = "";
  for await (const chunk of process.stdin) {
    input += chunk;
  }

  let data;
  try {
    data = JSON.parse(input);
  } catch {
    // Invalid JSON — skip silently
    process.exit(0);
  }

  const filePath = data?.tool_input?.file_path;
  if (!filePath) {
    process.exit(0);
  }

  // Only lint .md files
  if (!filePath.endsWith(".md")) {
    process.exit(0);
  }

  const scriptPath = path.join(projectDir, "scripts", "textlint-file.js");

  try {
    execSync(`node "${scriptPath}" "${filePath}"`, {
      cwd: projectDir,
      stdio: ["pipe", "pipe", "pipe"],
      timeout: 30000,
    });
    // Lint passed — no output needed
  } catch (e) {
    const stdout = e.stdout ? e.stdout.toString() : "";
    const stderr = e.stderr ? e.stderr.toString() : "";
    const lintOutput = (stdout + "\n" + stderr).trim();

    const result = {
      decision: "block",
      reason: `textlint violations found:\n${lintOutput}\n\nPlease fix the violations above.`,
    };
    process.stdout.write(JSON.stringify(result));
  }
}

main();
