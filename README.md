# Cliq — Event Discovery (Next.js 14)

A mobile-first event discovery platform scaffold built with:

- Next.js 14 (App Router, TypeScript)
- TailwindCSS
- ShadCN-inspired UI primitives
- TanStack React Query
- Zustand
- NextAuth.js (Credentials provider, JWT)
- Zod
- ESLint + Prettier

## Getting Started

1) Create environment file:

```bash
cp .env.example .env.local
```

2) Install dependencies:

```bash
npm install
```

3) Run the dev server:

```bash
npm run dev
```

Open http://localhost:3000

## Environment

Create `.env.local`:

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=change-me
```

## Project Structure

- `src/app/` — App Router pages and API routes
  - `layout.tsx` — Root layout with Providers (Theme, React Query, NextAuth, Toast)
  - `page.tsx` — Home with event list + filters
  - `api/` — Mock APIs: `events`, `passes`, `profile`, `auth`
  - `events/[id]/page.tsx` — Event details + reserve modal
  - `passes/page.tsx` — My Passes with cancel option
  - `login/page.tsx`, `register/page.tsx` — Auth forms
  - `profile/page.tsx` — Profile view/edit
- `src/components/` — UI + feature components
- `src/hooks/` — React Query hooks (events, passes, profile)
- `src/lib/` — Axios client, schemas, utils
- `src/store/` — Zustand auth store (placeholder)
- `tailwind.config.ts`, `postcss.config.js` — Tailwind setup

## Notes

- UI components are lightweight ShadCN-style wrappers using Radix Primitives and Tailwind.
- Auth uses NextAuth Credentials provider as a mock; sign-in effectively logs you in without a real backend.
- Mock API endpoints live under `src/app/api/*` and hold in-memory state during the dev session.
- QR codes rendered with `react-qr-code`.

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm start` — start production server
- `npm run lint` — run ESLint
- `npm run format` — format with Prettier

## Next Steps

- Replace mock API with real backend endpoints
- Gate routes based on session and add user menu in Navbar
- Add pagination/infinite scroll on events
- Enhance Reserve Pass form and validation (e.g., phone, notes)
- Improve error states and skeletons
