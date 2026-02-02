# Fix textlint configuration and Standardize READMEs to "Desumasu" style

**Request:**
Currently, running `npx lint-staged` causes a crash (OOM) in the `tech/qiita` directory.
Additionally, we have decided to standardize all `README.md` files across the project to use the **"Desumasu" (polite/formal) style**. However, current configurations and file contents are inconsistent, causing lint inconsistencies and errors.

Please perform the following 3 tasks:

## 1. Fix lint-staged Memory Issue

In `package.json`, specifically within the `lint-staged` configuration, add `node --max-old-space-size=8192` to the command for `tech/qiita` (and any other heavy tasks) to prevent memory exhaustion.

## 2. Update .textlintrc.js Configurations

We want to enforce "Desumasu" style for all `README.md` files globally.

- **Root Config (`c:\docs\.textlintrc.js`):**
  - Add an `overrides` section targeting `"**/README.md"`.
  - In this override, set `no-mix-dearu-desumasu` (and related rules) to strictly enforce **"Desumasu"** (`preferInBody`, `preferInHeader`, `preferInList` set to `"ですます"`).
- **Sub-directory Configs (e.g., `tech/qiita/.textlintrc.js`):**
  - Ensure they do not conflict with the root override for READMEs. If they explicitly enforce "Dearu", add an override for `README.md` to force "Desumasu" instead.

## 3. Standardize README.md Content

Edit the following files (and any other `README.md` files you find) to match the "Desumasu" (polite) style. Convert any "Dearu" (plain) endings to "Desumasu".

- `c:\docs\tech\qiita\README.md`
- `c:\docs\presentations\baby-cup\30_marp\README.md`

## Definition of Done

- `npx lint-staged` completes successfully without errors or warnings related to standard style.
- README files use consistent polite language.
