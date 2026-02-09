# Claude Code Project Configuration

## 1. Core Instructions (Single Source of Truth)

**READ FIRST**: [Shared AI Instructions](../.ai/instructions.md)

## 2. Response Protocol

- **Output language**: Always respond in **Japanese**
- **Internal reasoning**: English permitted for precision
- **No emojis**: Unless explicitly requested
- **Be concise**: Prefer short, direct answers over verbose explanations

## 3. Formatting Rules (Zero Tolerance)

These rules are frequently violated.
**Verify before ANY Markdown output.**

|Rule|Correct|Incorrect|
|-|-|-|
|One sentence per line|`これは1行です`|`これは\n複数行です`|
|No period in list items|`- 項目`|`- 項目。`|
|Cite sources with URL|`[^1]: https://...`|Uncited claims|

## 4. Tool Selection Hierarchy

1. **Explore agent**: Use for codebase understanding, pattern discovery
2. **Grep/Glob**: Use for specific file/symbol lookup
3. **Read**: Use when file path is known
4. **Bash**: Avoid for file operations; use dedicated tools

## 5. Verification Workflow

Before committing Markdown changes:

```bash
npx textlint --config .textlintrc.js <file>
```

**CRITICAL**: Never modify `.textlintrc.js` rules without explicit user approval.

**PostToolUse hook**: MD ファイルの Write/Edit 後に textlint が自動実行される。
違反フィードバックを受けたら即座に修正すること。
手動チェック: `node scripts/textlint-file.js <path>`

## 6. Project Structure

|Directory|Purpose|
|-|-|
|`trpg/`|TRPG scenarios, NPCs, items, session logs|
|`karaoke/`|Karaoke song lists by genre|
|`presentations/`|Presentation materials (Marp-compatible)|
|`tech/`|Technical articles for Qiita|
|`games/`|Game dev notes, Steam reviews|
|`topics/`|Miscellaneous topic notes|
|`templates/`|Reusable templates (NPC, PC, items)|
|`prompt/`|AI prompts and instructions|

## 7. Memory Usage

- Auto-memory at `~/.claude/projects/.../memory/` persists across sessions
- Record: patterns that worked, common mistakes, project-specific conventions
- Consult memory before repeating past mistakes

## 8. Context Management

- This is a **documentation-heavy** project (mostly Markdown)
- Subdirectories may have their own `.textlintrc.js` with stricter rules
- When editing TRPG content, check `templates/` for consistent formatting
