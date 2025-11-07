# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Next.js 16 application using the App Router, TypeScript, React 19, and Tailwind CSS v4. The project uses `pnpm` as the package manager.

## Development Commands

### Running the Application
```bash
# Start development server (http://localhost:3000)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

### Code Quality
```bash
# Run ESLint
pnpm lint

# TypeScript type checking
npx tsc --noEmit
```

## Architecture

### Framework & Routing
- **Next.js 16** with App Router (not Pages Router)
- All routes are defined in the `app/` directory using the file-system based routing
- Uses React Server Components by default (add `'use client'` directive for Client Components)

### Key Files
- `app/layout.tsx`: Root layout wrapping all pages, handles metadata and global fonts
- `app/page.tsx`: Home page at route `/`
- `app/globals.css`: Global styles with Tailwind CSS v4 and CSS variables for theming

### Styling
- **Tailwind CSS v4** via PostCSS (not the older JIT compiler)
- Custom theme defined inline in `globals.css` using `@theme inline` directive
- CSS variables for colors: `--background`, `--foreground`
- Font variables: `--font-geist-sans`, `--font-geist-mono` (loaded from Google Fonts)
- Dark mode support via `prefers-color-scheme` media query

### TypeScript Configuration
- Strict mode enabled
- Path alias `@/*` maps to project root (use `@/app/...`, `@/public/...`, etc.)
- Target: ES2017
- Module resolution: `bundler`
- JSX mode: `react-jsx` (not the legacy `preserve`)

### Import Paths
When importing:
- Use `@/` prefix for absolute imports from project root
- Standard relative imports for nearby files
- Example: `import Component from '@/app/components/Component'`

## Project Structure Notes

- Static assets go in `public/` directory
- All React components in `app/` should be TSX files
- Global styles only in `app/globals.css`
- ESLint ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`
