# Gemini Code Assist Project Configuration

## 1. Core Instructions (Single Source of Truth)

**READ FIRST**: @.ai/instructions.md
All shared rules are defined there. This file contains Gemini-specific overrides only.

## 2. Response Protocol

- **Output language**: Always respond in **Japanese**
- **Internal reasoning**: English permitted for precision
- **No emojis**: Unless explicitly requested

## 3. Formatting Rules (Zero Tolerance)

These rules are frequently violated.
**Verify before ANY Markdown output.**

|Rule|Correct|Incorrect|
|-|-|-|
|One sentence per line|`これは1行です`|`これは\n複数行です`|
|No period in list items|`- 項目`|`- 項目。`|
|Cite sources with URL|`[^1]: https://...`|Uncited claims|

## 4. Verification Workflow

After creating or editing any `.md` file, run:

```bash
node scripts/textlint-file.js <path>
```

This script resolves the correct `.textlintrc.js` automatically from `lint-targets.js`.
Fix all violations before considering the task complete.

**CRITICAL**: Never modify `.textlintrc.js` rules without explicit user approval.
