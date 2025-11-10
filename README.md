# House Rules

Monorepo-style playground that showcases **TanStack Router + Better-Auth + Polar.sh** on top of React 19/Vite 7. It includes:

- File-based routing with TanStack React Router + Radix UI Themes
- Better-Auth server/client setup with role-aware navigation (user/moderator/admin/super admin)
- Polar checkout + customer portal wiring through Better-Auth's Polar plugin
- Drizzle ORM (Postgres) schema + migrations

## Prerequisites

- Node.js 20+
- Postgres database (local, Docker, or managed)
- Polar account (Sandbox or Production) and API access token

## Environment Variables

Create a `.env` file (or export vars in your shell) with at least:

| Variable | Description |
| --- | --- |
| `DATABASE_URL` | Postgres connection string used by Drizzle + Better-Auth |
| `VITE_BETTER_AUTH_URL` / `BETTER_AUTH_URL` | Base URL to reach the Better-Auth API (`http://localhost:3000/api/auth` for local dev) |
| `VITE_POLAR_ACCESS_TOKEN` / `POLAR_ACCESS_TOKEN` | Polar API access token (Sandbox or Production) |
| `VITE_POLAR_ENV` / `POLAR_ENV` (optional) | `sandbox` (default) or `production`; controls which Polar server the SDK uses |

> `VITE_*` variables are visible to both client and server bundles. Non-`VITE_` versions can be used when running the server outside Vite (e.g., serverless or Node runtimes).

## Setup

```bash
pnpm install        # or npm install / yarn install
npx drizzle-kit push
```

- `drizzle-kit push` applies the latest schema (adds the `user_role` enum/column along with Better-Auth tables).

## Running the app

```bash
npm run dev        # Vite dev server on http://localhost:3000 by default
```

Key routes:

- `/login` – email/password auth (Better-Auth)
- `/pricing` – launches Polar checkout once authenticated
- `/moderator`, `/admin`, `/super-admin` – gated by user role, pulled from Better-Auth session data

## Polar Integration Checklist

1. **Access token** – ensure `VITE_POLAR_ACCESS_TOKEN` or `POLAR_ACCESS_TOKEN` is set. Without it the Better-Auth `polar` plugin is skipped and Polar actions throw descriptive errors.
2. **Environment** – set `VITE_POLAR_ENV=sandbox` (default) or `production` to match your Polar workspace.
3. **Product configuration** – `src/lib/auth.ts` references the product UUID + slug you created in Polar (`slug: "pro"` in this repo). Update those if your Polar catalog differs.
4. **Checkout & portal flows** – the helpers in `src/lib/auth-client.ts` redirect to Better-Auth’s Polar endpoints using the configured base URL, so they work whether you host auth locally or remotely.
5. **Pricing page** – `/pricing` calls `polarCheckout("pro")`. After completing checkout, Polar redirects back to `/success?checkout_id=...`, which is handled by `src/routes/success.tsx`.

## Useful Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build (client + SSR outputs) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run db:*` | Drizzle helpers (generate, migrate, push, studio) |

## Next Steps

- Assign roles to test accounts (update the `user.role` column in Postgres) to see gated routes change.
- Configure Polar webhooks if you want to sync subscription status into your own tables (`src/lib/subscription.ts` is a placeholder for that logic).
