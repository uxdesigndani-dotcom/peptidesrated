# AGENTS.md

## Cursor Cloud specific instructions

This is a **React + Vite + TypeScript** single-page frontend app (TherapyConnect — a therapist matching platform). There is no local backend, database, or Docker infrastructure.

### Quick reference

| Action | Command |
|--------|---------|
| Install deps | `npm install` |
| Dev server | `npm run dev` (Vite, port 8080) |
| Lint | `npm run lint` |
| Build | `npm run build` |

### Notes

- The Vite dev server binds to `::` (all interfaces) on **port 8080** (configured in `vite.config.ts`).
- ESLint has 3 pre-existing errors in shadcn/ui generated components (`@typescript-eslint/no-empty-object-type` and `@typescript-eslint/no-require-imports`). These are expected and not caused by application code.
- The AI chat feature calls OpenAI directly from the browser using `VITE_OPENAI_API_KEY`. Without this env var the chat/matching feature will not return AI results, but the rest of the UI (topic badges, video grid, navigation) works fine.
- Supabase is configured (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`) but the database schema is empty — no tables or views are queried by the app. Supabase is optional for local development.
- Both `package-lock.json` and `bun.lockb` exist; use **npm** as the canonical package manager (matches `package-lock.json`).
