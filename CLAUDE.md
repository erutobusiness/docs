# CLAUDE.md - Developer Guidelines

## Build/Lint Commands
- Dev server: `npm run dev --turbopack`
- Build: `npm run build`
- Format code: `npm run format` (Biome)
- Lint: `npm run lint`
- Auto-fix linting: `npm run lint:fix`

## Code Style
- **TypeScript**: Use strict mode, const over let/var
- **Formatting**: 2-space indentation, 100 char line width
- **Strings**: Single quotes, semicolons always, ES5 trailing commas
- **Imports**: Auto-organized, use path aliases: `@/*`, `@declarative/*`, `@gyakusai/*`
- **Error Handling**: Unused variables are errors, console logs trigger warnings

## Markdown Rules
- One sentence per line
- Include source URLs for web content
- Qiita articles should be in the qiita directory

## Project Structure
- Next.js application with TypeScript and Tailwind CSS
- Multiple documentation-related subprojects (declarative, gyakusai)
- Run `npm run build` to verify changes work correctly