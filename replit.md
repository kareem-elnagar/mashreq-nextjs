# Mashreq Solar

A solar engineering company website showcasing operational projects and system architecture for agricultural solar installations in Egypt.

## Run & Operate

- `pnpm --filter @workspace/mashreq-solar run dev` — run the frontend (port auto-assigned)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite (wouter for routing, framer-motion for animations)
- API: Express 5
- DB: PostgreSQL + Drizzle ORM (schema empty — app is frontend-only)
- Tailwind CSS v4 with custom blue/yellow brand theme
- Lucide React icons

## Where things live

- `artifacts/mashreq-solar/src/pages/` — page components (Home, Projects, ProjectDetail, Systems, Contact)
- `artifacts/mashreq-solar/src/components/layout/Navbar.tsx` — site navigation
- `artifacts/mashreq-solar/src/lib/data.ts` — project and system data (static)
- `artifacts/mashreq-solar/src/index.css` — global CSS, theme variables, smart-shape/glass-tint utilities
- `artifacts/mashreq-solar/public/img/Logo.png` — Mashreq logo

## Architecture decisions

- Converted from Next.js App Router to Vite + React with wouter for client-side routing
- All data is static (no API routes in the original — kept as static data in `lib/data.ts`)
- `next/link` replaced with wouter `<Link>`, `usePathname` replaced with wouter `useLocation`
- `next/image` replaced with standard `<img>` tags
- Tailwind CSS v4 via `@tailwindcss/vite` plugin (no `tailwind.config.ts` needed)
- Custom brand colors (#1e4b8f primary blue, #ffce07 accent yellow) defined as CSS custom properties

## Product

- Home page with hero section, operational performance features, and CTA
- Projects page listing all operational solar installations with cards
- Project detail pages with full case study layout (situation, decision, system, outcome)
- Systems page explaining Off-Grid Pumping, On-Grid, and Hybrid Diesel-Solar architectures
- Contact page with technical consultation form

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- The app is purely frontend — no database or API routes needed
- `text-primary` and `text-accent` are overridden with `!important` CSS rules because Tailwind v4 uses CSS variable-based color resolution that conflicts with the legacy Next.js color approach

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
