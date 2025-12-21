# AGENTS.md

## Build & Run

- **Dev server**: `pnpm dev` (starts Vite dev server)
- **Build**: `pnpm build` (outputs to `dist/`)
- **Preview**: `pnpm preview` (preview production build)
- **Lint**: `pnpm lint` or `npx eslint src/<file>`
- **Format**: `pnpm format` or `npx prettier --write src/<file>`
- **No test framework configured**

## Code Style

- **ES Modules**: Use named exports (`export class Foo`) and imports (`import { Foo } from "./path.js"`)
- **Quotes**: Double quotes for strings (eslint enforced)
- **Semicolons**: None (prettier enforced)
- **No console.log**: Disallowed by eslint
- **Classes**: Use ES6 classes for entities/utilities (e.g., `Player`, `Level`, `Camera`)
- **Class fields**: Declare instance properties at class top before constructor
- **Naming**: PascalCase for classes/files, camelCase for methods/variables

## Project Structure

- Source code in `src/` (entities, utils, content, main.js)
- Static assets in `public/` (images, sounds, fonts)
- Kaboom.js imported from npm (`import kaboom from "kaboom"`)
- Global Kaboom functions available after `kaboom()` init (e.g., `add`, `sprite`, `pos`, `onUpdate`)
