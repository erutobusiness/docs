const fs = require("node:fs");
const path = require("node:path");

const SOURCE_ROOT = path.join(__dirname, "../md");
const DEST_ROOT = path.join(__dirname, "../_gen_obsidian_vault");

function convertContent(content) {
  // Convert <details><summary>...</summary>...</details>
  // to > [!NOTE]- ...

  const newContent = content.replace(
    /<details>\s*<summary>(.*?)<\/summary>([\s\S]*?)<\/details>/g,
    (_match, summary, body) => {
      // Indent body for blockquote
      const indentedBody = body
        .split("\n")
        .map((line) => `> ${line}`)
        .join("\n");
      return `> [!NOTE]- ${summary}\n>\n${indentedBody}\n`;
    }
  );

  return newContent;
}

function processDirectory(sourceDir, destDir) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const items = fs.readdirSync(sourceDir);

  for (const item of items) {
    const sourcePath = path.join(sourceDir, item);
    const destPath = path.join(destDir, item);
    const stat = fs.statSync(sourcePath);

    if (stat.isDirectory()) {
      processDirectory(sourcePath, destPath);
    } else {
      if (item.endsWith(".md")) {
        const content = fs.readFileSync(sourcePath, "utf8");
        const newContent = convertContent(content);
        fs.writeFileSync(destPath, newContent);
      } else {
        // Copy other files (images, etc) directly
        fs.copyFileSync(sourcePath, destPath);
      }
    }
  }
}

// Clean dest dir first
if (fs.existsSync(DEST_ROOT)) {
  fs.rmSync(DEST_ROOT, { recursive: true, force: true });
}
processDirectory(SOURCE_ROOT, DEST_ROOT);
