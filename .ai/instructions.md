# Shared AI Assistant Instructions

Shared rules for Claude Code, Google Antigravity (Gemini Code Assist), GitHub Copilot, and other AI coding assistants.

## Markdown Editing Rules

- **Cite sources (情報源の明記)**: Always include footnotes with source URLs when citing web-searched information
- **One sentence per line (1行1文)**: Keep each sentence on a single line without line breaks (`one-sentence-per-line`)
- **No period in list items (箇条書きの句点禁止)**: Do not end list items with `。` (`period-in-list-item`, auto-fixable)
- **No AI hype expressions (AI過剰表現の抑制)**: Avoid exaggerated phrases like "groundbreaking" or "revolutionary" (`no-ai-hype-expressions`)
- **WikiLink (Obsidian連携)**: When referencing or citing content from other directories, use Obsidian-style WikiLinks
  - Format: `[[filename]]` or `[[filename|display text]]` (follows Obsidian's "shortest path" default)
  - Examples: `[[food_science]]`, `[[psychological_safety|心理的安全性]]`
  - Omit file extensions in link targets
  - Path is unnecessary if the filename is unique within the Vault; include path only for duplicates (e.g., `[[topics/food_science]]`)

## TypeScript / JavaScript (Biome)

- Use **Biome** for code formatting and linting
- Before proposing commits, run `npm run format` or `npm run check` and ensure no errors remain

## Next.js

- Document content is placed in the `md/` directory
- `npm run build` must complete without errors
- Dev server: `npm run dev` (`--turbopack` enabled)

## textlint

- **Check config first (設定ファイルの事前確認)**: Before writing or editing text, always check `.textlintrc.js` in the current or parent directory to understand active rules (especially `da/dearu` vs `desu/masu` style)
- **Run lint before commit (コミット前チェック)**: Run `npm run lint:text` and confirm no lint errors before committing
- **Per-directory config (ディレクトリ別設定)**: Subdirectories under `md/` may have their own `.textlintrc.js` with different rules
- **Rule changes require approval (ルール変更時は事前相談必須)**: Always consult the user and obtain approval before adding, modifying, or removing `.textlintrc.js` rules — even to fix lint errors
- **Adding new `.textlintrc.js` (新規設定ファイル追加)**: When creating a `.textlintrc.js` in a new directory, also add a corresponding entry to `lint-staged` in `package.json`
  - Place more specific (subdirectory) entries before parent directory entries, as lint-staged prioritizes more specific patterns
- **Single-file check (手動チェック)**: `node scripts/textlint-file.js <path>`
- **Common violations (よくある違反パターン)**:
  - One sentence per line: Splitting a single sentence across multiple lines (`one-sentence-per-line`)
  - Period in list item: Ending a list item with `。` (`period-in-list-item`)
  - Style mismatch: Using a sentence-ending style that differs from the one specified in `.textlintrc.js`
