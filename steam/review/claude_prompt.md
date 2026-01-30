# Textlint Plugin for Steam Review Development Prompt

You are an expert TypeScript developer specializing in textlint plugins.
Please create a new repository and implement a textlint processor plugin with the following specifications.

## Project Overview

- **Name**: `textlint-plugin-steam-review`
- **Goal**: Enable textlint rules to check the content inside ` ```steam ` code blocks in Markdown files.
- **Target**: Users writing Steam Reviews in Markdown who want to use textlint for proofreading.

## Technical Stack

- **Language**: TypeScript
- **Linter/Formatter**: Biome (Use `biome` instead of ESLint/Prettier)
- **Testing**: Vitest (Recommended for speed and ease of configuration)
- **Dependencies**: Use `@textlint/ast-node-types`, `@textlint/markdown-to-ast`, and `textlint-tester`.
- **Textlint**: Use standard textlint TxtAST types.

## Core Requirements

### 1. Processor Strategy (Target Extension)

- **File Handling**:
  - ideally, this plugin should handle a specific extension like `.steam.md` or `.review.md` to avoid conflict with standard Markdown plugins.
  - If the user uses it on standard `.md` files, they must explicitly configure it in `.textlintrc`.
- **Wrapper Approach**:
  - It must strictly act as a wrapper around the standard `@textlint/markdown-to-ast`.
  - **Requirement**: In the README, explicitly instruct users that if they enable this plugin for `.md`, they must **disable** the standard `@textlint/textlint-plugin-markdown` to avoid double processing.

### 2. Parser Implementation (Critical)

- **Custom Parser Required**:
  - Do NOT use existing BBCode libraries unless they strictly support **Offset/Location tracking** (most do not).
  - Implement a **Custom Tokenizer and Recursive Descent Parser**.
  - **Goal**: Accurate conversion of BBCode tags to TxtAST nodes while preserving exact file positions.
- **Strict Offset Tracking**:
  - The parser must be aware of the absolute position of every character.
  - **Constraint**: Even a single character misalignment will render linting errors useless in editors.
  - **Newline Handling (Loc Calculation)**:
    - **Trap**: `\n` in Steam BBCode blocks can mess up absolute range and line/column calculations depending on OS (LF vs CRLF).
    - **Solution**: The parser's tokenizer MUST iterate character by character. When encountering `\n`, manually increment `line` and reset `column`. Do NOT rely on generic regex matches that might abstract away newline differences. Usage of `loc` must be consistent regardless of the environment's EOL.

### 3. Steam BBCode Support

- **Whitelist**: Support ALL official Steam Review tags (refer to Steam Guide).
- **Attributes Support**:
  - Must parse tags with attributes: `[url=https://example.com]`, `[quote=author]`, `[h1]Title[/h1]`.
  - The attribute value should be stored or handled so it doesn't break the structure.
- **Self-Closing / Content-less Tags**:
  - `[hr]`, `[br]` (if applicable in Steam).
- **Table Mapping**:
  - `[table]` -> `Table` Node
  - `[tr]` -> `TableRow` Node
  - `[th]`, `[td]` -> `TableCell` Node (internal structure requires `Paragraph` > `Str`)
- **List Handling**:
  - `[list]` -> `List` Node
  - `[*]` (inside list) -> `ListItem` Node
  - **Orphan `[*]**`: If `[*]`appears outside`[list]`, treat it as a plain `Str` node (Steam behavior).
- **Tag Behaviors**:
  - `[noparse]...[/noparse]`: Content inside is **NOT** parsed. Output as a single `Str` node.
  - `[code]...[/code]`: Content inside is `CodeBlock`. Content is ignored by most textlint rules.
- **Recursion & Nesting**:
  - **Strategy**:
    - Avoid hardcoding limits like "3 levels" in the parser state if possible.
    - Instead, use a **Flattening Strategy** in the transformation phase for deep nesting to prevent AST complexity explosions or stack overflows.
    - If elements are too deeply nested to be valid in Markdown/TxtAST, convert them to `Str`.

### 4. AST Grafting & Offset Calculation (The Source of Truth)

- **Concept**: You are "grafting" (replacing) the `CodeBlock` node with its parsed BBCode contents.
- **Process**:
  1.  Parse the Markdown file using `@textlint/markdown-to-ast`.
  2.  Traverse the AST to find `CodeBlock` nodes with `lang` == "steam".
  3.  **Calculate Base Index**: `CodeBlock.range[0]` + opening fence text length (e.g., "```steam\n".length).
  4.  **Parse BBCode**: Parse the content. The parser should return nodes with offsets relative to the start of the block content.
  5.  **Adjust Offsets**: Add **Base Index** to every child node's `range` and `loc`.
  6.  **Graft (Replace)**:
      - Modify the **Parent Node's `children` array**.
      - Find the index of the target `CodeBlock`.
      - Replace that single `CodeBlock` node with the array of parsed BBCode nodes (e.g., `Paragraph`s, `Table`s).
      - Use `flatMap` or `splice` on the parent's children array to insert the new nodes.
  - **Safety & Integrity Check**:
    - **Risk**: Expanding a `CodeBlock` into multiple nodes within a parent like `ListItem` might break TxtAST structure (ranges intersecting, invalid children).
    - **Mitigation**:
      - Implement a "Post-Grafting Integrity Check" or "Safe Gifter".
      - If the expanded nodes would violate the parent's content model (e.g. Block nodes inside a node that only accepts Inline), **fall back** to outputting the content as `CodeBlock` or `Str` with a warning.
      - **Alternative Consideration**: If Grafting proves too unstable, consider a "SourceMap / Virtual Document" approach where the CodeBlock is parsed separately and errors are mapped back. However, try Grafting first as it enables standard rules to work naturally.

### 5. Error Handling & Validation

- **No Custom Nodes**: Do NOT output `InvalidSteamBBCode` nodes in the AST to avoid TxtAST pollution.
- **Data Property Strategy**:
  - Store parsing errors in the root `Document` node's data property.
  - Location: `rootNode.data.steamParseErrors`
- **Error Interface**:
  ```typescript
  interface SteamParseError {
    message: string;
    range: [number, number]; // Absolute position
    loc: {
      start: { line: number; column: number };
      end: { line: number; column: number };
    };
    severity: "error" | "warning";
    tagName?: string;
  }
  ```
- **Rule Implementation**:
  - Create a bundled rule `no-invalid-steam-bbcode`.
  - This rule checks `context.getSourceCode().ast.data.steamParseErrors`.
  - It reports these errors utilizing `context.report()`.

### 6. Expected AST Structure Example

To ensure consistency, here is an example of how a BBCode input should be mapped to TxtAST.

**Input**:

```
[b]Hello[/b]
```

**Output AST**:

```json
{
  "type": "Strong",
  "children": [
    {
      "type": "Str",
      "value": "Hello",
      "range": [ 3, 8 ],
      "loc": { ... }
    }
  ],
  "range": [ 0, 11 ], // Includes [b] and [/b]
  "loc": { ... }
}
```

_Note: The range indices above are relative to the start of the CodeBlock content. You MUST adjust them by adding the absolute start position of the CodeBlock._

## Project Structure & Output

- **Output directory**: `lib/`
- **package.json**: Ensure `main` points to `lib/index.js` and package name matches.
- **Bundled Rule**: `no-invalid-steam-bbcode` included in the package.
- **README**:
  - Installation instructions.
  - **Crucial**: Explicitly instruct users to disable the standard `@textlint/textlint-plugin-markdown` to avoid conflicts.
  - Configuration example (`.textlintrc`).

## Verification & Test Cases

### Case 1: Basic BBCode Linting & Offset

- **Input**:
  ````markdown
  # Test

  ```steam
  [b]Hello![/b]
  ```
  ````
  ```

  ```
- **Check**: Use `textlint-rule-no-exclamation-question-mark`.
- **Expect**: Error detected at the specific character `!` inside the block, matching the correct line/column in the generic `.md` file.

### Case 2: Mixed Content & Position

- **Input**:
  ````markdown
  preceding text...

  ```steam
  [i]Steam Content[/i]
  ```
  ````
  following text...
  ```

  ```
- **Expect**: verify that offsets for "preceding", "Steam Content", and "following" are all correct relative to file start.

### Case 3: Invalid Tags

- **Input**: ` ```steam\n[unknown]tag[/unknown]\n``` `
- **Expect**:
  - `rootNode.data.steamParseErrors` contains an error entry for `[unknown]`.
  - `no-invalid-steam-bbcode` reports this error.
  - The text "tag" is still parsed as a String node and lintable by other rules if needed.

### Case 4: Normal Markdown Regression

- **Input**: Standard markdown file with **NO** `steam` code blocks.
- **Check**: Run standard rules (e.g., `no-todo`).
- **Expect**: The behavior is identical to the standard `@textlint/textlint-plugin-markdown`. No crashes, no swallowed errors.
