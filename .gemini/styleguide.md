# Antigravity Context & Style Guide

This file defines the operational context and strict rules for Google Antigravity within this workspace.

## 1. Core Instructions (Single Source of Truth)

**MUST READ AT START OF SESSION**:
@\[../.ai/instructions.md]

## 2. Zero-Tolerance Formatting Rules

The following rules have high priority and are often violated. **Verify these before any file output.**

### 🟢 REQUIRED (OK)

- **One Sentence Per Line**: Keep each sentence on a single line.
- **No Period at List End**: List items should *not* end with punctuation like `。`.
- **Explicit Sources**: Always include URLs for external information.

### 🔴 PROHIBITED (NG)

- Don't split a sentence into multiple lines for visual wrapping.
- `- 箇条書きの最後に句点を打つ。` (Bad: Ends with period)

## 3. Agent Protocol

- **External Communication (Chat/Artifacts)**: **JAPANESE** only.
- **Internal Thought**: **ENGLISH** permitted for logic precision.
- **Verification**: If uncertain about style, check `.textlintrc.js` or run `npm run lint:text`.
